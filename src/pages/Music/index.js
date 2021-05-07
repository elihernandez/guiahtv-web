import React from 'react'
import { AudioContextProvider } from '../../context/AudioContext'
import { MusicContextProvider } from '../../context/MusicContext'
import { Player } from './components/Player/index'
import { Sections } from './components/Sections'
import { SidebarMusic } from './components/Sidebar'
import './styles.css'

const initialState = {
	audioRef: null,
	hlsRef: null,
	loading: false,
	playing: false,
	muted: false,
	volume: 50,
	repeat: false,
	repeatOne: false,
	pauseList: false,
	random: false,
	error: false
}

const reducer = (state, action) => {
	switch (action.type) {
	case 'setAudioRef': {
		return {
			...state,
			audioRef: action.payload,
		}
	}
	case 'setHls': {
		return {
			...state,
			hlsRef: action.payload,
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
	case 'setMuted': {
		return {
			...state,
			muted: action.payload,
		}
	}
	case 'setVolume': {
		return {
			...state,
			muted: action.payload,
		}
	}
	case 'setRepeat': {
		return {
			...state,
			repeat: action.payload,
		}
	}
	case 'setRepeatOne': {
		return {
			...state,
			repeatOne: action.payload,
		}
	}
	case 'setPauseList': {
		return {
			...state,
			pauseList: action.payload,
		}
	}
	case 'setRandom': {
		return {
			...state,
			random: action.payload,
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

export function Music() {	

	return (
		<MusicContextProvider>
			<AudioContextProvider state={initialState} reducer={reducer}>
				<div className="wrapper-music">
					<div className="music-content">
						<SidebarMusic/>
						<Sections />
						<Player />
					</div>
				</div>
			</AudioContextProvider>
		</MusicContextProvider>
	)

}