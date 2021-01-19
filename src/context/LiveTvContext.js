import React, { useState } from 'react'

const Context = React.createContext({})

export function LiveTvContextProvider({children}){
      const [data, setData] = useState({
            data: [],
            url: null
      })

      return <Context.Provider value={{data, setData}}>
            {children}
      </Context.Provider>
}

// export const LiveTvProvider = LiveTvContext.Provider

export default Context