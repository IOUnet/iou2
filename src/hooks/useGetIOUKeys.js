import React, {useEffect, useState, useCallback} from 'react'
import { drizzleReactHooks } from '@drizzle/react-plugin';
const { useDrizzle, useDrizzleState } = drizzleReactHooks;

export default function useGetPools() {
    const { drizzle } = useDrizzle()
    const drizzleState = useDrizzleState(state => state)
    const [IOUAddreses, setIOUAddreses] = useState();
    const [IOUList, setIOUList] = useState()
    
    const { StoreIOUs, ProxyIOU } = drizzleState.contracts

    const changeIOUListAddreses = (addressList) => {
        setIOUAddreses(addressList);
    }


   const changeIOUList = useCallback(
        (listItem) => {
            setIOUList(listItem)
        },
        [],
    )

    
    useEffect( 
        () => {
          const storeIOU = drizzle.contracts.StoreIOUs
          
          const getIOUsTrx = storeIOU.methods["getIOUList"].cacheCall(drizzleState.accounts[0])
          if (getIOUsTrx !== undefined) {
            const result = StoreIOUs.getIOUList[getIOUsTrx]
            if (result !== undefined) {
                changeIOUListAddreses(result.value);
            }
          }
        }, [drizzleState, drizzle, StoreIOUs])

    
        
    useEffect( 
        () => {
            const proxyIOU = drizzle.contracts.ProxyIOU
            
            if(IOUAddreses !== undefined && IOUAddreses != null) {
                const IOUListObjects = []
                for(var i=0; i<IOUAddreses.length; i++) {
                    const resultTrx = proxyIOU.methods["getIOU"].cacheCall(IOUAddreses[i]);
                    if (resultTrx !== undefined) {
                        const resultItem = ProxyIOU.getIOU[resultTrx]
                        if (resultItem !== undefined) {

                            let keys = resultItem.value[11].map((value,key) => {
                                return drizzle.web3.utils.hexToAscii(value)
                            })
                            IOUListObjects.push( {
                                    id: i,
                                    title: resultItem.value[0],
                                    count: i,
                                    description: resultItem.value[9],
                                    keys: keys.join(','),
                                    address: IOUAddreses[i],
                                    minted: drizzle.web3.utils.fromWei(resultItem.value[2]),
                                    payed: drizzle.web3.utils.fromWei(resultItem.value[3]),
                                    rating: resultItem.value[4],
                                    units: drizzle.web3.utils.hexToAscii(resultItem.value[5]),
                                    location: (resultItem.value[10])
                                })   
                        }
                    }
                }
                changeIOUList(IOUListObjects)
            }    
            
        }, [changeIOUList, IOUAddreses, drizzle, ProxyIOU])


    return IOUList;
}