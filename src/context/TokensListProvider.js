import React, {useState} from 'react'
import TokensListContext from './TokensListContext'


const TokensListProvider = ({children}) => {
   const [tokenList, setValueTokenList] = useState([])
   const [currentTokenID, setCurrentTokenID] = useState('')
   
   const setTokenList= (values) => {
    setValueTokenList(values)
   }

   const setCurrentToken = (value) => {
       setCurrentTokenID(value)
   }
   const tokensList = {
    setTokenList,
    setCurrentToken,
    tokenList,
    currentTokenID
   }

       return (
           <TokensListContext.Provider value={tokensList} >
               {children}
           </TokensListContext.Provider>
       )
}
export default TokensListProvider