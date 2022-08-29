import React, {useEffect, useState, useCallback, useContext} from 'react'
import { drizzleReactHooks } from '@drizzle/react-plugin';
import IOUtoken from '../artifacts/IOUtoken.json' 
const { useDrizzle, useDrizzleState } = drizzleReactHooks;

export default function usePayoffIOU () {
    const { drizzle } = useDrizzle()
    //const amount = 100;
    const drizzleState = useDrizzleState(state => state)
    const [burntrx, setBurnTrx] = useState();
    const [burnParameters, setParameters] = useState()
    
    const { curIOU, ProxyIOU } = drizzleState.contracts;


    const burnTokens = useCallback((burnParameters) => {
        if (burnParameters !== undefined) {
            const contract = drizzle.contracts.curIOU
            const tokenAmount = drizzle.web3.utils.toBN(parseInt(burnParameters.amount) * 10 ** 18)
            const burntrx = contract.methods["burn"]
            .cacheSend(tokenAmount, burnParameters.rate, burnParameters.feedback, {from: drizzleState.accounts[0]})
            setBurnTrx(burntrx)
        }
            
    }, [drizzle, drizzleState])

    useEffect(() => {
        const { curIOU } = drizzle.contracts;
        if (curIOU === undefined && burnParameters !== undefined) {
           // if (curIOU.address !== burnParameters.TokenAddress) {
           //      console.log("current token address: ", burnParameters.tokenAddress)
                const contractConfig = new drizzle.web3.eth.Contract(
                    IOUtoken.abi, 
                    burnParameters.tokenAddress
                )

                drizzle.addContract({
                    contractName: 'curIOU',
                    web3Contract: contractConfig
                }, ['Approval'])


            // }

        }
        if (burnParameters !== undefined && burntrx === undefined) {
            burnTokens(burnParameters)
        }
        const { transactions, transactionStack } = drizzleState

        var statusTrx = transactions[transactionStack[burntrx]]
        if (statusTrx !== undefined) {
           
            if (statusTrx.status === "success") {
                console.log('success')
            }
        }
       
    }, [drizzleState, burntrx, burnTokens, setParameters, curIOU, drizzle, burnParameters])


    
    return [burnParameters, setParameters]

}