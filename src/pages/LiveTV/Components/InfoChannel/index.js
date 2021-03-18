import React, { useContext, useState, useEffect } from 'react'
import VideoContext from '../../../../context/VideoContext'
import { CSSTransition } from 'react-transition-group'
import Tooltip from '@material-ui/core/Tooltip'
import Slider from '@material-ui/core/Slider'
import screenfull, { changeFullScreen, toggleFullScreen } from '../../../../js/Screen'
import pipIcon from '../../../../assets/icons/noun_minimize_2845177.png'
const pip = require('picture-in-picture')
import './styles.css'

function ButtonFullScreen({ dispatch, fullScreen }) {

	const handleClick = () => {
		toggleFullScreen()
		dispatch({ type: 'setFullScreen', payload: !fullScreen })
	}

	const handleChange = () => {
		if (screenfull.isFullscreen) {
			dispatch({ type: 'setFullScreen', payload: true })
		} else {
			dispatch({ type: 'setFullScreen', payload: false })
		}
	}

	useEffect(() => {
		changeFullScreen()
		document.addEventListener('dblclick', handleClick)
		screenfull.on('change', handleChange)

		return () => {
			changeFullScreen()
			document.removeEventListener('dblclick', handleClick)
			screenfull.on('change', handleChange)
		}
	}, [])

	return (
		<Tooltip title={fullScreen ? 'Salir de pantalla completa' : 'Pantalla completa'} placement="top-start">
			<span className="full-screen-icon icon" onClick={handleClick}>
				{fullScreen
					? <i className="fas fa-compress" />
					: <i className="fas fa-expand" />
				}
			</span>
		</Tooltip>
	)
}

function SliderVolume({ volume, handleChange }) {
	return <Slider value={volume} onChange={handleChange} aria-labelledby="continuous-slider" />
}

function ButtonVolume() {
	const { stateVideo, dispatch } = useContext(VideoContext)
	const { volume, muteVolume } = stateVideo

	const handleChange = (event, newValue) => {
		dispatch({ type: 'updateVolume', payload: newValue })
		dispatch({ type: 'muteVolume', payload: false })
	}

	const handleClick = () => {
		if (!muteVolume) {
			dispatch({ type: 'muteVolume', payload: true })
			document.querySelector('video').volume = 0
		} else {
			dispatch({ type: 'muteVolume', payload: false })
			document.querySelector('video').volume = (volume / 100)
		}
	}

	useEffect(() => {
		if (muteVolume) {
			document.querySelector('video').volume = 0
		} else {
			document.querySelector('video').volume = (volume / 100)
		}
	}, [volume])

	return (
		<div className="container-volume">
			<Tooltip title={<SliderVolume volume={volume} handleChange={handleChange} />} placement="left" id="tyh-ugk" interactive>
				<span className="volume-icon icon" onClick={handleClick}>
					{muteVolume &&
                                    <i className="fas fa-volume-mute"></i>
					}
					{volume == 0 && !muteVolume &&
                                    <i className="fas fa-volume-off"></i>
					}
					{volume > 0 && volume <= 60 && !muteVolume &&
                                    <i className="fas fa-volume-down"></i>
					}
					{volume > 60 && !muteVolume &&
                                    <i className="fas fa-volume-up"></i>
					}
				</span>
			</Tooltip>
		</div>
	)
}

function ButtonPIP(){
	const [active, setActive] = useState(false)

	const handleClick = () => {
		if(pip.isActive(document.querySelector('video'))){
			pip.exit(document.querySelector('video'))
			
		}else{
			pip.request(document.querySelector('video'))
		}
	}

	const onEnterPip = () => {
		setActive(true)
	}
      
	const onExitPip = () => {
		document.querySelector('video').play()
		setActive(false)
	}

	useEffect(() => {
		document.querySelector('video').addEventListener('enterpictureinpicture', onEnterPip, false)
		document.querySelector('video').addEventListener('leavepictureinpicture', onExitPip, false)
            
		return () => {
			document.querySelector('video').removeEventListener('enterpictureinpicture', onEnterPip, false)
			document.querySelector('video').removeEventListener('leavepictureinpicture', onExitPip, false)
		}
	}, [])

	return (
		<Tooltip title={active ? 'Maximizar video' : 'Minimizar video'} placement="top-start">
			<span className="pip-icon icon" onClick={handleClick}>
				<img src={pipIcon} />
			</span>
		</Tooltip>
	)
}

export function InfoChannel() {
	const {stateVideo, dispatch } = useContext(VideoContext)
	const { dataChannel, activeChannel, fullScreen } = stateVideo
	const [name, setName] = useState('')

	useEffect(() => {
		if (activeChannel) setName(dataChannel.Name)
	}, [activeChannel])

	return (
		<CSSTransition in={activeChannel} timeout={100} classNames="active" unmountOnExit>
			<div className="info-channel">
				{name &&
					<div className="info-channel-wrapper">
						<div className="title-channel">
							<h3 className="text-info">Estás viendo:</h3>
							<h2 className="channel-name">{name}</h2>
						</div>
						<div className="right-buttons">
							<ButtonVolume />
							{ pip.supported &&
							<ButtonPIP />
							}
							<ButtonFullScreen dispatch={dispatch} fullScreen={fullScreen} />
						</div>
					</div>
				}
			</div>
		</CSSTransition>
	)
}
