pragma solidity >=  0.8.0;
import "./iIOUtoken.sol";


interface  iStoreIOUs {
    struct  geoIOU {
        uint64 inCity;
        uint64 onStreet;
        // string country;
        // string state;
        // string city;
        // string street;
    }

    function addIOU1 (address _newIOU, address _emitent, iIOUtoken.DescriptionIOU calldata _thisIOU) external;  
    function addKeys (bytes32[] calldata _keys, address _IOUtok)  external; 
    function delKeys (bytes32[] calldata _keywords, address _addrIOU ) external;
    function changeIOUGeoAllkeys  (iIOUtoken.geo calldata _loc, address _addrIOU ) external;

    function getIOUList (address _owner) external view returns (address[] memory) ;

    function getIOUListSoc (string calldata _profile) external view returns (address[] memory);

    function getIOUListKey (bytes32 _key) external view returns (address[] memory) ;


    function addHolder(address _holder, address _IOUtoken) external ;

    function getIOUListHold (address _holder) external view returns (address[] memory) ;

    function getIOUstotal () external view  returns (uint256);    

    function getKeystotal () external view returns (bytes32[] memory); 

    function getIssuerstotal () external view returns (uint256);
    function implIOU() external view returns (address);
}