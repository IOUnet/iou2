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
  const resHoldersTrx = drizzle.contracts[iouAddress].methods["getlen"].cacheCall();


  if (resHoldersTrx !== undefined  && drizzleState.contracts[iouAddress] !== undefined) {
      const arrLenghts= drizzleState.contracts[iouAddress].getlen[resHoldersTrx];

      if (arrLenghts !== undefined  && arrLenghts.value[0]>0  ) {
        for (var h=0; h < arrLenghts.value[0]; h++) {
          const resHldTrx = drizzle.contracts[iouAddress].methods["allIOUs"].cacheCall(h);

          if (resHldTrx !== undefined) {
            if (drizzleState.contracts[iouAddress] !== undefined) {
              const holder = drizzleState.contracts[iouAddress].allIOUs[resHldTrx];
              if (holder !== undefined) {
                IOUs.push(holder);
              }
            }
          }
        }
      }

    console.log(IOUs)
    return IOUs;
  }
}