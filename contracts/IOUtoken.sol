pragma solidity>= 0.8.0;
pragma experimental ABIEncoderV2;
import  "./interfaces/iIOUtoken.sol";
import "./interfaces/iStoreIOUs.sol";
import "./ERC20.sol";

//import "./MakeIOU.sol";

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
contract IOUData is ERC20 {
     //ERC20 
    mapping(address => uint256) private _balances;

    mapping(address => mapping(address => uint256)) private _allowances;

    uint256  _totalSupply;

    string  _name;
    string  _symbol;
  
 
   // bool registered;

    iIOUtoken.DescriptionIOU  thisIOU;

    iIOUtoken.FeedBack[] public allFeedbacks;
    mapping (address => uint256[]) public feedBacksbySender; // feedback from tokenholders

    iIOUtoken.IOU[] public allIOUs;
    mapping (address => uint256[]) public IOUbyReceiver; // list of this IOUs by receiver

    address owner;
    bool configured;
    bool inited;
    iStoreIOUs store;
    //mapping (address => uint) Tokenholders;
 //   address implementation;

}

contract IOUtoken is IOUData, iIOUtoken  { 

     modifier onlyOwner() {
        require (owner == msg.sender, string(abi.encode("Only owner can do this", owner, msg.sender)));
        _;
    }

    modifier nonConfiged () {
        require(!configured, "Already configured");
        _;
        configured = true;

    }

    modifier nonInited () {
        require(!inited, "Already inited");
        _;
        inited = true;

    }

    modifier onlyHolder (uint256 _amount) {
        require (balanceOf(msg.sender) > _amount, "No amount token holder has" );
    _;
    }
   
    function initialize()  public nonInited override
    {
        owner = msg.sender;
        configured = false;
    }
    function setIOU  (
    //    constructor (
                    string memory name_, 
                    string memory symbol_, 
                    DescriptionIOU memory _thisIOU,
                    address _store
)  public  nonConfiged /* override */ {
        thisIOU = _thisIOU;
        owner = _thisIOU.issuer;
        _name = name_; 
        _symbol = symbol_;
         require (bytes(name_).length <16 &&
                    bytes(symbol_).length < 5 &&
                    bytes(_thisIOU.myName).length < 64 &&
                    bytes(_thisIOU.socialProfile).length < 128 &&
                    bytes(_thisIOU.description).length < 256 &&
                    _thisIOU.keywords.length <=5 , 
                    "Too many symbs in parameter(s)" ); 
    //todo add visibility?
    store = iStoreIOUs(_store);
            
    store.addIOU1(address(this), _thisIOU.issuer, _thisIOU); //, _socialProfile, msg.sender, _keywords);
        }

    function setStore (address _newOwner) public onlyOwner {
        store = iStoreIOUs(_newOwner);
        
    }   


    function setOwner (address _newOwner) public onlyOwner {
   //     _removeMinter(owner);
        owner = _newOwner;
  //      _addMinter(_newOwner);
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
        store.addHolder(_who, address(this)); 
        
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

    function transfer(address _recipient, uint256 _amount) public override onlyHolder(_amount) returns (bool) {
        store.addHolder(_recipient, address(this));
        super.transfer(_recipient, _amount);
        return true;
    }

    function editDescr (string calldata _descr)  public onlyOwner {
        thisIOU.description = _descr;
    }

    function editPhone (bytes32 _phone)  public onlyOwner {
        thisIOU.phone = _phone;
    }

    function editGeo (string calldata _country,
                    string calldata _state,
                    string calldata _city,
                    string calldata _street)  public onlyOwner {
        iIOUtoken.geo memory newloc;
        newloc.country = _country;
        newloc.state = _state;
        newloc.city = _city;
        newloc.street = _street;
        store.changeIOUGeoAllkeys(newloc, address(this));
        thisIOU.location.country = _country;
        thisIOU.location.state = _state;
        thisIOU.location.city = _city;
        thisIOU.location.street = _street;
    }


    function addKeys (bytes32[] calldata _keys)  public onlyOwner {
        uint addKeyLen = _keys.length;
        require(addKeyLen < 5, "Only 5 keys can add once");
        for (uint k=0; k<addKeyLen; k++) {
            thisIOU.keywords.push(_keys[k]);
        }
        store.addKeys( _keys, address(this));  
    }
    function delKeys (bytes32[] calldata _keys)  public onlyOwner {
        uint delKeyLen = _keys.length;       
        require(delKeyLen < 5, "Only 5 keys can remove once");
        // mark removing keys
       // uint[5] memory keyMap;
       
       // uint km = 0;
        for (uint dk=0; dk<delKeyLen; dk++) {
            uint delkey;
            for (uint kk=0; kk<thisIOU.keywords.length; kk++) {                
                    if (thisIOU.keywords[kk] == _keys[dk]) {
                        delkey = kk;                        
                    }
            }
            // catch array 
            thisIOU.keywords[delkey] = thisIOU.keywords[thisIOU.keywords.length-1] ;
            thisIOU.keywords.pop();
    
        }
        
        store.delKeys( _keys, address(this)); 
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


    function getTokenInfo() public view returns(string memory,
                                           string memory,
                                           iIOUtoken.DescriptionIOU memory ) {
        return(name(), symbol(), thisIOU);

    }

    function name() public view override returns (string memory) {
        return _name;
    }

    function symbol() public view override returns (string memory) {
        return _symbol;
    }

}
