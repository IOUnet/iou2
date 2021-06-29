import { createContext } from 'react';

const TokensListContext = createContext({
    setTokensList: () => {},
    setCurrentToken: () => {},
    tokenList: [],
    currentTokenID:''
})

export default TokensListContext;