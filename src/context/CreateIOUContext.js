import { createContext } from 'react';

const CreateIOUContext = createContext({
    setFormValues: () => {},
    values: {}
})

export default CreateIOUContext;