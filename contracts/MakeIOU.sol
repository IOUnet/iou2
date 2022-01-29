pragma solidity >=  0.8.0;
pragma experimental ABIEncoderV2;
import "@openzeppelin/contracts/proxy/Clones.sol";
import "./interfaces/iIOUtoken.sol";
import "./interfaces/iStoreIOUs.sol";


contract MakeIOU {
    
    address private owner;
    address private instIOU;
    iStoreIOUs store;

    function setOwner (address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    function setStore (address _new) public onlyOwner {
        store = iStoreIOUs(_new);
        
    }   

    function setIOU (address _new) public onlyOwner {
        instIOU = _new;
        
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

    iIOUtoken newIOU =  iIOUtoken(Clones.clone(instIOU));
    newIOU.setIOU (_name, _symbol, thisIOU,address(store));
    require (address(store) != address(0x0), "No store address");
    store.addIOU1(address(newIOU), msg.sender);//, _socialProfile, msg.sender, _keywords);
     //   newIOU.setStore(address(store));

        return address (newIOU);
        }
/* 
    function addHolder(address _holder, address _IOUtoken) public  {
        store.addHolder(_holder, _IOUtoken);
      }


   function addKeys (bytes32[] calldata _keys, address _IOUtok)  public  {
        IOUtoken (_IOUtok).addKeys(_keys, msg.sender);
        
        } 

   function delKeys (bytes32[] calldata _keys, address _IOUtok)  public  {
        IOUtoken (_IOUtok).delKeys(_keys, msg.sender);
        
        }

    function editGeo (iIOUtoken.geo calldata _location, address _IOUtok)  public  {
        IOUtoken (_IOUtok).editGeo(_location, msg.sender);
        
    }

     function editDescr (string calldata _descr,  address _IOUtok)  public onlyOwner {
        IOUtoken (_IOUtok).editDescr( _descr);
    }

    function editPhone (bytes32 _phone,  address _IOUtok)  public onlyOwner {
        IOUtoken (_IOUtok).editPhone (_phone);
    } */
}