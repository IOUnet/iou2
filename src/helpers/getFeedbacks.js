import IOUToken from '../artifacts/IOUtoken.json' 


export  const getFeedbacks = (drizzle, drizzleState, iouAddress) => {
    

    if ( drizzle.contracts[iouAddress] === undefined  ) {
        const contractConfig = new drizzle.web3.eth.Contract(
            IOUToken.abi, 
            iouAddress
        )
        drizzle.addContract({
            contractName: iouAddress, 
            web3Contract: contractConfig
        }, ['Approval'])
    }

    var feedbacks = []
    const resFeedbacksTrx = drizzle.contracts[iouAddress].methods["getlen"].cacheCall();                      
    if (resFeedbacksTrx !== undefined  && drizzleState.contracts[iouAddress] !== undefined) {
       const arrLenghts= drizzleState.contracts[iouAddress].getlen[resFeedbacksTrx];
       
       if (arrLenghts !== undefined  && arrLenghts.value[1]>0  ) {
        for (var f=0; f < arrLenghts.value[1]; f++) {
         const resFbTrx = drizzle.contracts[iouAddress].methods["allFeedbacks"].cacheCall( f );
         if (resFbTrx !== undefined) {
           const feedback = drizzleState.contracts[iouAddress].allFeedbacks[resFbTrx];
           if (feedback !==undefined) {
               feedbacks.push(feedback);
           }
        }
       }
     } 
    }
    return feedbacks
}