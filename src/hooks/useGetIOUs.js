import React, {useEffect, useState, useCallback} from 'react'
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { ViewArraySharp } from '@material-ui/icons';
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
            //        const resultTrxT =  tokenIOU.methods["getTokenInfo"].cacheCall();
                    const resultTrx = proxyIOU.methods["getIOU"].cacheCall(IOUAddreses[i]);
                    if (resultTrx !== undefined && resultTrx !== "0x0" /* && resultTrxT !== undefined */) {
                       const resultItem = ProxyIOU.getIOU[resultTrx]
         //              const resultItemT =  tokenIOU.getTokenInfo[resultTrxT]
                        if (resultItem !== undefined ) {
                            get(addressSocket, {
                                scope: ['portfolio'],
                                payload: {
                                    address: resultItem.value.description.issuer,
                                    currency: 'usd',
                                    portfolio_fields: 'all'
                                },
                                }).then ( response =>{ 
                                let keys = resultItem.value.description.keywords.map((value,key) => {
                                    return drizzle.web3.utils.hexToAscii(value)
                                })
                                IOUListObjects.push( {
                                        id: i,
                                        title: resultItem.value.name,
                                        symbol: resultItem.value.symbol,
                                        count: i,
                                        description: resultItem.value.description.description,
                                        issuerName: resultItem.value.description.myName,
                                        issuerAddr: resultItem.value.description.issuer,
                                        socialProfile: resultItem.value.description.socialProfile,
                                        keys: keys.join(','),
                                        portfolio: JSON.stringify( response.payload.portfolio),
                                    
                                        address: IOUAddreses[i],
                                        minted: drizzle.web3.utils.fromWei(resultItem.value.description.totalMinted),
                                        payed: drizzle.web3.utils.fromWei(resultItem.value.description.totalBurned),
                                        rating: resultItem.value.description.avRate,
                                        units: drizzle.web3.utils.hexToAscii(resultItem.value.description.units),
                                        location: (resultItem.value.description.location),
                                        phone: drizzle.web3.utils.hexToAscii(resultItem.value.description.phone)
                                    })   
                                    changeIOUList(IOUListObjects)
                                })
                        
                        }
                    }
                }
//                changeIOUList(IOUListObjects)
            }    
        
        }, [changeIOUList, IOUAddreses, drizzle, ProxyIOU])

        let io = require('socket.io-client')

        const BASE_URL = 'wss://api-v4.zerion.io/';

        function verify(request, response) {
        // each value in request payload must be found in response meta
        return Object.keys(request.payload).every(key => {
            const requestValue = request.payload[key];
            const responseMetaValue = response.meta[key];
            if (typeof requestValue === 'object') {
            return JSON.stringify(requestValue) === JSON.stringify(responseMetaValue);
            }
            return responseMetaValue === requestValue;
        });
        }

        const addressSocket = {
        namespace: 'address',
        socket: io(`${BASE_URL}address`, {
            transports: ['websocket'],
            timeout: 60000,
            query: {
            api_token:
                'Demo.ukEVQp6L5vfgxcz4sBke7XvS873GMYHy',
            },
        }),
        };

        function get(socketNamespace, requestBody) {
        return new Promise(resolve => {
            const { socket, namespace } = socketNamespace;
            function handleReceive(data) {
            /* if (verify(requestBody, data)) {
                unsubscribe();
                resolve(data);
            } */
            resolve (data); 
            }
            const model = requestBody.scope[0];
            function unsubscribe() {
            socket.off(`received ${namespace} ${model}`, handleReceive);
            socket.emit('unsubscribe', requestBody);
            }
            socket.emit('get', requestBody);
            socket.on(`received ${namespace} ${model}`, handleReceive);
        });
        }


    return IOUList;
}