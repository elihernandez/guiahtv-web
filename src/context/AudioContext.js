import React, { useReducer } from 'react'

const Context = React.createContext({})

export function AudioContextProvider({ state, reducer, children }) {
	const initialState = state

	const [stateAudio, dispatchAudio] = useReducer(reducer, initialState)

	return <Context.Provider value={{ stateAudio, dispatchAudio }}>
		{children}
	</Context.Provider>
}

export default Context