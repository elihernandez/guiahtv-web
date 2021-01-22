import React, { useReducer } from 'react'

const Context = React.createContext({})

export function LiveTvContextProvider({children}){
      const initialState = {  
            dataTV: null,
            currentPage: 0,
            currentCategory : null,
            url: null
      }

      const reducer = (state, action) => {
            switch (action.type) {
                  case 'updateData': {
                        return {
                              ...state,
                              dataTV: action.payload,
                        }
                  }
                  case 'updatePage': {
                        return {
                              ...state,
                              currentPage: action.payload,
                        }
                  }
                  case 'updateCategory': {
                        return {
                              ...state,
                              currentCategory: action.payload,
                        }
                  }
                  case 'updateUrl': {
                        return {
                              ...state,
                              url: action.payload,
                        }
                  }
                  
                  default: return state;
            }
      }

      const [state, dispatchTV] = useReducer(reducer, initialState)

      return <Context.Provider value={{state, dispatchTV}}>
            {children}
      </Context.Provider>
}

export default Context