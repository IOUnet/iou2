pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
import "./token/ERC20/ERC20Burnable.sol";
import "./token/ERC20/ERC20Mintable.sol";
import "./StoreIOUs.sol";

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
contract IOUtoken is ERC20Mintable, ERC20Burnable {

    struct IOU {
        address receiver;
        uint256 time;
        string IOUDescr; //what IOU is
    }

    struct FeedBack {
        address sender;
        uint256 time;
        int256 rating; // estimation of skills in 255 grades
        string text; //comment
    }
    struct DescriptionIOU {
        uint256 totalMinted;
        uint256 totalBurned;
        int256 avRate;
        bytes32 units;        
        address issuer;
        string myName ; //name of emitter
        string socialProfile ; //profile  of emitter in social nets
        string description ; //description of bond IOU to  work
        string location; //where is it             
        bytes32[] keywords;
    }
    string public name;
    string public symbol;

    StoreIOUs StoreIOU;
 //   string public name;
 //   string public  symbol;
    uint8 public decimals;
    bool registered;

    DescriptionIOU public thisIOU;

    FeedBack[] public allFeedbacks;
    mapping (address => uint256[]) public feedBacksbySender; // feedback from tokenholders

    IOU[] public allIOUs;
    mapping (address => uint256[]) public IOUbyReceiver; // feedback from tokenholders

    address factory;
    address owner;
    //mapping (address => uint) Tokenholders;

    constructor () public {
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
                 string memory _location, //where is 
                 bytes32  _units, //units of deal
                 bytes32[] memory _keywords,
                 address _storeAddr,
                 address _issuer
                ) public onlyfactory {
        _removeMinter(msg.sender);
        _addMinter (_issuer);
        
        owner = _issuer;
        StoreIOU = StoreIOUs(_storeAddr);
        decimals = 18;
        require (bytes(_name).length <16 || 
                bytes(_symbol).length < 10 ||
                bytes(_myName).length < 64 ||
                bytes(_socialProfile).length < 128 ||
                bytes(_description).length < 128 ||
                bytes(_location).length < 128 ||
                _keywords.length <=5 , 
                "Too many symbs in parameter" );

        thisIOU = DescriptionIOU (0,0,0,
            _units,
            _issuer,
            _myName,
            _socialProfile,
            _description,
            _location,
            _keywords
        );
    name = _name;
    symbol = _symbol;
    }
    

    function setOwner (address _newOwner) public onlyOwner {
        _removeMinter(owner);
        owner = _newOwner;
        _addMinter(_newOwner);
    }

    function setStore (address _newfactor) public onlyfactory {
        StoreIOU = StoreIOUs(_newfactor);
        
    }   
    
    modifier onlyHolder (uint256 _amount) {
        require (balanceOf(msg.sender) > _amount, "No amount token holder has" );
    _;
    }

    function mint (address _who, uint256 _amount, string memory _descr) public onlyOwner { 
        if (!registered) {
            StoreIOU.addIOU2(address(this), thisIOU.socialProfile, thisIOU.keywords);
            registered = true; 
            }
        require (bytes(_descr).length <256, "IOU text is long, need < 256");
        IOU memory bond = IOU (_who, now, _descr);
        allIOUs.push(bond);
        IOUbyReceiver[_who].push(IOUbyReceiver[_who].length-1);
        super.mint(_who, _amount);
        thisIOU.totalMinted += _amount;
        StoreIOU.addHolder(_who, address(this));
        
    }

    function burn (uint256 _amount, int256 _rating, string memory _feedback) public onlyHolder (_amount) {
        require (bytes(_feedback).length <256, "Feedback is long, must be < 256");

        FeedBack memory feedback = FeedBack(msg.sender,now, _rating, _feedback);
        allFeedbacks.push(feedback);
        feedBacksbySender[msg.sender].push(allFeedbacks.length-1);
        
        int256 deltaRate = _rating * int256(_amount) / int256 (balanceOf(msg.sender));

        thisIOU.avRate = (thisIOU.avRate * (int256(allFeedbacks.length) -1) + 
                        deltaRate  * int256(allFeedbacks.length)) / int256(allFeedbacks.length);
                        

        thisIOU.totalBurned += _amount;
        super.burn(_amount);
    }

    function transfer(address _recipient, uint256 _amount) public  returns (bool) {
        StoreIOU.addHolder(_recipient, address(this));
        super.transfer(_recipient, _amount);
        return true;
    }

    function thisIOUkeywords() public view returns (bytes32[] memory)
    {
        return thisIOU.keywords;
    }

    function getlen ()  public view returns (uint256, uint256) {
        return (allIOUs.length, allFeedbacks.length);
    } 

}
