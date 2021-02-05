import React, { useReducer } from 'react'

const Context = React.createContext({})

export function RadioContextProvider({ children }) {
      const initialState = {
            dataRadio: null,
            currentStation: null
      }

      const reducer = (state, action) => {
            switch (action.type) {
                  case 'setData': {
                        return {
                              ...state,
                              dataRadio: action.payload
                        }
                  }
                  case 'setCurrentStation': {
                        return {
                              ...state,
                              currentStation: action.payload
                        }
                  }
                  default: return state;
            }
      }

      const [stateRadio, dispatchRadio] = useReducer(reducer, initialState)

      return <Context.Provider value={{ stateRadio, dispatchRadio }}>
            {children}
      </Context.Provider>
}

export default Context