import React, { useReducer } from 'react'

const Context = React.createContext({})

export function MusicContextProvider({ children }) {
	const initialState = {
		track: {},
		collection: {},
		artist: {},
		album: {},
		playlist: {},
		listTracks: [],
		listRandomTracks: []
	}

	const reducer = (state, action) => {
		switch (action.type) {
		case 'setTrack': {
			return {
				...state,
				track: action.payload,
			}
		}
		case 'setCollection': {
			return {
				...state,
				collection: action.payload,
			}
		}
		case 'setListTracks': {
			return {
				...state,
				listTracks: action.payload,
			}
		}
		case 'setArtist': {
			return {
				...state,
				artist: action.payload,
			}
		}
		case 'setAlbum': {
			return {
				...state,
				album: action.payload,
			}
		}
		case 'setPlaylist': {
			return {
				...state,
				playlist: action.payload,
			}
		}
		case 'setListRandomTracks': {
			return {
				...state,
				listRandomTracks: action.payload,
			}
		}
		default: return state
		}
	}

	const [stateMusic, dispatchMusic] = useReducer(reducer, initialState)

	return <Context.Provider value={{ stateMusic, dispatchMusic }}>
		{children}
	</Context.Provider>
}

export default Context