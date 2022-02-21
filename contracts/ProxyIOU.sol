pragma solidity >= 0.8.0;
pragma experimental ABIEncoderV2;
import  "./IOUtoken.sol";
import  "./interfaces/iStoreIOUs.sol";

//import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

contract ProxyIOU   is IOUData /*,TransparentUpgradeableProxy */  {  
   // address implementation;
/*     constructor(
        address _logic,
        address admin_
    ) payable TransparentUpgradeableProxy(_logic, admin_, "") {
        assert(_ADMIN_SLOT == bytes32(uint256(keccak256("eip1967.proxy.admin")) - 1));
        _changeAdmin(admin_);
    } */
    
     modifier onlyOwner() {
        require (owner == msg.sender, string(abi.encode("Only owner can do this (proxy)", owner, msg.sender)));
        _;
    }


    modifier nonInited () {
        require(!inited, "Already inited (proxy)");
        _;
        inited = true;

    }

    modifier nonConfiged () {
        require(!configured, "Already configured (proxy)");
        _;
        configured = true;

    }

    modifier onlyHolder (uint256 _amount) {
        require (balanceOf(msg.sender) > _amount, "No amount token holder has (proxy)" );
    _;
    }

     function setIOU (//    constructor (
                string memory name_, 
                string memory symbol_, 
                iIOUtoken.DescriptionIOU memory _thisIOU,
                 address _store                 ) /* nonConfiged */ external {
     //   implementation = _implementation;
//        initialize();
        iStoreIOUs store1 = iStoreIOUs(_store);
        address impl = store1.implIOU();
        (bool success, bytes memory returnedData) = impl.delegatecall(abi.encodeWithSignature(
        (("initialize()")) 
    ));
        require(success, string (returnedData));
        /*  info for encodeWithSignature for function setIOU
         (//  as a  constructor (
        
                string memory name_, 
                string memory symbol_, 
                DescriptionIOU memory _thisIOU,
                 address _store, 
                address _implementation
            )  external;

    struct geo {
        string country;
        string state;
        string city;
        string street;
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
        geo location; //where is it             
        bytes32[] keywords;
        bytes32 phone;
    }
 */
        ( success,  returnedData) = impl.delegatecall(abi.encodeWithSignature( //"0x90c29670"
            "setIOU(string,string,(uint256,uint256,int256,bytes32,address,string,string,string,(string,string,string,string),bytes32[],bytes32),address)",
            name_,
            symbol_,
            _thisIOU,
            _store
            ));

    require(success, string (returnedData));
    } 
 
/*     function initialize() nonInited public {
        (bool success, bytes memory returnedData) = store.implIOU().delegatecall(abi.encodeWithSignature(
        (("initialize()"))
    ));
        require(success, string (returnedData));

    } */

    function setStore (address _newOwner) public  onlyOwner {
        //store = iStoreIOUs(_newOwner);
        (bool success, bytes memory returnedData) = store.implIOU().delegatecall(abi.encodeWithSignature(
        (("setStore(address)")), _newOwner));
        require(success, string (returnedData));

    }   

    function setOwner (address _newOwner) public  onlyOwner {

        (bool success, bytes memory returnedData) = store.implIOU().delegatecall(abi.encodeWithSignature(
        (("setOwner(address)")), _newOwner));
        require(success, string (returnedData));
    }

    function mint (address _who, uint256 _amount, string memory _descr) public onlyOwner { 

        (bool success, bytes memory returnedData) = store.implIOU().delegatecall(abi.encodeWithSignature(
        (("mint(address,uint256,string)")), 
        _who, _amount,  _descr));
        require(success, string (returnedData));
    }
    function burn (uint256 _amount, int256 _rating, string memory _feedback) onlyHolder  (_amount) public {
        
        (bool success, bytes memory returnedData) = store.implIOU().delegatecall(abi.encodeWithSignature(
        (("burn(uint256,int256,string)")), 
         _amount, _rating, _feedback));
        require(success, string (returnedData));
        }

    function transfer(address _recipient, uint256 _amount) onlyHolder(_amount) public override returns (bool) {   
                (bool success, bytes memory returnedData) = store.implIOU().delegatecall(abi.encodeWithSignature(
        (("transfer(address,uint256)")), 
         _recipient, _amount));
        require(success, string (returnedData));
        }


    function editDescr (string calldata _descr)  public onlyOwner {
       (bool success, bytes memory returnedData) = store.implIOU().delegatecall(abi.encodeWithSignature(
        (("editDescr(string)")), 
         _descr));
        require(success, string (returnedData));
    }

    function editPhone (bytes32 _phone)  public onlyOwner {
        (bool success, bytes memory returnedData) = store.implIOU().delegatecall(abi.encodeWithSignature(
        (("editPhone(bytes32)")), 
         _phone));
        require(success, string (returnedData));    
        }

    function editGeo (string calldata _country,
                    string calldata _state,
                    string calldata _city,
                    string calldata _street)  public onlyOwner {
        (bool success, bytes memory returnedData) = store.implIOU().delegatecall(abi.encodeWithSignature(
        (("editGeo(string,string,string,string)")), 
         _country, _state,_city,_street));
        require(success, string (returnedData));    
    }
    function addKeys (bytes32[] calldata _keys)  public onlyOwner { 
        (bool success, bytes memory returnedData) = store.implIOU().delegatecall(abi.encodeWithSignature(
        (("addKeys(bytes32[])")), 
         _keys));
        require(success, string (returnedData)); 
    }
    function delKeys (bytes32[] calldata _keys)  public onlyOwner {
           (bool success, bytes memory returnedData) = store.implIOU().delegatecall(abi.encodeWithSignature(
        (("delKeys(bytes32[])")), 
         _keys));
        require(success, string (returnedData)); 
    }

    function getIOU (address _iou) public view returns ( iIOUtoken.IOUdescr memory) {
        iIOUtoken iouT = iIOUtoken(_iou);
        iIOUtoken.IOUdescr memory iouD = iIOUtoken.IOUdescr (iouT.IOUname(), iouT.IOUsymbol(), iouT.thisIOUDesc()  );
        return iouD;
}

    function thisIOUkeywords() public view returns (bytes32[] memory)
    {
        return thisIOU.keywords;
    }

    function getlen ()  public view returns (uint256, uint256) {
        return (allIOUs.length, allFeedbacks.length);
    } 

    function thisIOUDesc () public view  returns (iIOUtoken.DescriptionIOU memory)
    {    return thisIOU;
    }
    function IOUname () public view  returns (string memory)
    {    return name();
    }
    function IOUsymbol () public view  returns (string memory)
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