pragma solidity >= 0.8.0;
pragma experimental ABIEncoderV2;
import  "./interfaces/iIOUtoken.sol";

contract ProxyIOU  { 


    function getIOU (address _iou) public view returns (
        string memory  ,
        string  memory ,
//        iIOUtoken.DescriptionIOU memory descr
        uint256,// totalMinted;
        uint256,// totalBurned;
        int256,// avRate;
        bytes32,// units;        
        address,// issuer;
        string memory,// myName ; //name of emitter
        string memory,  //socialProfile ; //profile  of emitter in social nets
        string memory, //description ; //description of bond IOU to  work
        iIOUtoken.geo  memory, //location; //where is it             
        bytes32[] memory// keywords;
    ) {

        iIOUtoken iouT = iIOUtoken(_iou);
        iIOUtoken.DescriptionIOU memory descr = iouT.thisIOUDesc();
     return (iouT.IOUname(),
            iouT.IOUsymbol(),
            
            descr.totalMinted,
            descr.totalBurned,
            descr.avRate,
            descr.units,
            descr.issuer,
            descr.myName , //name of emitter
            descr.socialProfile,  //profile  of emitter in social nets
            descr.description,//description of bond IOU to  work
            descr.location, //where is it             
            descr.keywords
            );
    }

}