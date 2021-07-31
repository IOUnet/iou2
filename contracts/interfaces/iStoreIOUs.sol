pragma solidity >=  0.8.0;


interface  iStoreIOUs {
    struct  geoIOU {
        uint256 inCity;
        uint256 onStreet;
        string country;
        string state;
        string city;
        string street;
    }

    function addIOU1 (address _newIOU, address _emitent) external;

    function addIOU2 (address _newIOU, 
                    string memory _socialProfile,                     
                    bytes32[] memory _keywords) 
                    external ;
        

    function getIOUList (address _owner) external view returns (address[] memory) ;

    function getIOUListSoc (string memory _profile) external view returns (address[] memory);

    function getIOUListKey (bytes32 _key) external view returns (address[] memory) ;


    function addHolder(address _holder, address _IOUtoken) external ;

    function getIOUListHold (address _holder) external view returns (address[] memory) ;

    function getIOUstotal () external view  returns (uint256);    

    function getKeystotal () external view returns (uint256); 

    function getIssuerstotal () external view returns (uint256);

}