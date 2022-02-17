pragma solidity >=  0.8.0;
pragma experimental ABIEncoderV2;
import "@openzeppelin/contracts/proxy/Clones.sol";
// import "./ProxySimple.sol";
//import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
//import  "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "./interfaces/iIOUtoken.sol";
import "./interfaces/iStoreIOUs.sol";


contract MakeIOU {
    
    address private owner;
    address private implement;
    address private proxy;
    iStoreIOUs store;

    function setOwner (address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    function setStore (address _new) public onlyOwner {
        store = iStoreIOUs(_new);
        
    }   

    function setimplement (address _proxy ) public onlyOwner {
        proxy = _proxy;
        
    }   

    constructor ()  {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require (owner == msg.sender, "Only owner can do this");
        _;
    }

    function makeIOU(string memory _name, 
                 string memory _symbol, 
                 string memory _myName, //name of emitter
                 string memory _socialProfile, //profile  of emitter in social nets
                 string memory _description, //description of bond IOU to  work
                 iIOUtoken.geo  memory _location, //where is                  
                 bytes32  _units, //units of deal
                 bytes32[] memory _keywords,
                 bytes32 _phone
                        ) public returns (address) {
        

    iIOUtoken.DescriptionIOU memory thisIOU = iIOUtoken.DescriptionIOU (0,0,0,
            _units,
            msg.sender, 
            _myName,
            _socialProfile,
            _description,
            _location,
            _keywords,
           _phone
        );
    //TransparentUpgradeableProxy proxIOU = new TransparentUpgradeableProxy(proxy, owner, "");
    iIOUtoken newIOU =  iIOUtoken(address ( /* proxIOU */   Clones.clone(proxy) ));
    
    newIOU.setIOU (_name, _symbol, thisIOU,address(store)); 
    require (address(store) != address(0x0), "No store address");
    //store.addIOU1(address(newIOU), msg.sender, thisIOU); //, _socialProfile, msg.sender, _keywords);
     //   newIOU.setStore(address(store));

    return address (newIOU);
        }

}