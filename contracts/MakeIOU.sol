pragma solidity >=  0.8.0;
pragma experimental ABIEncoderV2;
import "./IOUtoken.sol";
import "./interfaces/iStoreIOUs.sol";
import "./interfaces/iIOUtoken.sol";

contract MakeIOU {
    
    address private owner;
    iStoreIOUs store;

    function setOwner (address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    function setStore (address _newOwner) public onlyOwner {
        store = iStoreIOUs(_newOwner);
        
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

        IOUtoken newIOU = new IOUtoken(_name, 
                                    _symbol);
        newIOU.setIOU(  _name, 
                        _symbol,                    
                        _myName, 
                        _socialProfile,  
                        _description,
                        _location,
                        _units, 
                        _keywords,
                        msg.sender, 
                        _phone
            );
        //store.addIOU2(address(newIOU), _socialProfile, msg.sender, _keywords);
        require (address(store) != address(0x0), "No store address");
        store.addIOU1(address(newIOU), msg.sender);//, _socialProfile, msg.sender, _keywords);

        return address (newIOU);
        }

    function addHolder(address _holder, address _IOUtoken) public  {
        store.addHolder(_holder, _IOUtoken);
      }


   function addKeys (bytes32[] calldata _keys, address _IOUtok)  public  {
        IOUtoken (_IOUtok).addKeys(_keys, msg.sender);
        store.addKeys( _keys, _IOUtok);  
        } 

   function delKeys (bytes32[] calldata _keys, address _IOUtok)  public  {
        IOUtoken (_IOUtok).delKeys(_keys, msg.sender);
        store.delKeys( _keys, _IOUtok);
        }

    function editGeo (iIOUtoken.geo calldata _location, address _IOUtok)  public  {
        IOUtoken (_IOUtok).editGeo(_location, msg.sender);
        store.changeIOUGeoAllkeys(_location, _IOUtok);
    }
}