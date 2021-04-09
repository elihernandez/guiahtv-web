import React, { useEffect } from 'react'
import { Content } from './Components/Content'
import { LiveTvContextProvider } from '../../context/LiveTvContext'
import { VideoContextProvider } from '../../context/VideoContext'
import { Guide } from './Components/Guide'
import { Video } from './Components/Video'
import { InfoChannel } from './Components/InfoChannel'
import { TimerChannel } from './Components/Timer'
import { LoaderVideo } from './Components/LoaderVideo'
import { exitFullScreen } from '../../js/Screen'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { exitPip } from '../../js/PictureInPicture'
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
	let { path } = useRouteMatch()
	
	useEffect(() => {

		return () => {
			exitFullScreen()
			exitPip(document.querySelector('video'))
		}
	}, [])

	return (
		<div className="wrapper-livetv">
			<LiveTvContextProvider>
				<VideoContextProvider state={initialState} reducer={reducer}>
					<div className="section-content w-padding-top">
						<Switch>
							<Route exact path={`${path}/:channelId?`} >
								<Content>
									<div className="background-overlay" />
									<LoaderVideo />
									<InfoChannel />
									<TimerChannel />
									<Guide />
								</Content>
								<Video />
							</Route>
						</Switch>
					</div>
				</VideoContextProvider>
			</LiveTvContextProvider>
		</div>
	)
}