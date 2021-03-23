import React, { useEffect } from 'react'
import { Content } from './Components/Content'
import { LiveTvContextProvider } from '../../context/LiveTvContext'
import { VideoContextProvider } from '../../context/VideoContext'
import { GuideChannels } from './Components/Guide'
import { Video } from './Components/Video'
import { InfoChannel } from './Components/InfoChannel'
import { TimerChannel } from './Components/Timer'
import { LoaderVideo } from './Components/LoaderVideo'
import { exitFullScreen } from '../../js/Screen'
import { hideTopMenuNavbar, showTopMenuNavbar } from '../../js/TopMenu'
const pip = require('picture-in-picture')
import './styles.css'

const initialState = {
	dataChannel: null,
	activeChannel: false,
	loadingChannel: false,
	timerChannel: false,
	activeTimer: false,
	volume: 50,
	muteVolume: false,
	fullScreen: false,
	timeoutErrorRef: null
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
			activeTimer: action.active
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
	case 'setFullScreen': {
		return {
			...state,
			fullScreen: action.payload
		}
	}
	case 'setTimeoutErrorRef': {
		return {
			...state,
			timeoutErrorRef: action.payload
		}
	}
	default: return state
	}
}

export function LiveTV() {

	useEffect(() => {
		showTopMenuNavbar()

		return () => {
			hideTopMenuNavbar()
			exitFullScreen()
			if( pip.supported && pip.isActive(document.querySelector('video'))) pip.exit(document.querySelector('video')) 
		}
	}, [])

	return (
		<div className="wrapper-livetv">
			<LiveTvContextProvider>
				<VideoContextProvider state={initialState} reducer={reducer}>
					<div className="section-content w-padding-top">
						<Content>
							<div className="background-overlay" />
							<LoaderVideo />
							<InfoChannel />
							<TimerChannel />
							<GuideChannels />
						</Content>
						<Video />
					</div>
				</VideoContextProvider>
			</LiveTvContextProvider>
		</div>
	)
}