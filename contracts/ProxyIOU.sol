pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
import  "./interfaces/iIOUtoken.sol";

contract ProxyIOU is iIOUtoken { 
    constructor  () public
    {}
    function getIOU (address _iou) public view returns (
        string memory  name,
        string  memory symbol,
        DescriptionIOU memory descr

    ) {

        iIOUtoken iouT = iIOUtoken(_iou);

        name = iouT.name();
        symbol = iouT.symbol();
        descr = iouT.thisIOU();

    }

    function name () public view returns (string memory) {
        
    }

    function symbol() public  view  returns  (string memory) {

    }

    function thisIOU() public view  returns (DescriptionIOU memory) {

    }

}