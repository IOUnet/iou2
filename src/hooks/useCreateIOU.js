import React, {useEffect, useState, useCallback, useContext} from 'react'
import { drizzleReactHooks } from '@drizzle/react-plugin';
const { useDrizzle, useDrizzleState } = drizzleReactHooks;



export default function useCreateIOU() {
    // makeIOU(string memory _name, 
    //     string memory _symbol, 
    //     string memory _myName, //name of emitter
    //     string memory _socialProfile, //profile  of emitter in social nets
    //     string memory _description, //description of bond IOU to  work
    //     string  memory _location, //where is                  
    //     bytes32  _units, //units of deal
    //     bytes32[] memory _keywords
    //           ) 
    const { drizzle } = useDrizzle()
    const drizzleState = useDrizzleState(state => state)
    const approved = false;
    const createIOU = (values) => {
            const makeIOU = drizzle.contracts.MakeIOU
            const location ={'inCity':0, 
                            'onStreet':0,
                            'country': values.country.trim(),
                            'state': values.state.trim(),
                            'city': values.city.trim(),
                            'street': values.street.trim()
                        };
            const keywords = values.keywords.map((value, key) => {
                return drizzle.web3.utils.asciiToHex(value.trim().toLowerCase())
            })
            const unit = drizzle.web3.utils.asciiToHex(values.unit)
            const phone = drizzle.web3.utils.asciiToHex(values.phone)
            const argumentsIOU = [values.name.trim(),
                                 values.symbol.trim(), 
                                 values.username, 
                                 values.social.trim(), 
                                 values.description, 
                                 location,
                                 unit,
                                 keywords,
                                 phone]
            const stackId = makeIOU.methods["makeIOU"].cacheSend(...argumentsIOU, {from: drizzleState.accounts[0]})
            
        
        }
    

    return [approved, createIOU]

}
