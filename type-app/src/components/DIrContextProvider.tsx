import React ,{createContext, useState} from 'react';

const DirContext = createContext<any>(""); 
const DirContextProvider = (props:any) =>{
  const [saveTo, setSaveTo] = useState("default"); 

  return(
    <DirContext.Provider value={{saveTo, setSaveTo}}>
      {props.children}
    </DirContext.Provider>
  )
}

export default DirContextProvider; 