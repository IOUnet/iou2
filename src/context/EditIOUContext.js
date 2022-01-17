import { createContext } from 'react';

const EditIOUContext = createContext({
    setFormValues: () => {},
    values: {}
})

export default EditIOUContext;