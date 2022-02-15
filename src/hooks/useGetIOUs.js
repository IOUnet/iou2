import React, {useEffect, useState, useCallback} from 'react'
import { drizzleReactHooks } from '@drizzle/react-plugin';
//import IOUToken from '../artifacts/IOUtoken.json'
const IOUToken = require ('../artifacts/IOUtoken.json')
const { useDrizzle, useDrizzleState } = drizzleReactHooks;

export default function useGetIOUs() {
    const { drizzle } = useDrizzle()
    const drizzleState = useDrizzleState(state => state)
    const [IOUAddreses, setIOUAddreses] = useState();
    const [IOUList, setIOUList] = useState()
    var state = drizzle.store.getState()

    const { StoreIOUs, ProxyIOU, IOUtoken } = drizzleState.contracts

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
                    if (drizzle.contracts[ IOUAddreses[i]] === undefined) {
                        const contractConfig = new drizzle.web3.eth.Contract(
                            IOUToken.abi, 
                            IOUAddreses[i]
                        )
                        drizzle.addContract({
                            contractName: IOUAddreses[i], 
                            web3Contract: contractConfig
                        }, ['Approval'])
                    }
                    const  tokenIOU = drizzle.contracts[IOUAddreses[i]]
                   // const resultTrx =  tokenIOU.methods["thisIOUDesc"].cacheCall();
                    const resultTrx = proxyIOU.methods["getIOU"].cacheCall(IOUAddreses[i]);
                    if (resultTrx !== undefined && resultTrx !== "0x0") {
                   //    const resultItem = ProxyIOU.getIOU[resultTrx]
                       const resultItem =  tokenIOU.thisIOUDesc[resultTrx]
                        if (resultItem !== undefined ) {
                            console.log (resultItem)
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