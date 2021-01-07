import React, {useState} from 'react'

const Context = React.createContext({})

export function UserContextProvider({children}){
      const [userAuth, setUserAuth] = useState({
            "plaftorm": '',
            "deviceType": '',
            "deviceVersion": '',
            "uuid": '',
            "userAgent": '',
            "memclem": '',
            "memclid": '',
      })

      return <Context.Provider value={{userAuth, setUserAuth}}>
            {children}
      </Context.Provider>
}

export default Context