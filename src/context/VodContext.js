import React, { useReducer } from 'react'

const Context = React.createContext({})

export function VodContextProvider({ children }) {
      const initialState = {
            data: null,
            error: false,
            loading: false
      }

      const reducer = (state, action) => {
            switch (action.type) {
                  case 'setLoading': {
                        return {
                              ...state,
                              loading: action.payload
                        }
                  }
                  case 'setData': {
                        return {
                              ...state,
                              data: action.payload
                        }
                  }
                  case 'setError': {
                        return {
                              ...state,
                              error: action.payload
                        }
                  }
                  default: return state;
            }
      }

      const [stateVod, dispatchVod] = useReducer(reducer, initialState)

      return <Context.Provider value={{ stateVod, dispatchVod }}>
            {children}
      </Context.Provider>
}

export default Context