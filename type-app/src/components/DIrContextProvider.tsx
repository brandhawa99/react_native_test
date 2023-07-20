import React ,{createContext, useState} from 'react';

const DirContext = createContext<any>(""); 
const DirContextProvider = (props:any) =>{
  const [savedTo, setSavedTo] = useState("default"); 

  return(
    <DirContext.Provider value={{savedTo, setSavedTo}}>
      {props.children}
    </DirContext.Provider>
  )
}

export default DirContextProvider; 