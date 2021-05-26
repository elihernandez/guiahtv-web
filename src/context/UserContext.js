import React, { createContext, useEffect, useReducer } from 'react'
import { useUserAuth } from '../hooks/useUserAuth'
import { isArrayEmpty } from '../js/Array'
const Context = createContext({})

const initialState = {
	memclid: null,
	memclem: null,
	credentials: [],
	suscriptionStatus: null,
	errorAuth: false
}

const reducer = (state, action) => {
	switch (action.type) {
	case 'setCredentials': {
		return {
			...state,
			credentials: action.payload
		}
	}
	case 'setErrorAuth': {
		return {
			...state,
			errorAuth: action.payload
		}
	}
	case 'setSuscriptionStatus': {
		return {
			...state,
			suscriptionStatus: action.payload
		}
	}
	default: return state
	}
}

export function UserContextProvider({ children }) {
	const cookies = useUserAuth()
	const [stateUser, dispatchUser] = useReducer(reducer, initialState)

	useEffect(() => {
		dispatchUser({ type: 'setCredentials', payload: cookies })
	}, [cookies])

	return <Context.Provider value={{ stateUser, dispatchUser }}>
		{!isArrayEmpty(stateUser.credentials) && (
			children
		)}
	</Context.Provider>
}

export default Context