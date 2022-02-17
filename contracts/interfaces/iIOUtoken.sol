
pragma solidity >= 0.8.0;
pragma experimental ABIEncoderV2;
interface  iIOUtoken  {

    struct geo {
        string country;
        string state;
        string city;
        string street;
    }

    struct DescriptionIOU {
        uint256 totalMinted;
        uint256 totalBurned;
        int256 avRate;
        bytes32 units;        
        address issuer;
        string myName ; //name of emitter
        string socialProfile ; //profile  of emitter in social nets
        string description ; //description of bond IOU to  work
        geo location; //where is it             
        bytes32[] keywords;
        bytes32 phone;
    }

    struct IOU {
        address receiver;
        uint256 time;
        string IOUDescr; //what IOU is
    }

    struct FeedBack {
        address sender;
        uint256 time;
        int256 rating; // estimation of skills in 255 grades
        uint256 amount;
        string text; //comment
    }
    
    struct IOUdescr {
        string name;
        string symbol;
        iIOUtoken.DescriptionIOU description;
    }
    function IOUname () external view returns  (string memory); 
    function IOUsymbol () external view returns (string memory);  
    function thisIOUDesc () external view returns (DescriptionIOU memory);
    function setIOU (//    constructor (
                string memory name_, 
                string memory symbol_, 
                DescriptionIOU memory _thisIOU,
                 address _store
                )  external;

    function initialize() external;
}