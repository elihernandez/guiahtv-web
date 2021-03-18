import React, { Fragment, useRef, useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'
import Slider from '@material-ui/core/Slider'
import screenfull, { changeFullScreen, toggleFullScreen } from '../../../../js/Screen'
import { CSSTransition } from 'react-transition-group'
import Popover from '@material-ui/core/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import imgTracks from '../../../../assets/icons/audios-subs.png'
import { capitalizeFirstLetter } from '../../../../js/String'
import pipIcon from '../../../../assets/icons/noun_minimize_2845177.png'
const pip = require('picture-in-picture')

export function ButtonsPlaying({ videoRef, playing, dispatch }) {
	// const history = useHistory()
      
	const togglePlaying = () => {
		if (playing) {
			videoRef.current.pause()
			dispatch({ type: 'setPlaying', payload: false })
			dispatch({ type: 'updateActive', payload: false })
		} else {
			videoRef.current.play()
			dispatch({ type: 'setPlaying', payload: true })
			dispatch({ type: 'updateActive', payload: true })
		}
	}

	const handleClickContent = (e) => {
		if(e.target == document.querySelector('.content-video')){
			togglePlaying()
		}
	}

	const handleClick = () => {
		// history.goBack()
		togglePlaying()
	}

	useEffect(() => {
		document.querySelector('.video').addEventListener('click', handleClickContent)
            
		return () => {
			document.querySelector('.video').removeEventListener('click', handleClickContent)
		}
	}, [playing])

	return (
		<Fragment>
			{playing
				? <Tooltip title="Pausar" placement="top-start">
					<button type="button" className="content-button-icon" onClick={handleClick}>
						<i className="fas fa-pause"></i>
					</button>
				</Tooltip>
				: <Tooltip title="Reanudar" placement="top-start">
					<button type="button" className="content-button-icon" onClick={handleClick}>
						<i className="fas fa-play"></i>
					</button>
				</Tooltip>
			}
		</Fragment>
	)
}

export function ButtonUndo({ videoRef, dispatch }) {

	const handleClick = () => {
		videoRef.current.pause()
		videoRef.current.currentTime = videoRef.current.currentTime - 10
		videoRef.current.play()
		dispatch({ type: 'setCurrentTime', payload: videoRef.current.currentTime - 10 })
	}

	return (
		<Tooltip title="Regresar 10 segundos" placement="top-start">
			<button type="button" className="content-button-icon" onClick={handleClick}>
				<i className="fas fa-undo-alt"></i>
			</button>
		</Tooltip>
	)
}

export function ButtonRedo({ videoRef, dispatch}) {

	const handleClick = () => {
		videoRef.current.pause()
		videoRef.current.currentTime = videoRef.current.currentTime + 10
		videoRef.current.play()
		dispatch({ type: 'setCurrentTime', payload: videoRef.current.currentTime + 10 })
	}

	return (
		<Tooltip title="Adelantar 10 segundos" placement="top-start">
			<button type="button" className="content-button-icon" onClick={handleClick}>
				<i className="fas fa-redo-alt"></i>
			</button>
		</Tooltip>
	)
}

export function ButtonBackward({ videoRef }) {

	const handleClick = () => {
		videoRef.current.pause()
		videoRef.current.currentTime = 0
		videoRef.current.play()
		dispatch({ type: 'setCurrentTime', payload: 0 })
	}

	return (
		<Tooltip title="Desde el comienzo" placement="top-start">
			<button type="button" className="content-button-icon" onClick={handleClick}>
				<i className="fas fa-step-backward"></i>
			</button>
		</Tooltip>
	)
}

export function ButtonsFullScreen() {
	const [fullScreen, setFullScreen] = useState(false)

	const handleClick = () => {
		toggleFullScreen()
	}

	const handleChange = () => {
		if (screenfull.isFullscreen) {
			setFullScreen(true)
		}else{
			setFullScreen(false)
		}
	}

	useEffect(() => {
		changeFullScreen()
		document.querySelector('.video').addEventListener('dblclick', handleClick)
		screenfull.on('change', handleChange)

		return () => {
			changeFullScreen()
			document.querySelector('.video').removeEventListener('dblclick', handleClick)
			screenfull.off('change', handleChange)
		}
	}, [fullScreen])

	return (
		<Tooltip title={fullScreen ? 'Salir de pantalla completa' : 'Pantalla completa'} placement="top-start">
			<button type="button" className="content-button-icon" onClick={handleClick}>
				{fullScreen
					? <i className="fas fa-compress" />
					: <i className="fas fa-expand" />
				}
			</button>
		</Tooltip>
	)
}

export function ButtonVolume({ volume, muteVolume, dispatch }) {
	const [showVolume, setShowVolume] = useState(false)

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

	const handleOver = () => {
		setShowVolume(true)
	}

	const handleBlur = () => {
		setShowVolume(false)
	}

	useEffect(() => {
		if (muteVolume) {
			document.querySelector('video').volume = 0
		} else {
			document.querySelector('video').volume = (volume / 100)
		}
	}, [volume])

	return (
		<Fragment>
			<CSSTransition in={showVolume} timeout={100} classNames="active" unmountOnExit>
				<div className="container-volume" onBlur={handleBlur} onMouseLeave={handleBlur}>
					<Slider
						orientation="vertical"
						onChange={handleChange}
						value={volume}
						aria-labelledby="vertical-slider"
					/>
				</div>
			</CSSTransition>
			<Tooltip title="Volumen" placement="top-start">
				<button type="button" className="content-button-icon" onClick={handleClick} onMouseOver={handleOver}>
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
				</button>
			</Tooltip>
		</Fragment>
	)
}

export function ButtonPIP(){
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
			<button type="button" className="content-button-icon" onClick={handleClick}>
				<img src={pipIcon} />
			</button>
		</Tooltip>
	)
}

