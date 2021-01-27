import React, { createContext, useState, useEffect, useReducer } from 'react'
import { useAuth } from '../hooks/useAuth'
const Context = createContext({})

// export function UserContextProvider({ children }) {
//       const cookies = useAuth()
//       const [userAuth, setUserAuth] = useState([])

//       useEffect(() => {
//             setUserAuth(cookies)
//       }, [userAuth])

//       return (
//             <Context.Provider value={{ userAuth, setUserAuth }}>
//                   {children}
//             </Context.Provider>
//       )
// }

export function UserContextProvider({ children }) {
      const initialState = {
            credentials: [],
            suscriptionStatus: null,
            errorAuth: false
      }

      const reducer = (state, action) => {
            switch (action.type) {
                  case 'setCredentials': {
                        return {
                              ...state,
                              credentials: action.payload
                        }
                  }
                  case 'setErrorAuth': {
                        return {
                              ...state,
                              errorAuth: action.payload
                        }
                  }
                  case 'setSuscriptionStatus': {
                        return {
                              ...state,
                              suscriptionStatus: action.payload
                        }
                  }
                  default: return state;
            }
      }

      const cookies = useAuth()
      const [stateUser, dispatchUser] = useReducer(reducer, initialState)

      useEffect(() => {
            dispatchUser({ type: 'setCredentials', payload: cookies})
      }, [cookies])

      return <Context.Provider value={{ stateUser, dispatchUser }}>
            {children}
      </Context.Provider>
}

export default Context