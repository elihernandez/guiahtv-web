import React, { useReducer } from 'react'

const Context = React.createContext({})

export function GlobalContextProvider({ children }) {
	const initialState = {
		snackbarOptions : {
			open: false,
			type: null,
			message: ''
		}
	}

	const reducer = (state, action) => {
		switch (action.type) {
		case 'setSnackbarOptions': {
			return {
				...state,
				snackbarOptions: action.payload,
			}
		}
		default: return state
		}
	}

	const [globalState, globalDispatch] = useReducer(reducer, initialState)

	return <Context.Provider value={{ globalState, globalDispatch }}>
		{children}
	</Context.Provider>
}

export default Context