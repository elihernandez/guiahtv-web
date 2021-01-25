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

export function VideoContextProvider({children}){
      const initialState = {  
            dataChannel: null,
            activeChannel: false,
            loadingChannel: false,
            timerChannel: false,
            activeTimer: false,
            volume: 30,
            muteVolume: false
      }

      const reducer = (state, action) => {
            switch (action.type) {
                  case 'updateData': {
                        return {
                              ...state,
                              dataChannel: action.payload,
                              timerChannel: false,
                              activeTimer: false
                        }
                  }
                  case 'updateActive': {
                        return {
                              ...state,
                              activeChannel: action.payload,
                        }
                  }
                  case 'updateLoading': {
                        return {
                              ...state,
                              loadingChannel: action.payload,
                        }
                  }
                  case 'updateTimer': {
                        return {
                              ...state,
                              timerChannel: action.timer,
                              activeTimer: action.active,
                              dataChannel: null,
                        }
                  }
                  case 'updateVolume': {
                        return {
                              ...state,
                              volume: action.payload
                        }
                  }
                  case 'muteVolume': {
                        return {
                              ...state,
                              muteVolume: action.payload
                        }
                  }
                  default: return state;
            }
      }

      const [stateVideo, dispatch] = useReducer(reducer, initialState)

      return <Context.Provider value={{stateVideo, dispatch}}>
            {children}
      </Context.Provider>
}

export default Context