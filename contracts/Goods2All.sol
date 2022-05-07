pragma solidity >=0.4.24 <0.9.0;
import "./IOUtoken.sol";
contract Goods2All is IOUtoken {

/**uint memberTokenAmount = SUMповсемупериоду (суммаПеревода / количествоУчастников [на_ дату_перевода]) - ужеВыведенноеУчастником
*/
/* struct Transfer {
uint sum;
uint allMembers;
} 
Transfer[]  transfers ;//[] -   date, 1st of every month
*/
    mapping (address => uint) allgoods ;
    mapping (address => mapping( address => uint)) withdrawed ;
    address[] tokenGoods;

    function addGood (address _token, uint _amount) public {
        require(_amount > 0, "need amount > 0");
        //TODO - check token is exist IOU
        //todo check proportions in/out?

        IOUtoken(_token).transferFrom (msg.sender, address(this), _amount);
        if (allgoods[_token] == 0 ) {
            tokenGoods.push(_token);
        }
        allgoods [_token] += _amount / tokenGoods.length;
    }

    function  checkMyGoods (address _tokengood) public view returns (uint  share) {
    
        share = allgoods [_tokengood] - withdrawed[_tokengood][msg.sender] ;
    
    }

    function withdrawGood (address _tokengood, uint _amount) public {
        //todo check that  men put goods !!!
        //todo check proportions in/out?
        require(checkMyGoods(_tokengood) - _amount > 0, "Not enought amount to withdraw");
        IOUtoken(_tokengood).transfer(msg.sender, _amount);
        withdrawed[_tokengood][msg.sender] += _amount;
    }


}