import React, {useState, useReducer} from 'react'

const Context = React.createContext({})

// export function VideoContextProvider({children}){
//       const initialState = {  
//             data: null,
//             active: false
//       }
//       const [state, dispatch] = useReducer(reducer, initialState)

//       const confirmationReducer = (state, action) => {
//             switch (action.type) {
//                   case 'updateData': {
//                         return {
//                               ...state,
//                               confirmationCode: action.payload,
//                         }
//                   }
//                   case 'updateActive': {
//                         return {
//                               ...state,
//                               confirmationCode: action.payload,
//                         }
//                   }
//                   default: return state;
//             }
//       }

//       const [videoData, setVideoData] = useState({
//             data: null,
//             active: false
//       })

//       console.log(videoData)

//       return <Context.Provider value={{videoData, setVideoData}}>
//             {children}
//       </Context.Provider>
// }

// export default Context

export function VideoContextProvider({state, reducer, children}){
      const initialState = state

      const [stateVideo, dispatch] = useReducer(reducer, initialState)

      return <Context.Provider value={{stateVideo, dispatch}}>
            {children}
      </Context.Provider>
}

export default Context