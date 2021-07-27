pragma solidity >=  0.8.0;
import "./interfaces/iIOUtoken.sol";


contract StoreIOUGeo {

    struct  geoIOU {
        uint256 inCity;
        uint256 onStreet;
        string country;
        string state;
        string city;
        string street;
    }

    mapping (string => 
    mapping (string => 
    mapping (string => address[]))) public listbyCity; // (country =>state =>city) => of IOUs
    
    mapping (string => 
    mapping (string => 
    mapping (string => 
    mapping (string => address[])))) public listbyStreet; // (country=> state => city =>street) => IOU 

    mapping (address => geoIOU ) posIOU;
    address issuer;
    address makeFactory;


    modifier onlyissuer(address _addrIOU) {
        iIOUtoken.DescriptionIOU memory desc = iIOUtoken(_addrIOU).thisIOUDesc();
        require (desc.issuer == msg.sender, "Only issuer can do this");
        _;
    }

    modifier onlyMake() {
        require (makeFactory != address(0x0), "No makeFactory address");
        require (makeFactory == msg.sender, "Only makeFactory can do this");
        _;
    }


    function setIOUGeo (address _addrIOU, 
                        string memory _country,
                        string memory _state,
                        string memory _city,
                        string memory _street) public onlyissuer (_addrIOU) {
        if (posIOU[_addrIOU].inCity == 0 && posIOU[_addrIOU].onStreet == 0)
            {  
            listbyCity[_country][_state][_city].push(_addrIOU);
            posIOU[_addrIOU].inCity = listbyCity[_country][_state][_city].length;
            listbyStreet[_country][_state][_city][_street].push(_addrIOU);
            posIOU[_addrIOU].onStreet = listbyStreet[_country][_state][_city][_street].length;
            }
        else {
            geoIOU memory curr = posIOU[_addrIOU];
            uint curlen = listbyCity[curr.country][curr.state][curr.city].length;

            listbyCity[curr.country][curr.state][curr.city][curr.inCity -1] = 
            listbyCity[curr.country][curr.state][curr.city][curlen-1];
            delete (listbyCity[curr.country][curr.state][curr.city][curlen-1]);

            curlen = listbyStreet[curr.country][curr.state][curr.city][curr.street].length;
            listbyStreet[curr.country][curr.state][curr.city][curr.street][curr.onStreet -1] = 
            listbyStreet[curr.country][curr.state][curr.city][curr.street][curlen-1];
            delete (listbyStreet[curr.country][curr.state][curr.city][curr.street][curlen-1]);


        }
        
    }



    function getIOUsbyCity(string memory _country,
                        string memory _state,
                        string memory _city) public view returns (address[] memory) {
            return listbyCity [_country][_state][_city];
        }

    function getIOUsbyStreet (string memory _country,
                        string memory _state,
                        string memory _city,
                        string memory _street) public view returns (address[] memory) {
            return listbyStreet[_country][_state][_city][_street];
                }

   
}