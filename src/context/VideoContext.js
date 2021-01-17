import React, {useState} from 'react'

const Context = React.createContext({})

export function VideoContextProvider({children}){
      const [videoData, setVideoData] = useState()

      return <Context.Provider value={{videoData, setVideoData}}>
            {children}
      </Context.Provider>
}

export default Context