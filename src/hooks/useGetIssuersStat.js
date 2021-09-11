import React, {useEffect, useState, useCallback} from 'react'
import { drizzleReactHooks } from '@drizzle/react-plugin';
const { useDrizzle, useDrizzleState } = drizzleReactHooks;

export default function useGetKeys() {
    const { drizzle } = useDrizzle()
    const drizzleState = useDrizzleState(state => state)

    const [IssuersStat, setIssuersStat] = useState()
    
    const { StoreIOUs } = drizzleState.contracts


   const changeIssuersStat = useCallback(
        (listItem) => {
            setIssuersStat(listItem)
        },
        []
    )
    

    
    useEffect( 
        () => {
          const storeIOU = drizzle.contracts.StoreIOUs
          
          const getIOUsTrx = storeIOU.methods["getIssuerstotal"].cacheCall({from: drizzleState.accounts[0]})
          
          if (getIOUsTrx !== undefined) {
            const result = StoreIOUs.getIssuerstotal[getIOUsTrx]
            if (result !== undefined) {
                
                changeIssuersStat(result.value);
                    
            }
          }
        }, [changeIssuersStat, drizzleState, drizzle, StoreIOUs])

  

    return IssuersStat;
}