import { createContext } from 'react';

const TokensListContext = createContext({
    setTokensList: () => {},
    setCurrentToken: () => {},
    tokenList: [],
    currentTokenID:'',
    setFormValues: () => {},

/*     keyword:'',
    country:'',
    state:'',
    city:'',
    street:'',
    searchLocation: false,
    searchStreet: false, */
    values: {}
})

export default TokensListContext;