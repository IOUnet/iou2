import React, {useEffect, useState, useCallback} from 'react'
import { drizzleReactHooks } from '@drizzle/react-plugin';
const { useDrizzle, useDrizzleState } = drizzleReactHooks;

export default function useGetPools() {
    const { drizzle } = useDrizzle()
    const drizzleState = useDrizzleState(state => state)
    const [depositIDs, setDepositIDs] = useState();
    const [depositList, setDepositList] = useState(null)

    const { investmentPools } = drizzleState.contracts

    const changeDepositIDs = (depositResult) => {
        setDepositIDs(depositResult);
    }


   const changeDepositList = useCallback(
        (listItem) => {
            setDepositList(listItem)
        },
        [],
    )

    
    useEffect( 
        () => {
          const contract = drizzle.contracts.investmentPools
          
          const depositTrx = contract.methods["getUser"].cacheCall(drizzleState.accounts[0])
          if (depositTrx !== undefined) {
            const result = investmentPools.getUser[depositTrx]
            if (result !== undefined) {
                changeDepositIDs(result.value.deposits);
            }
          }
        }, [investmentPools, drizzleState, drizzle.contracts.investmentPools])

    
        
    useEffect( 
        () => {
            const contract = drizzle.contracts.investmentPools
            
            if(depositIDs !== undefined) {
                const depositListObjects = []
                for(var i=0; i<depositIDs.length; i++) {
                    const resultTrx = contract.methods["getDeposit"].cacheCall(depositIDs[i]);
                    if (resultTrx !== undefined) {
                        const resultItem = investmentPools.getDeposit[resultTrx]
                        if (resultItem !== undefined) {
                        depositListObjects.push({date:resultItem.value.date,
                                           amount:drizzle.web3.utils.fromWei(resultItem.value.amount,'ether'),
                                           state:resultItem.value.state,
                                           id: depositIDs[i],
                                           tokens: drizzle.web3.utils.fromWei(resultItem.value.tokens, 'ether'),
                                           poolID: resultItem.value.poolId})
                        }
                    }
                }
                changeDepositList(depositListObjects)
            }    
            
        }, [changeDepositList,depositIDs,investmentPools, drizzle])


    return depositList;
}