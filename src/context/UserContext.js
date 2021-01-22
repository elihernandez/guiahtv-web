import React, { createContext, useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
const Context = createContext({})

export function UserContextProvider({ children }) {
      const cookies = useAuth()
      const [userAuth, setUserAuth] = useState([])

      useEffect(() => {
            setUserAuth(cookies)
      }, [userAuth])

      return (
            <Context.Provider value={{ userAuth, setUserAuth }}>
                  {children}
            </Context.Provider>
      )
}

export default Context