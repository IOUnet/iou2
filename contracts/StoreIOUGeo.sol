pragma solidity >=  0.8.0;
import "./interfaces/iIOUtoken.sol";
import "./interfaces/iStoreIOUGeo.sol";

contract StoreIOUGeo is iStoreIOUGeo{



    mapping (string => 
    mapping (string => 
    mapping (string => address[]))) internal  listbyCity_; // (country =>state =>city) => of IOUs
    
    mapping (string => 
    mapping (string => 
    mapping (string => 
    mapping (string => address[])))) internal listbyStreet_; // (country=> state => city =>street) => IOU 

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
                        string memory _street) public override onlyissuer (_addrIOU) {
        if (posIOU[_addrIOU].inCity == 0 && posIOU[_addrIOU].onStreet == 0)
            {  
            listbyCity_ [_country][_state][_city].push(_addrIOU);
            posIOU[_addrIOU].inCity = listbyCity_ [_country][_state][_city].length;
            listbyStreet_[_country][_state][_city][_street].push(_addrIOU);
            posIOU[_addrIOU].onStreet = listbyStreet_[_country][_state][_city][_street].length;
            }
        else {
            geoIOU memory curr = posIOU[_addrIOU];
            uint curlen = listbyCity_ [curr.country][curr.state][curr.city].length;

            listbyCity_ [curr.country][curr.state][curr.city][curr.inCity -1] = 
            listbyCity_ [curr.country][curr.state][curr.city][curlen-1];
            delete (listbyCity_ [curr.country][curr.state][curr.city][curlen-1]);

            curlen = listbyStreet_[curr.country][curr.state][curr.city][curr.street].length;
            listbyStreet_[curr.country][curr.state][curr.city][curr.street][curr.onStreet -1] = 
            listbyStreet_[curr.country][curr.state][curr.city][curr.street][curlen-1];
            delete (listbyStreet_[curr.country][curr.state][curr.city][curr.street][curlen-1]);


        }
        
    }



    function getIOUsbyCity(string memory _country,
                        string memory _state,
                        string memory _city) public override view returns (address[] memory) {
            return listbyCity_  [_country][_state][_city];
        }

    function getIOUsbyStreet (string memory _country,
                        string memory _state,
                        string memory _city,
                        string memory _street) public override view returns (address[] memory) {
            return listbyStreet_[_country][_state][_city][_street];
                }

   
}