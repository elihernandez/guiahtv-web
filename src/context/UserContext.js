import React, {useState} from 'react'

const Context = React.createContext({})

export function UserContextProvider({children}){
      const [user, setUser] = useState({
            "plaftorm": '',
            "deviceType": '',
            "deviceVersion": '',
            "uuid": '',
            "userAgent": '',
            "memclem": '',
            "memclid": '',

      })

      return <Context.Provider value={{user, setUser}}>
            {children}
      </Context.Provider>
}

export default Context