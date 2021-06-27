import React, {useEffect, useState, useCallback, useContext} from 'react'
import { drizzleReactHooks } from '@drizzle/react-plugin';
const { useDrizzle, useDrizzleState } = drizzleReactHooks;



export default function useCreateIOU() {
    
    const { drizzle } = useDrizzle()
    const drizzleState = useDrizzleState(state => state)
    const approved = false;
    const createIOU = (values) => {
            const makeIOU = drizzle.contracts.MakeIOU
            const location = values.country+' '
            const keywords = values.keywords.map((value, key) => {
                return drizzle.web3.utils.asciiToHex(value)
            })
            const unit = drizzle.web3.utils.asciiToHex(values.unit)
            const argumentsIOU = [values.name, values.symbol, values.username, values.social, values.description, location,unit,keywords]
            const stackId = makeIOU.methods["makeIOU"].cacheSend(...argumentsIOU, {from: drizzleState.accounts[0]})
            
        
        }
    

    return [approved, createIOU]

}