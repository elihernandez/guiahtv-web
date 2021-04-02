import React from 'react'
import { RadioContextProvider } from '../../context/RadioContext'
import { AudioContextProvider } from '../../context/AudioContext'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { Guide } from './components/Guide'
import { Player } from './components/Player'
import './styles.css'

const initialState = {
	hls: null,
	audioRef: null,
	data: null,
	active: false,
	loading: false,
	playing: false,
	muteVolume: false,
	volume: 50,
	error: false
}

const reducer = (state, action) => {
	switch (action.type) {
	case 'setHls': {
		return {
			...state,
			hls: action.payload,
		}
	}
	case 'setAudioRef': {
		return {
			...state,
			audioRef: action.payload,
		}
	}
	case 'setData': {
		return {
			...state,
			data: action.payload,
		}
	}
	case 'setActive': {
		return {
			...state,
			active: action.payload,
		}
	}
	case 'setLoading': {
		return {
			...state,
			loading: action.payload,
		}
	}
	case 'setPlaying': {
		return {
			...state,
			playing: action.payload,
		}
	}
	case 'setMuteVolume': {
		return {
			...state,
			muteVolume: action.payload,
		}
	}
	case 'setVolume':{
		return {
			...state,
			volume: action.payload,
		}
	}
	case 'setError': {
		return {
			...state,
			error: action.payload,
		}
	}
	default: return state
	}
}

export function Radio(){
	const { url } = useRouteMatch()

	return (
		<div className="wrapper-radio">
			<RadioContextProvider>
				<div className="section-content">
					<Switch>
						<Route exact path={`${url}/:contentId?`} >
							<AudioContextProvider state={initialState} reducer={reducer}>
								<Guide />
								<Player />
							</AudioContextProvider>
						</Route>
					</Switch>
				</div>
			</RadioContextProvider>
		</div>
	)
}