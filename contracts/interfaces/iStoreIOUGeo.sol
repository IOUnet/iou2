pragma solidity >=  0.8.0;


interface iStoreIOUGeo {

    struct  geoIOU {
        uint256 inCity;
        uint256 onStreet;
        string country;
        string state;
        string city;
        string street;
    }

    function setIOUGeo (address _addrIOU, 
                        string memory _country,
                        string memory _state,
                        string memory _city,
                        string memory _street) external; 
        




    function getIOUsbyCity(string memory _country,
                        string memory _state,
                        string memory _city) external view returns (address[] memory) ;

    function getIOUsbyStreet (string memory _country,
                        string memory _state,
                        string memory _city,
                        string memory _street) external view returns (address[] memory) ;

   
}