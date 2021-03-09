import React, { useReducer } from 'react'

const Context = React.createContext({})

export function VideoContextProvider({ state, reducer, children }) {
      const initialState = state

      const [stateVideo, dispatch] = useReducer(reducer, initialState)

      return <Context.Provider value={{ stateVideo, dispatch }}>
            {children}
      </Context.Provider>
}

export default Context