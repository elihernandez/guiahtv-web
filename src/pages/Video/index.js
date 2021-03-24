import React, { useEffect } from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { VideoContextProvider } from '../../context/VideoContext'
import { Player } from './components/Player'
import { exitFullScreen, isFullScreenElement } from '../../js/Screen'
import { hideTopMenu, showTopMenu } from '../../js/TopMenu'
const pip = require('picture-in-picture')
import './styles.css'

const initialState = {
	hls: null,
	videoRef: null,
	data: null,
	active: false,
	loading: false,
	timer: false,
	activeTimer: false,
	currentTime: 0,
	duration: 0,
	volume: 50,
	playing: false,
	muteVolume: false,
	audioTracks: null,
	audioTrackActive: 0,
	subtitleTracks: null,
	subtitleTrackActive: -1,
	endingMovie: false
}

const reducer = (state, action) => {
	switch (action.type) {
	case 'updateVideoRef': {
		return {
			...state,
			videoRef: action.payload,
		}
	}
	case 'updateData': {
		return {
			...state,
			data: action.payload,
			timer: false,
			activeTimer: false
		}
	}
	case 'updateActive': {
		return {
			...state,
			active: action.payload,
		}
	}
	case 'updateLoading': {
		return {
			...state,
			loading: action.payload,
		}
	}
	case 'updateTimer': {
		return {
			...state,
			timer: action.timer,
			activeTimer: action.active,
			data: null,
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
	case 'setCurrentTime': {
		return {
			...state,
			currentTime: action.payload
		}
	}
	case 'setDuration': {
		return {
			...state,
			duration: action.payload
		}
	}
	case 'setHls': {
		return {
			...state,
			hls: action.payload
		}
	}
	case 'setPlaying': {
		return {
			...state,
			playing: action.payload
		}
	}
	case 'setAudioTracks': {
		return {
			...state,
			audioTracks: action.payload
		}
	}
	case 'setAudioTrackActive': {
		return {
			...state,
			audioTrackActive: action.payload
		}
	}
	case 'setSubtitleTracks': {
		return {
			...state,
			subtitleTracks: action.payload
		}
	}
	case 'setSubtitleTrackActive': {
		return {
			...state,
			subtitleTrackActive: action.payload
		}
	}
	case 'setEndingMovie': {
		return {
			...state,
			endingMovie: action.payload
		}
	}
	default: return state
	}
}

export function VideoVod({ state, dispatchVod }) {
	const history = useHistory()
	const { url } = useRouteMatch()
	const { movieVod } = state

	if (!movieVod) {
		history.push(url.replace('/video', ''))
	}

	useEffect(() => {
		hideTopMenu()

		return () => {
			showTopMenu()
			if(isFullScreenElement()) exitFullScreen()
			if(pip.supported && pip.isActive(document.querySelector('video'))) pip.exit(document.querySelector('video')) 
		}
	}, [])

	return (
		<VideoContextProvider state={initialState} reducer={reducer}>
			<div className="video">
				<div className="video-wrapper">
					<Player state={state} dispatchVod={dispatchVod}/>
				</div>
			</div>
		</VideoContextProvider>
	)
}