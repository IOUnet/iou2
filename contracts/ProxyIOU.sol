pragma solidity >= 0.8.0;
pragma experimental ABIEncoderV2;
import  "./interfaces/iIOUtoken.sol";
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

contract ProxyIOU  is TransparentUpgradeableProxy {  
    struct IOUdescr {
        string name;
        string symbol;
        iIOUtoken.DescriptionIOU description;
    }

        constructor(
        address _logic,
        address admin_
    ) payable TransparentUpgradeableProxy(_logic, admin_, "") {
        assert(_ADMIN_SLOT == bytes32(uint256(keccak256("eip1967.proxy.admin")) - 1));
        _changeAdmin(admin_);
    }
    
    /* function getIOU (address _iou) public view returns (
        string memory  ,
        string  memory ,
//        iIOUtoken.DescriptionIOU memory descr
        uint256,// totalMinted;
        uint256,// totalBurned;
        int256,// avRate;
        bytes32,// units;        
        address,// issuer;
        string memory,// myName ; //name of emitter
        string memory,  //socialProfile ; //profile  of emitter in social nets
        string memory, //description ; //description of bond IOU to  work
        iIOUtoken.geo  memory, //location; //where is it             
        bytes32[] memory, // keywords;
        bytes32 //phone
    ) {

        iIOUtoken iouT = iIOUtoken(_iou);
        iIOUtoken.DescriptionIOU memory descr = iouT.thisIOUDesc();
     return (iouT.IOUname(),
            iouT.IOUsymbol(),
            
            descr.totalMinted,
            descr.totalBurned,
            descr.avRate,
            descr.units,
            descr.issuer,
            descr.myName , //name of emitter
            descr.socialProfile,  //profile  of emitter in social nets
            descr.description,//description of bond IOU to  work
            descr.location, //where is it             
            descr.keywords,
            descr.phone
            );
    } 
    function _implementation() internal view virtual override returns (address impl) {
        return ERC1967Upgrade._getImplementation();
    }
 /*    function IOUname() external view returns  (string memory) {
        (bool success, bytes memory returnedData) = _implementation().  delegatecall(abi.encodeWithSelector(
      bytes4(keccak256("IOUname()"))
    ));
    require(success, string(returnedData));
    } 
    function IOUsymbol() external view returns (string memory) {
        (bool success, bytes memory returnedData) = _implementation().  delegatecall(abi.encodeWithSelector(
      bytes4(keccak256("IOUsymbol()"))
    ));
    } 
    function thisIOUDesc() external view returns (DescriptionIOU memory) {
        (bool success, bytes memory returnedData) = _implementation().  delegatecall(abi.encodeWithSelector(
      bytes4(keccak256("thisIOUDesc()"))
    ));
    } 
     function setIOU (//    constructor (
                string memory name_, 
                string memory symbol_, 
                iIOUtoken.DescriptionIOU memory _thisIOU,
                 address _store)  external {
        (bool success, bytes memory returnedData) = _implementation().  delegatecall(abi.encodeWithSelector(
            bytes4(keccak256("setIOU(string,string,iIOUtoken.DescriptionIOU,address)")),
            name_,
            symbol_,
            _thisIOU,
            _store
            ));

    require(success, string (returnedData));
    } 
/* 
    function initialize() external {
            (bool success, bytes memory returnedData) = _implementation().  delegatecall(abi.encodeWithSelector(
      bytes4(keccak256("initialize()"))
    ));
    } */
    function getIOU (address _iou) public view returns ( IOUdescr memory) {
        iIOUtoken iouT = iIOUtoken(_iou);
        IOUdescr memory iouD = IOUdescr (iouT.IOUname(), iouT.IOUsymbol(), iouT.thisIOUDesc()  );
        return iouD;
}

}