import React, {useEffect, useState, useCallback, useContext} from 'react'
import { drizzleReactHooks } from '@drizzle/react-plugin';
import Web3 from 'web3';
import TokensListContext from '../context/TokensListContext';
import IOUToken from '../artifacts/IOUtoken.json' 
const { useDrizzle, useDrizzleState } = drizzleReactHooks;




export default function useFindIOU() {
    
    const { drizzle } = useDrizzle() ;
    const drizzleState = useDrizzleState(state => state);
    const [IOUAddreses, setIOUAddreses] = useState();
    const [IOUList, setIOUList] = useState();
    const { StoreIOUs, ProxyIOU, IOUtoken } = drizzleState.contracts;

    const tokenList = useContext(TokensListContext)
    const [values, setFormValues] = useState(tokenList.values) 


        const changeIOUListAddreses = useCallback((addressList) => {
            setIOUAddreses(addressList);
        }, [setIOUAddreses]);
    
    
       const changeIOUList = useCallback(
            (listItem) => {
                setIOUList(listItem)
            },
            [setIOUList],
        );

        useEffect( 
            () => {
                const storeIOU = drizzle.contracts.StoreIOUs
            if (values.searchStreet) {
                const getIOUsTrx = storeIOU.methods["getIOUsbyStreet"].cacheCall( Web3.utils.asciiToHex(values.keyword.trim().toLowerCase()), 
                    values.country.trim(), 
                    values.state.trim(), 
                    values.city.trim(), 
                    values.street.trim());
                if (getIOUsTrx !== undefined) {
                const result = StoreIOUs.getIOUsbyStreet[getIOUsTrx];
                if (result !== undefined) {
                    changeIOUListAddreses(result.value);
                }
                }
            } else if (values.searchLocation) {
                const getIOUsTrx = storeIOU.methods["getIOUsbyCity"].cacheCall( Web3.utils.asciiToHex(values.keyword.trim().toLowerCase()), 
                    values.country.trim(), 
                    values.state.trim(), 
                    values.city.trim());
                if (getIOUsTrx !== undefined) {
                const result = StoreIOUs.getIOUsbyCity[getIOUsTrx];
                if (result !== undefined) {
                    changeIOUListAddreses(result.value);
                }
                }
            } else {
                const getIOUsTrx = storeIOU.methods["getIOUListKey"].cacheCall( Web3.utils.asciiToHex(values.keyword.trim().toLowerCase()));
                if (getIOUsTrx !== undefined) {
                const result = StoreIOUs.getIOUListKey[getIOUsTrx];
                if (result !== undefined) {
                    changeIOUListAddreses(result.value);
                }
                }
            }}, [changeIOUListAddreses, drizzleState, drizzle, StoreIOUs, values]);
     
    /* 
          const findIOU = (values) => {
                const storeIOU = drizzle.contracts.StoreIOUs
            if (values.searchStreet) {
                const getIOUsTrx = storeIOU.methods["getIOUsbyCity"].cacheCall( Web3.utils.asciiToHex(values.keyword), values.country, values.state, values.city, values.street);
                if (getIOUsTrx !== undefined) {
                const result = StoreIOUs.getIOUsbyCity[getIOUsTrx];
                if (result !== undefined) {
                  //  changeIOUListAddreses( result.value);
                  return  result.value;
                }
                }
            } else if (values.searchLocation) {
                const getIOUsTrx = storeIOU.methods["getIOUsbyCity"].cacheCall( Web3.utils.asciiToHex(values.keyword), values.country, values.state, values.city);
                if (getIOUsTrx !== undefined) {
                const result = StoreIOUs.getIOUsbyCity[getIOUsTrx];
                if (result !== undefined) {
                 //   changeIOUListAddreses( result.value);               
                 return  result.value;

                 }
                }
            } else {
                const getIOUsTrx = storeIOU.methods["getIOUListKey"].cacheCall( Web3.utils.asciiToHex(values.keyword), {from: drizzleState.accounts[0]});
                if (getIOUsTrx !== undefined) {
                const result = StoreIOUs.getIOUListKey[getIOUsTrx];
                if (result !== undefined) {
                  //  changeIOUListAddreses( result.value);              
                  return  result.value;

                  }
                }
            }
        } */
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
                            const resultTrx = proxyIOU.methods["getIOU"].cacheCall(IOUAddreses[i]);                   
                            
                            if (resultTrx !== undefined) {
                                    const resultItem = ProxyIOU.getIOU[resultTrx]

                                    if (resultItem !== undefined) {
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
               //         changeIOUList(IOUListObjects)
                    }    
                    
                }, [changeIOUList,IOUAddreses, drizzle, IOUtoken])
         
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


    

    return [ IOUList]
// IOUList, IOUAddreses, 
}