function ItemAudio({ data, index, handleClick, audioTrackActive }) {
	const trackRef = useRef(null)
	const { id, name } = data 
	const className = data.default == true ? 'track-item' : 'track-item' 
      
	useEffect(() => {
	}, [])

	return <li ref={trackRef} key={id} className={`${className} ${audioTrackActive == id ? 'active' : ''}`} onClick={(e) => handleClick(e, index)}>{capitalizeFirstLetter(name)} <i className="fas fa-check" /></li>
}

function ItemSubtitle({ data, index, handleClick, subtitleTrackActive }) {
	const trackRef = useRef(null)
	const { id, name } = data 
	const className = data.default == true ? 'track-item' : 'track-item' 
      
	useEffect(() => {
	}, [])

	return <li ref={trackRef} key={id} className={`${className} ${subtitleTrackActive == id ? 'active' : ''}`} onClick={(e) => handleClick(e, index)}>{capitalizeFirstLetter(name)} <i className="fas fa-check" /></li>
}

function AudioTracks({ hls, audios, dispatch, audioTrackActive }) {
	const listAudiosRef = useRef(null)
	const { audioTracks } = audios

	const toogleClassActive = (elem, list) => {
		for (var i = 0; i < list.children.length; i++) {
			if (list.children[i].classList.contains('active')) {
				list.children[i].classList.remove('active')
			}
		}
		elem.classList.add('active')
	}

	const changeAudioTrack = (e, id) => {
		hls.audioTrack = id
		toogleClassActive(e.currentTarget, listAudiosRef.current)
		dispatch({ type: 'setAudioTrackActive', payload: id })
	}

	useEffect(() => {
            
	}, [audios])

	return (
		<ul className="list-tracks" ref={listAudiosRef}>
			{audioTracks.length > 0
				?     <Fragment>
					{
						audioTracks.map((data, index) => {
							return <ItemAudio key={data.id} data={data} index={index} handleClick={changeAudioTrack} audioTrackActive={audioTrackActive}/>
						})
					}
				</Fragment>
				:  <li className="track-item active">Español <i className="fas fa-check" /></li>
                        
			}
		</ul>
	)
}

function SubtitleTracks({ hls, subtitles, dispatch, subtitleTrackActive }) {
	let subtitleTracks
	const listSubtitlesRef = useRef(null)
	if(subtitles){
		subtitleTracks = subtitles.subtitleTracks
	}else{
		subtitleTracks = []
	}

	const toogleClassActive = (elem, list) => {
		for (var i = 0; i < list.children.length; i++) {
			if (list.children[i].classList.contains('active')) {
				list.children[i].classList.remove('active')
			}
		}
		elem.classList.add('active')
	}

	const changeSubtitleTrack = (e, id) => {
		hls.subtitleTrack = id
		toogleClassActive(e.currentTarget, listSubtitlesRef.current)
		dispatch({ type: 'setSubtitleTrackActive', payload: id })
	}

	useEffect(() => {
            
	}, [subtitles])


	return (
		<ul className="list-tracks" ref={listSubtitlesRef}>
			{subtitleTracks.length > 0
				?     <Fragment>
					<li className={`track-item ${subtitleTrackActive == -1 ? 'active' : ''}`} onClick={(e) => changeSubtitleTrack(e, -1)}>Desactivados <i className="fas fa-check" /></li>
					{
						subtitleTracks.map((data, index) => {
							return <ItemSubtitle key={data.id} data={data} index={index} handleClick={changeSubtitleTrack} subtitleTrackActive={subtitleTrackActive}/>
						})
					}
				</Fragment>
				: <li className="track-item active">No hay subtítulos disponibles</li>
			}
		</ul>
	)
}

export function ButtonTracks({ hls, audios, subtitles, dispatch, audioTrackActive, subtitleTrackActive }) {
	const [anchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const id = open ? 'transitions-popper' : undefined
      
	useEffect(() => {
	}, [])
      
	return (
		<Fragment>
			<PopupState variant="popover" popupId="tracks-popup-popover">
				{(popupState) => (
					<div>
						<Tooltip title="Audios / Subtítulos" placement="top-start">
							<button aria-describedby={id} type="button" className="content-button-icon" {...bindTrigger(popupState)}>
								<img alt="Icono de audios y subtítulos" src={imgTracks} />
							</button>
						</Tooltip>
						<Popover
							{...bindPopover(popupState)}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							transformOrigin={{
								vertical: 'bottom',
								horizontal: 'center',
							}}
						>
							<div className="tracks-content">
								<div className="audios-content">
									<h4 className="name-list">Audios</h4>
									<AudioTracks hls={hls} audios={audios} dispatch={dispatch} audioTrackActive={audioTrackActive} />
								</div>
								<div className="subtitles-content">
									<h4 className="name-list">Subtítulos</h4>
									<SubtitleTracks hls={hls} subtitles={subtitles} dispatch={dispatch} subtitleTrackActive={subtitleTrackActive}/>
								</div>
							</div>
						</Popover>
					</div>
				)}
			</PopupState>
		</Fragment>
	)
}