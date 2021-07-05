import React, {useEffect, useState, useCallback, useContext} from 'react'
import { drizzleReactHooks } from '@drizzle/react-plugin';
import IOUtoken from '../artifacts/IOUtoken.json' 
const { useDrizzle, useDrizzleState } = drizzleReactHooks;

export default function useAproveToken () {
    const { drizzle } = useDrizzle()
    //const amount = 100;
    const drizzleState = useDrizzleState(state => state)
    const [mintTrx, setMintTrx] = useState();
    const [mintParameters, setAmount] = useState()
    
    const { curIOU } = drizzleState.contracts;
    const approved = false;

    const mintTokens = useCallback((mintParameters) => {
        if (mintParameters !== undefined) {
            const contract = drizzle.contracts.curIOU
            const tokenAmount = drizzle.web3.utils.toBN(parseInt(mintParameters.amount) * 10 ** 18)
            const minttrx = contract.methods["mint"]
            .cacheSend(mintParameters.address, tokenAmount, mintParameters.comment, {from: drizzleState.accounts[0]})
            setMintTrx(minttrx)
        }
            
    }, [drizzle, drizzleState])

    

    useEffect(() => {
        const { curIOU } = drizzleState.contracts;
        if (curIOU === undefined && mintParameters !== undefined) {
           // if (curIOU.address !== mintParameters.TokenAddress) {
                const contractConfig = new drizzle.web3.eth.Contract(
                    IOUtoken.abi, 
                    mintParameters.tokenAddress
                  )
                drizzle.addContract({
                    contractName: 'curIOU', 
                    web3Contract: contractConfig
                 }, ['Approval'])
           // }
            

        }
        if (mintParameters !== undefined && mintTrx === undefined) {
            mintTokens(mintParameters)
        }
        const { transactions, transactionStack } = drizzleState
        var statusTrx = transactions[transactionStack[mintTrx]] 
        if (statusTrx !== undefined) {
           
            if (statusTrx.status === "success") {
                console.log('success')
            }
        }
       
    }, [drizzleState, mintTrx, mintTokens, mintParameters, setAmount, curIOU, drizzle])


    
    return [approved, setAmount]

}