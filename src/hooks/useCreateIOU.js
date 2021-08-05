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
                            'country': values.country,
                            'state': values.state,
                            'city': values.city,
                            'street': values.street
                        };
            const keywords = values.keywords.map((value, key) => {
                return drizzle.web3.utils.asciiToHex(value)
            })
            const unit = drizzle.web3.utils.asciiToHex(values.unit)
            const argumentsIOU = [values.name, values.symbol, values.username, values.social, values.description, location,unit,keywords]
            const stackId = makeIOU.methods["makeIOU"].cacheSend(...argumentsIOU, {from: drizzleState.accounts[0]})
            
        
        }
    

    return [approved, createIOU]

}
