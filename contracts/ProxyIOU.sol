pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;


contract ProxyIOU is iIOUtoken { 

    function getIOU (address _iou) public view returns (
        string  name,
        string  symbol,
        DescriptionIOU descr,
        
    ) {

        iIOUtoken iouT = iIOUtoken(_iou);

        name = iouT.name;
        symbol = iouT.symbol;
        descr = iouT.thisIOU;

    }


}