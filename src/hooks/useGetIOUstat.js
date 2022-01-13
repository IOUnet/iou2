import React, {useEffect, useState, useCallback} from 'react'
import { drizzleReactHooks } from '@drizzle/react-plugin';
const { useDrizzle, useDrizzleState } = drizzleReactHooks;

export default function useGetKeys() {
    const { drizzle } = useDrizzle()
    const drizzleState = useDrizzleState(state => state)

    const [IOUstat, setIOUstat] = useState()
    
    const { StoreIOUs } = drizzleState.contracts


   const changeIOUstat = useCallback(
        (listItem) => {
            setIOUstat(listItem)
        },
        []
    )
    

    
    useEffect( 
        () => {
          const storeIOU = drizzle.contracts.StoreIOUs
          
          const getIOUsTrx = storeIOU.methods["getIOUstotal"].cacheCall({from: drizzleState.accounts[0]})
          
          if (getIOUsTrx !== undefined) {
            const result = StoreIOUs.getIOUstotal[getIOUsTrx]
            if (result !== undefined) {
                
                changeIOUstat(result.value);
                    
            }
          }
        }, [changeIOUstat, drizzleState, drizzle, StoreIOUs])

  

    return IOUstat;
}