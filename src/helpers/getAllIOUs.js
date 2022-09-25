import IOUToken from '../artifacts/IOUtoken.json'

export const getAllIOUs = (drizzle, drizzleState, iouAddress) => {
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

  const IOUs = [];

  const resFbTrx = drizzle.contracts[iouAddress].methods["allIOUs"].cacheCall(0);

  if (resFbTrx !== undefined) {


    if (drizzleState.contracts[iouAddress] != undefined) {
      const feedback = drizzleState.contracts[iouAddress].allIOUs[resFbTrx];

      if (feedback !== undefined) {
        console.log(drizzleState)
        IOUs.push(feedback);
      }
    }
  }

  return IOUs;
}