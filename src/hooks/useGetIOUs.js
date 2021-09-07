import React, {useEffect, useState, useCallback} from 'react'
import { drizzleReactHooks } from '@drizzle/react-plugin';
const { useDrizzle, useDrizzleState } = drizzleReactHooks;

export default function useGetIOUs() {
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
          
          const getIOUsTrx = storeIOU.methods["getIOUList"].cacheCall( drizzleState.accounts[0])
          if (getIOUsTrx !== undefined) {
            const result = StoreIOUs.getIOUList[getIOUsTrx]
            if (result !== undefined) {
                changeIOUListAddreses(result.value);
            }
          }
        }, [changeIOUListAddreses, drizzleState, drizzle, StoreIOUs])

    
        
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
                            
                            let keys = resultItem.value.description.keywords.map((value,key) => {
                                return drizzle.web3.utils.hexToAscii(value)
                            })
                            IOUListObjects.push( {
                                    id: i,
                                    title: resultItem.value.name,
                                    count: i,
                                    description: resultItem.value.description.description,
                                    keys: keys.join(','),
                                    address: IOUAddreses[i],
                                    minted: drizzle.web3.utils.fromWei(resultItem.value.description.totalMinted),
                                    payed: drizzle.web3.utils.fromWei(resultItem.value.description.totalBurned),
                                    rating: resultItem.value.description.avRate,
                                    units: drizzle.web3.utils.hexToAscii(resultItem.value.description.units),
                                    location: (resultItem.value.description.location),
                                    phone: drizzle.web3.utils.hexToAscii(resultItem.value.description.phone)
                                })   
                        }
                    }
                }
                changeIOUList(IOUListObjects)
            }    
            
        }, [changeIOUList, IOUAddreses, drizzle, ProxyIOU])


    return IOUList;
}