pragma solidity >=  0.8.0;
pragma experimental ABIEncoderV2;
import "./interfaces/iStoreIOUs.sol";
import "./interfaces/iIOUtoken.sol";
import "./Initializable.sol";


contract StoreIOUData {
//todo : break this brick 
    mapping (address => address[]) public listIOUs; // list of emitted IOUs from emitent
    mapping (string => address[])   listIOUsSoc; // list of emitted IOUs by social profile
    mapping (address => address[]) public listHoldersIOUs; //list of tokens by holder
    mapping (address => uint256) public isIOU; //security check is token emitted 
    mapping (address => mapping (address => bool)) isHolderthisIOU; //  check list of tokens by holder

    mapping (bytes32 => address[]) listbyKeys; //list of IOUs by keyword
    mapping (bytes32 => 
     mapping (address => uint256))  keyByList; //reverse index for listbyKeys to editing keywords
    bytes32[] public allKeywords;  //list all keywords
    address[] public allIOU; //list all emitted IOus
    address[] public allIssuers; //list all issuers of  IOus

    mapping (bytes32 => // keyword
     mapping (string =>  // (country
      mapping (string =>  //  state 
       mapping (string =>  //street
        address[])))) internal  listbyCity_; // (keyword => country =>state =>city) => of IOUs
    
    mapping (bytes32 => // keyword
     mapping (string =>  // country
      mapping (string =>  //  state 
       mapping (string =>  //  city 
        mapping (string =>  //street
          address[]))))) internal listbyStreet_; // (keyword=>country=> state => city =>street) => IOU 

    mapping (address => iStoreIOUs.geoIOU ) posIOU;


    address owner;
    //address makeFactory;
    address  implementIOU;
    }