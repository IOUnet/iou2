pragma solidity >=  0.8.0;
pragma experimental ABIEncoderV2;
import "./interfaces/iStoreIOUs.sol";
import "./interfaces/iIOUtoken.sol";
import "./Initializable.sol";
import "./StoreIOUData.sol";

contract newStoreIOUs is StoreIOUData,  iStoreIOUs {
    //constructor ()  {
    function initialize () public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require (owner == msg.sender, "Only owner can do this");
        _;
    }

/*     modifier onlyFactory() {
/*         require (makeFactory != address(0x0), "No makeFactory address");
        require (makeFactory == msg.sender, "Only makeFactory can do this"); 
        _;
    }

    modifier isIOUtoken () {
        require (makeFactory == msg.sender || isIOU[msg.sender] > 0 , "Not IOU token calls" );
        _;
    }
 */
    function setOwner (address _newOwner) public onlyOwner {
        owner = _newOwner;
    }
/* 
    function setFactory (address _newFact) public onlyOwner {
        makeFactory = _newFact;
    }
 */
    function setimplIOU (address _newImpl) public onlyOwner {
        implementIOU = _newImpl;
    }

    modifier onlySelf(address _addrIOU) {
       // iIOUtoken.DescriptionIOU memory desc = iIOUtoken(_addrIOU).thisIOUDesc();
        require (_addrIOU == msg.sender, "Only own data can be changed");
        _;
    }

    function addIOU1 (address _addrIOU, address _emitent,  iIOUtoken.DescriptionIOU calldata _thisIOU ) public override  {
        
        allIOU.push(_addrIOU);
        isIOU[_addrIOU] = allIOU.length;

        if (listIOUs[_emitent].length == 0) {
            allIssuers.push(_emitent); 
        }
        listIOUs[_emitent].push(_addrIOU);
        //iIOUtoken curIOU =  iIOUtoken(_addrIOU);
        listIOUsSoc[_thisIOU.socialProfile].push(_addrIOU);
        _addKeys(_addrIOU, _thisIOU.keywords, _thisIOU.location);
    }


    function addKeys (bytes32[] calldata _keywords, address _addrIOU ) public onlySelf (_addrIOU) override {

        _addKeys(_addrIOU, _keywords, iIOUtoken(_addrIOU).thisIOUDesc().location);
    }
    function delKeys (bytes32[] calldata _keywords, address _addrIOU ) public onlySelf (_addrIOU) override {
        _delKeys(_addrIOU, _keywords);
    }

    
    /// when changed geolocation
    function changeIOUGeoAllkeys  (iIOUtoken.geo calldata _newloc, address _addrIOU ) external override onlySelf (_addrIOU) {
        bytes32[] memory keys = iIOUtoken(_addrIOU).thisIOUDesc().keywords;
        for (uint8 k=0; k<keys.length; k++)  {  
            bytes32 key = keys[k];
            _delkeyIOUGeo(_addrIOU, key);
            _setIOUGeo(_addrIOU, _newloc, key);          

            }
    }
    function _addKeys (address _addrIOU, bytes32[] memory _keywords, iIOUtoken.geo  memory _location) internal{

        uint lenArr = _keywords.length > 5 ? 5: _keywords.length;
        for (uint8 k=0 ; k < lenArr ; k++){
            bytes32 key = _keywords[k];
                if (key > 0 ){
                    address[] memory lbk = listbyKeys[key];
                    if  (lbk.length == 0 ) { // new keyword, never used in IOUs before
                        allKeywords.push(key);
                    }
                    if (keyByList[key][_addrIOU] == 0) {
                        listbyKeys[key].push(_addrIOU);
                        keyByList[key][_addrIOU] = listbyKeys[key].length;
                    }
                    _setIOUGeo(_addrIOU,
                            _location, 
                            key);
                }
            } 
    }


    function _delKeys (address _addrIOU, bytes32[] memory _keywords) internal{

        uint lenArr = _keywords.length > 5 ? 5: _keywords.length;
        for (uint8 k=0 ; k < lenArr ; k++){
            bytes32 key = _keywords[k];
            if (key > 0 ){
                uint keyNum = keyByList[key][_addrIOU];
                if  (keyNum > 0 ) {
                    listbyKeys[key][keyNum-1] = 
                    listbyKeys[key][
                      listbyKeys[key].length -1];
                    listbyKeys[key].pop();
                    _delkeyIOUGeo(_addrIOU, key);
                }
 
            }
        } 
    }


    function _setIOUGeo (address _addrIOU, 
                        iIOUtoken.geo memory _loc,
                        bytes32 _key) internal { //public  onlySelf (_addrIOU)

        listbyCity_[_key] [_loc.country][_loc.state][_loc.city].push(_addrIOU);
        posIOU[_addrIOU].inCity = uint64(listbyCity_[_key][_loc.country][_loc.state][_loc.city].length);
        listbyStreet_[_key][_loc.country][_loc.state][_loc.city][_loc.street].push(_addrIOU);
        posIOU[_addrIOU].onStreet = uint64(listbyStreet_[_key][_loc.country][_loc.state][_loc.city][_loc.street].length);

    }

    function _delkeyIOUGeo  (address _addrIOU, 
                            bytes32 key) internal {

        iIOUtoken.geo memory curr = iIOUtoken(_addrIOU).thisIOUDesc().location;

        uint curlen = listbyCity_[key][curr.country][curr.state][curr.city].length;
        // delete old key connection
        listbyCity_[key][curr.country][curr.state][curr.city][posIOU[_addrIOU].inCity -1] = 
        listbyCity_[key][curr.country][curr.state][curr.city][curlen-1];
        listbyCity_[key][curr.country][curr.state][curr.city].pop();

        curlen = listbyStreet_[key][curr.country][curr.state][curr.city][curr.street].length;
        listbyStreet_[key][curr.country][curr.state][curr.city][curr.street][posIOU[_addrIOU].onStreet -1] = 
        listbyStreet_[key][curr.country][curr.state][curr.city][curr.street][curlen-1];
        listbyStreet_[key][curr.country][curr.state][curr.city][curr.street].pop();
        
        }



    function addHolder(address _holder, address _IOUtoken) public override onlySelf (_IOUtoken) {
        if (!isHolderthisIOU[_holder][_IOUtoken] ) {
            listHoldersIOUs [_holder].push(_IOUtoken);
            isHolderthisIOU[_holder][_IOUtoken] = true;
        }
    }

    function getIOUList (address _owner) public override view returns (address[] memory) {
            return listIOUs[_owner];
        }

    function getIOUListSoc (string memory _profile) public override view returns (address[] memory) {
            return listIOUsSoc[_profile];
                }

    function getIOUListKey (bytes32 _key) public override view returns (address[] memory) {
            return listbyKeys[_key];
                }


    function getIOUListHold (address _holder) public view override returns (address[] memory) {
            return listHoldersIOUs [_holder];
        }

    function getIOUstotal () public view override  returns (uint256)
    {
        return allIOU.length;
    }    

    function getKeystotal () public view override returns (bytes32[] memory) 
    {
        return allKeywords;
    }    

    function getIssuerstotal () public view override returns (uint256)
    {
        return allIssuers.length;
    }

    function getIOUsbyCity(bytes32 _key,
                            string memory _country,
                            string memory _state,
                            string memory _city) public  view returns (address[] memory) {
        return listbyCity_  [_key][_country][_state][_city];
            }

    function getIOUsbyStreet (bytes32 _key,
                        string memory _country,
                        string memory _state,
                        string memory _city,
                        string memory _street) public view returns (address[] memory) {
        return listbyStreet_[_key][_country][_state][_city][_street];
                }
    function implIOU() external view returns (address) {
        return implementIOU;
    }
    }