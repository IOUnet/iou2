pragma solidity >=  0.5.0;
pragma experimental ABIEncoderV2;



contract StoreIOUs {

    mapping (address => address[]) public listIOUs; // list of emitted IOUs from emitent
    mapping (string => address[])   listIOUsSoc; // list of emitted IOUs by social profile
    mapping (address => address[]) public listHoldersIOUs; //list of tokens by holder
    mapping (address => bool) public isIOU; //security check is token emitted 
    mapping (address => mapping (address => bool)) isHolderthisIOU; //  check list of tokens by holder
    mapping (bytes32 => address[]) listbyKeys; //list of IOUs by keyword
    bytes32[] public allKeywords;  //list all keywords
    address[] public allIOU; //list all emitted IOus
    address[] public allIssuers; //list all issuers of  IOus


    address owner;
    address makeFactory;

    constructor () public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require (owner == msg.sender, "Only owner can do this");
        _;
    }

    modifier onlyMake() {
        require (makeFactory != address(0x0), "No makeFactory address");
        require (makeFactory == msg.sender, "Only makeFactory can do this");
        _;
    }

    modifier isIOUtoken () {
        require (makeFactory == msg.sender || isIOU[msg.sender], "Not IOU token calls" );
        _;
    }

    function setOwner (address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    function setFactory (address _newFact) public onlyOwner {
        makeFactory = _newFact;
    }

    function addIOU1 (address _newIOU, address _emitent) public onlyMake {
        
        isIOU[_newIOU] = true;
        allIOU.push(_newIOU);
        if (listIOUs[_emitent].length == 0) {
            allIssuers.push(_emitent); 
        }
        listIOUs[_emitent].push(_newIOU);
    }


    function addIOU2 (address _newIOU, 
                    string memory _socialProfile,                     
                    bytes32[] memory _keywords) 
                    public  isIOUtoken   {        

        listIOUsSoc[_socialProfile].push(_newIOU);
        uint lenArr = _keywords.length > 5 ? 5: _keywords.length;
        uint lenkey;
        for (uint8 k=0 ; k < lenArr ; k++){
        
            if (_keywords[k] > 0 ){
                if  (listbyKeys[_keywords[k]].length == 0 ) {
                    
                    allKeywords.push(_keywords[k]);
                }
                listbyKeys[_keywords[k]].push(address(_newIOU));
            }
        } 
        }

    function getIOUList (address _owner) public view returns (address[] memory) {
            return listIOUs[_owner];
        }

    function getIOUListSoc (string memory _profile) public view returns (address[] memory) {
            return listIOUsSoc[_profile];
                }

    function getIOUListKey (bytes32 _key) public view returns (address[] memory) {
            return listbyKeys[_key];
                }

    function addHolder(address _holder, address _IOUtoken) public isIOUtoken {
        if (!isHolderthisIOU[_holder][_IOUtoken] ) {
            listHoldersIOUs [_holder].push(_IOUtoken);
            isHolderthisIOU[_holder][_IOUtoken] = true;
        }
    }

    function getIOUListHold (address _holder) public view returns (address[] memory) {
            return listHoldersIOUs [_holder];
        }

    function getIOUstotal () public view  returns (uint256)
    {
        return allIOU.length;
    }    

    function getKeystotal () public view returns (uint256)
    {
        return allKeywords.length;
    }    

    function getIssuerstotal () public view returns (uint256)
    {
        return allIssuers.length;
    }

}