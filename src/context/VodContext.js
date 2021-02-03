import React, { useReducer } from 'react'

const Context = React.createContext({})

export function VodContextProvider({ children }) {
      const initialState = {
            dataVod: null,
            errorVod: false,
            loadingVod: false,
            serieVod: null,
            seasonVod: null,
            movieVod: null,
            videoRef: null
      }

      const reducer = (state, action) => {
            switch (action.type) {
                  case 'setLoading': {
                        return {
                              ...state,
                              loadingVod: action.payload
                        }
                  }
                  case 'setData': {
                        return {
                              ...state,
                              dataVod: action.payload
                        }
                  }
                  case 'setError': {
                        return {
                              ...state,
                              errorVod: action.payload
                        }
                  }
                  case 'setSeason': {
                        return {
                              ...state,
                              seasonVod: action.payload
                        }
                  }
                  case 'setSerie': {
                        return {
                              ...state,
                              serieVod: action.payload
                        }
                  }
                  case 'setMovie': {
                        return {
                              ...state,
                              movieVod: action.payload
                        }
                  }
                  case 'setVideoRef': {
                        return {
                              ...state,
                              videoRef: action.payload
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