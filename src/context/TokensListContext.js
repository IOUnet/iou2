import { createContext } from 'react';

const TokensListContext = createContext({
    setTokensList: () => {},
    setCurrentToken: () => {},
    tokenList: [],
    currentTokenID:'',
    values: {}

})

export default TokensListContext;