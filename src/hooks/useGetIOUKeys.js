import React, {useEffect, useState, useCallback} from 'react'
import { drizzleReactHooks } from '@drizzle/react-plugin';
const { useDrizzle, useDrizzleState } = drizzleReactHooks;

export default function useGetPools() {
    const { drizzle } = useDrizzle()
    const drizzleState = useDrizzleState(state => state)

    const [IOUKeys, setIOUKeys] = useState()
    
    const { StoreIOUs } = drizzleState.contracts


   const changeIOUKeys = useCallback(
        (listItem) => {
            setIOUKeys(listItem)
        },
        [],
    )

    
    useEffect( 
        () => {
          const storeIOU = drizzle.contracts.StoreIOUs
          
          const getIOUsTrx = storeIOU.methods["getKeystotal"].cacheCall(drizzleState.accounts[0])
          
          if (getIOUsTrx !== undefined) {
            const result = StoreIOUs.getKeystotal[getIOUsTrx]
            if (result !== undefined) {
                debugger
                changeIOUKeys(result.value);
                debugger    
            }
          }
        }, [drizzleState, drizzle, StoreIOUs, changeIOUKeys])

  

    return IOUKeys;
}