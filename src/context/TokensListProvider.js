import React, {useState} from 'react'
import TokensListContext from './TokensListContext'


const TokensListProvider = ({children}) => {
   const [tokenList, setValueTokenList] = useState([])
   const [currentTokenID, setCurrentTokenID] = useState('')
   const [values, setValues] = useState(false)

   const setTokenList= (values) => {
    setValueTokenList(values)
   }
   const setFormValues= (values) => {
    setValues(values)
}

   const setCurrentToken = (value) => {
       setCurrentTokenID(value)
   }
   const tokensList = {
    setTokenList,
    setCurrentToken,
    setFormValues,
    tokenList,
    currentTokenID,
    values
   }
 
       return (
           <TokensListContext.Provider value={tokensList} >
               {children}
           </TokensListContext.Provider>
       )
}
export default TokensListProvider