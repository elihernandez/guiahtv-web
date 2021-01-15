import React, {useState} from 'react'

const Context = React.createContext({})

export function UserContextProvider({children}){
      const [userAuth, setUserAuth] = useState()

      return <Context.Provider value={{userAuth, setUserAuth}}>
            {children}
      </Context.Provider>
}

export default Context