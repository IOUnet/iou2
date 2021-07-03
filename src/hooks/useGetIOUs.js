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
                            IOUListObjects.push( {
                                    id: i,
                                    title: resultItem.value[0],
                                    count: i,
                                    description: resultItem.value[9],
                                    keys: resultItem.value[11],
                                    address: IOUAddreses[i],
                                    minted: resultItem.value[2],
                                    payed: resultItem.value[3],
                                    rating: resultItem.value[4],
                                    units: drizzle.web3.utils.hexToAscii(resultItem.value[5])
                                })   
                           
                            
                            // avRate: "0"
                            // description: "test"
                            // issuer: "0x8D67716DE05d313911A957077B91730D2C7e7c70"
                            // keywords: []
                            // location: "Eldorado "
                            // myName: "test"
                            // socialProfile: "test"
                            // totalBurned: "0"
                            // totalMinted: "0"
                            // units: "0x686f757273000000000000000000000000000000000000000000000000000000"
                            // avRate: "0"
                            // description: "test"
                            // issuer: "0x8D67716DE05d313911A957077B91730D2C7e7c70"
                            // keywords: []
                            // location: "Eldorado "
                            // myName: "test"
                            // socialProfile: "test"
                            // totalBurned: "0"
                            // totalMinted: "0"
                            // units: "0x686f757273000000000000000000000000000000000000000000000000000000"
                            // length: 10
                            // name: "test"
                            // symbol: "tt"
                            console.log(resultItem)    
                        }
                    }
                }
                changeIOUList(IOUListObjects)
            }    
            
        }, [changeIOUList,IOUAddreses, drizzle, ProxyIOU])


    return IOUList;
}