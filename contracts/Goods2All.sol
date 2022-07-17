pragma solidity >=0.4.24 <0.9.0;
import "./IOUtoken.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
contract Goods2All is IOUtoken, AccessControl {

/**uint memberTokenAmount = SUMповсемупериоду (суммаПеревода / количествоУчастников [на_ дату_перевода]) - ужеВыведенноеУчастником
*/
/* 
} 
Transfer[]  transfers ;//[] -   date, 1st of every month
*/
    struct GoodsTransfer {
       uint256 amount;
    //    uint allMembers;
       uint256  firstTransfer;
       uint256 lastTransfer;
        }
    mapping (address => GoodsTransfer) allgoods ;
    mapping (address => mapping( address => uint)) withdrawed ;
    mapping (address => bool) isStopped;
    mapping (address => address) ownersOfGoods; 
    address[] tokenGoods;
    uint256 public tokenNorm; // amount of commiting in tokens decimals = 18
    uint256 public tokenTimeNorm; //period of commniting in secunds
    bytes32 public tokenUnits; // units which IOUs have to use
    uint256 INITTIME; // to fix 1st addition of good (when system started)

    function setTokenNorm (uint256 _tokenNorm, uint256 _tokenTimeNorm,  bytes32 _units) public onlyRole("DAO") {
        require(_tokenTimeNorm > 0 && _tokenNorm > 0, "needs _tokenTimeNorm > 0 && _tokenNorm > 0");
        if (tokenNorm != _tokenNorm) tokenNorm = _tokenNorm;
        if (tokenTimeNorm != _tokenTimeNorm) tokenTimeNorm = _tokenTimeNorm;
        if (tokenUnits != _units) tokenUnits = _units;
    }

    function needTokens (address _token) view public returns(uint256) {
        // check proportions how much  tokens have to be commited
        return tokenNorm *  (block.timestamp - allgoods[_token].lastTransfer) / tokenTimeNorm;
    }
    function addGood (address _token) public {
        if (INITTIME ==0 ) INITTIME = block.timestamp;
        require(!isStopped[msg.sender], "account is stopped by court");
        // todo owner can have several IOUs
        // check token is exist IOU with right units
        require(IOUtoken(_token).thisIOUDesc().units == tokenUnits, "Not right units of IOU" );
        //todo add sponsorship (surety ) when creating
        require( ownersOfGoods[msg.sender]== address(0x0), "This owner already registered" );

        if (allgoods[_token].amount == 0 ) { //no token here
            tokenGoods.push(_token);
            allgoods[_token].lastTransfer =  allgoods[_token].firstTransfer =  block.timestamp - tokenTimeNorm;
            ownersOfGoods[msg.sender]= _token;
        }
        uint256 amount = needTokens(_token);
        allgoods [_token].amount += amount ;
        allgoods[_token].lastTransfer =  block.timestamp;
                
        IOUtoken(_token).transferFrom (msg.sender, address(this), amount);
    }

    function  checkMyGoods (address _tokengood) public view returns (uint  share) {

        // how to calculate time of first adding?
        //  how to balance the dilution dffusion of the shares of old participants with the arrival of new participants?
         // 1. a new participant onboards, and the shares of the previous ones have automatically decreased proportionally
         // 2. a new member came and got immediate access to contributions in all projects
         // ==> calculate, share of time that active in system!
        share = (allgoods [_tokengood].amount * 
            (block.timestamp - allgoods [_tokengood].firstTransfer ) / 
            (block.timestamp - INITTIME) /
            tokenGoods.length) - 
            withdrawed[_tokengood][msg.sender] ;
    
    }

    function withdrawGood ( uint _amount) public {
        //!!!  check that  men put goods early !!!
        address tokenGood =   ownersOfGoods[msg.sender];
        require(allgoods [tokenGood].lastTransfer > block.timestamp - tokenTimeNorm, "Need put your goods before withdraw for this period ");
        require(checkMyGoods(tokenGood) - _amount > 0, "Not enought amount to withdraw");
        IOUtoken(tokenGood).transfer(msg.sender, _amount);
        withdrawed[tokenGood][msg.sender] += _amount;
    }

    //todo excommunication
    function stopMembersip (address _who) public onlyRole("COURT") {
        isStopped[_who] = true;
    }

    function restoreMembersip (address _who) public onlyRole("COURT") {
        isStopped[_who] = false;
    }
}