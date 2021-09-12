pragma solidity>= 0.8.0;
pragma experimental ABIEncoderV2;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./interfaces/iStoreIOUs.sol";
import  "./interfaces/iIOUtoken.sol";

/*** IOU ecosystem
*   The aim of IOU ecosystem is to give people proved fiat-free mutual settlements by issuing personal IOU tokens on Ethereum.
*   
*   1.Alice, the artist,  wants to get service from Bob, the barber but has no money. But she can issue ERC20 compatible IOU token  and fill this:
*   name of the token (Alice Artist 2020)
*   symbol of the token (AA01)
*   description of service (Artist: logos, infographic, cartoons)
*   location (New York)
*   social profile in LinkedIn (or Facebook or  smth else)
*   units (dollars, euros, hours, pictures…)
*   2. Alice negotiated the sum of her AA01 tokens,  transfers this to Bob, and get the beautiful hairstyle. And this deal fixes in the blockchain forever.
*   3. Two-month later Bob asked her later for a cartoon about his hairdressing salon.
*   4. After Alice made her job, Bob burns a part of  Alice’s IOU tokens and puts feedback, adding a rating of results.
*   5. Later Bob pays with Alice’s AA01 tokens to Peter, the webmaster, who supports Bob’s salon website. Peter looks for a fresh infographic for another project.
*   6. Peter doesn’t know Alice personally and he wants to check Alice’s reputation. He gets the history of Alice’s deals and looks feedbacks and rates, given to Alice. From another user s of IOU tokens, number of transactions and supply amount.
*   7. If he decides that all ok, he approve the deal in Alice's IOU tokens.
*   8. After Piter receives results, hi burned tokens and gives his feedback too.
*/
/// @author stanta
/// @title IOUtoken
contract IOUtoken is iIOUtoken, ERC20 {

  
    iStoreIOUs StoreIOU;
 
   // bool registered;

    DescriptionIOU  thisIOU;

    FeedBack[] public allFeedbacks;
    mapping (address => uint256[]) public feedBacksbySender; // feedback from tokenholders

    IOU[] public allIOUs;
    mapping (address => uint256[]) public IOUbyReceiver; // list of this IOUs by receiver

    address factory;
    address owner;
    //mapping (address => uint) Tokenholders;

    constructor (string memory name_, string memory symbol_)  ERC20 (name_, symbol_) {
        factory = msg.sender;
    }
    modifier onlyfactory() {
        require (factory == msg.sender, "Only factory can do this");
        _;
    }

    modifier onlyOwner() {
        require (owner == msg.sender, "Only owner can do this");
        _;
    }

    function setIOU (string memory _name, 
                 string memory _symbol,  
                 string memory _myName, // of emitter
                 string memory _socialProfile, //profile  of emitter in social nets
                 string memory _description, //description of bond IOU to  work
                 geo memory _location, //where is ??abiencoded?
                 bytes32  _units, //units of deal
                 bytes32[] memory _keywords,
                 address _storeAddr,
                 address _issuer,
                 bytes32 _phone
                ) public onlyfactory {

        
        owner = _issuer;
        StoreIOU = iStoreIOUs(_storeAddr);
        require (bytes(_name).length <16 || 
                bytes(_symbol).length < 10 ||
                bytes(_myName).length < 64 ||
                bytes(_socialProfile).length < 128 ||
                bytes(_description).length < 256 ||
                _keywords.length <=5 , 
                "Too many symbs in parameter" );

        thisIOU = iIOUtoken.DescriptionIOU (0,0,0,
            _units,
            _issuer,
            _myName,
            _socialProfile,
            _description,
            _location,
            _keywords,
           _phone
        );  //todo add visibility?

    }
    

    function getTokenInfo() public view returns(string memory,
                                           string memory,
                                           iIOUtoken.DescriptionIOU memory ) {
        return(name(), symbol(), thisIOU);

    }

    function setOwner (address _newOwner) public onlyOwner {
   //     _removeMinter(owner);
        owner = _newOwner;
  //      _addMinter(_newOwner);
    }

    function setStore (address _newfactor) public onlyfactory {
        StoreIOU = iStoreIOUs(_newfactor);
        
    }   
    
    modifier onlyHolder (uint256 _amount) {
        require (balanceOf(msg.sender) > _amount, "No amount token holder has" );
    _;
    }

    function mint (address _who, uint256 _amount, string memory _descr) public onlyOwner { 
/*         if (!registered) {
            StoreIOU.addIOU2(address(this), thisIOU.socialProfile, thisIOU.keywords);
            registered = true; 
            } */
        require (bytes(_descr).length <256, "IOU text is long, need < 256");
        IOU memory bond = IOU (_who, block.timestamp, _descr);
        allIOUs.push(bond);
        IOUbyReceiver[_who].push(allIOUs.length-1);
        _mint(_who, _amount);
        thisIOU.totalMinted += _amount;
        StoreIOU.addHolder(_who, address(this));
        
    }

    function burn (uint256 _amount, int256 _rating, string memory _feedback) public onlyHolder (_amount) {
        require (bytes(_feedback).length <256, "Feedback is long, must be < 256");

        iIOUtoken.FeedBack memory feedback = iIOUtoken.FeedBack(msg.sender,block.timestamp, _rating, _amount, _feedback);
        allFeedbacks.push(feedback);
        feedBacksbySender[msg.sender].push(allFeedbacks.length-1);
        
        int256 deltaRate = _rating * int256(_amount) / int256 (balanceOf(msg.sender));

        thisIOU.avRate = (thisIOU.avRate * (int256(allFeedbacks.length) -1) + 
                        deltaRate  * int256(allFeedbacks.length)) / int256(allFeedbacks.length);
                        

        thisIOU.totalBurned += _amount;
        _burn(msg.sender, _amount);
    }

    function transfer(address _recipient, uint256 _amount) public override returns (bool) {
        StoreIOU.addHolder(_recipient, address(this));
        super.transfer(_recipient, _amount);
        return true;
    }

    function changeIOU (

    ) public onlyOwner {

    }

    function thisIOUkeywords() public view returns (bytes32[] memory)
    {
        return thisIOU.keywords;
    }

    function getlen ()  public view returns (uint256, uint256) {
        return (allIOUs.length, allFeedbacks.length);
    } 

    function thisIOUDesc () public view override returns (DescriptionIOU memory)
    {    return thisIOU;
    }
    function IOUname () public view override returns (string memory)
    {    return name();
    }
    function IOUsymbol () public view override returns (string memory)
    {    return symbol ();
    }
}
