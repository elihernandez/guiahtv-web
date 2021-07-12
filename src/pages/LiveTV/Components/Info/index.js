import React, { useContext } from 'react'
import { CSSTransition } from 'react-transition-group'
import VideoContext from '../../../../context/VideoContext'
import { ButtonPip } from './components/ButtonPip'
import { TitleChannel } from './components/TitleChannel'
import { ButtonVolume } from './components/ButtonVolume'
import { ButtonFullScreen } from './components/ButtonFullScreen'
import './styles.css'

export function Info() {
	const {stateVideo, dispatch } = useContext(VideoContext)
	const { 
		dataChannel: data, 
		activeChannel: active, 
		fullScreen,
	} = stateVideo

	return (
		<CSSTransition in={active} timeout={100} classNames="active" unmountOnExit>
			<div className="info-channel">
				<div className="info-channel-wrapper">
					<TitleChannel data={data} active={active} />
					<div className="right-buttons">
						<ButtonVolume />
						<ButtonPip />
						<ButtonFullScreen dispatch={dispatch} fullScreen={fullScreen} />
					</div>
				</div>
			</div>
		</CSSTransition>
	)
}