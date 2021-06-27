import React, {useState} from 'react'
import CreateIOUContext from './CreateIOUContext'


const CreateIOUProvider = ({children}) => {
   const [values, setValues] = useState(false)
   
   const setFormValues= (values) => {
        setValues(values)
   }
   const createIOUvalues = {
    setFormValues,
    values
   }

       return (
           <CreateIOUContext.Provider value={createIOUvalues} >
               {children}
           </CreateIOUContext.Provider>
       )
}
export default CreateIOUProvider