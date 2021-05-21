import React, { useContext, useState } from 'react'
import AudioContext from '../../../../../../context/AudioContext'
import MusicContext from '../../../../../../context/MusicContext'
import Tooltip from '@material-ui/core/Tooltip'
import { resetTrack, getPrevTrack, getNextTrack, getRandomTrack } from '../../../../scripts'
import './styles.css'

const RandomButton = ({ props }) => {
	const { stateAudio, dispatchAudio } = props
	const { random } = stateAudio

	const handleClick = () => {
		if(random){
			dispatchAudio({ type: 'setRandom', payload: false })
		}else{
			dispatchAudio({ type: 'setRandom', payload: true })
		}
	}

	return (
		<Tooltip title={random ? 'Desactivar reproducción aleatoria' : 'Activar reproducción aleatoria'} placement="top-start" enterDelay={1000} enterNextDelay={1000}>
			<li className="button-item" onClick={handleClick}>
				<i className={`far fa-random random ${random ? 'active' : ''}`}></i>
			</li>
		</Tooltip>
	)
}

const RepeatButton = ({ props }) => {
	const { stateAudio, dispatchAudio } = props
	const { repeat, repeatOne } = stateAudio
	const [tooltipText, setTooltipText] = useState('Activar repetición')

	const handleClick = () => {
		if(!repeat && !repeatOne){
			dispatchAudio({ type: 'setRepeat', payload: true })
			dispatchAudio({ type: 'setRepeatOne', payload: false })
			setTooltipText('Repetir una canción')
		}
		
		if(repeat && !repeatOne){
			dispatchAudio({ type: 'setRepeat', payload: false })
			dispatchAudio({ type: 'setRepeatOne', payload: true })
			setTooltipText('Desactivar repetición')
		}
		
		if(!repeat && repeatOne){
			dispatchAudio({ type: 'setRepeat', payload: false })
			dispatchAudio({ type: 'setRepeatOne', payload: false })
			setTooltipText('Activar repetición')
		}
	}

	return (
		<Tooltip title={tooltipText} placement="top-start" enterDelay={1000} enterNextDelay={1000}>
			<li className="button-item" onClick={handleClick}>
				{	!repeat && !repeatOne &&
					<i className="far fa-repeat-alt no-repeat"></i>
				}
				{	repeat && !repeatOne &&
					<i className="far fa-repeat-alt repeat"></i>
				}
				{	!repeat && repeatOne &&
					<i className="far fa-repeat-1-alt repeat-one"></i>
				}
			</li>
		</Tooltip>
	)
}

const StepBackwardButton = ({ props }) => { 
	const { stateAudio, dispatchAudio, stateMusic, dispatchMusic } = props
	const { audioRef,  repeat, repeatOne, random } = stateAudio
	const { listTracks, track, listRandomTracks } = stateMusic

	const handleChangeRepeat = () => {
		if(repeatOne){
			dispatchAudio({ type: 'setRepeat', payload: true })
			dispatchAudio({ type: 'setRepeatOne', payload: false })
		}
	}

	const handleCurrentTime = (prevTrack) => {
		if(audioRef.current.currentTime >= 2){
			resetTrack(audioRef)
		}else{
			handleChangeRepeat()
			dispatchMusic({ type: 'setTrack', payload: prevTrack })
		}
	}

	const handleClick = () => {
		if(Object.keys(track).length === 0){
			return 
		}

		const { prevTrack, isTheFirstTrack } = getPrevTrack(listTracks, track.regID, track)

		if(random){
			if(listTracks.length > 1){
				if(audioRef.current.currentTime >= 2){
					resetTrack(audioRef)
				}else{
					const { randomTrack, listRandom } = getRandomTrack(listTracks, track, listRandomTracks)
					dispatchMusic({ type: 'setListRandomTracks', payload: listRandom })
					dispatchMusic({ type: 'setTrack', payload: randomTrack })
					handleChangeRepeat()
				}
			}else{
				resetTrack(audioRef)
				if(!repeat && !repeatOne){
					dispatchAudio({ type: 'setPauseList', payload: true })
					dispatchAudio({ type: 'setPlaying', payload: false })
				}
				handleChangeRepeat()
			}
		}else{
			if(listTracks.length > 1){
				if(isTheFirstTrack){
					if(repeat || repeatOne){
						handleCurrentTime(prevTrack)
					}else{
						resetTrack(audioRef)
					}
					dispatchAudio({ type: 'setPauseList', payload: false })
				}else{
					handleCurrentTime(prevTrack)
				}
			}else{
				resetTrack(audioRef)
				if(!repeat && !repeatOne){
					dispatchAudio({ type: 'setPauseList', payload: true })
					dispatchAudio({ type: 'setPlaying', payload: false })
				}
				handleChangeRepeat()
			}
		}
	}

	return (
		<Tooltip title='Anterior' placement="top-start" enterDelay={1000} enterNextDelay={1000}>
			<li className="button-item" onClick={handleClick}>
				<i className="fas fa-step-backward"></i>
			</li>
		</Tooltip>
	)
}

const StepForwardButton = ({ props }) => {
	const { stateAudio, dispatchAudio, stateMusic, dispatchMusic } = props
	const { audioRef, repeat, repeatOne, random } = stateAudio
	const { listTracks, track, listRandomTracks, collection } = stateMusic

	const handleChangeRepeat = () => {
		if(repeatOne){
			dispatchAudio({ type: 'setRepeat', payload: true })
			dispatchAudio({ type: 'setRepeatOne', payload: false })
		}
	}

	const handleClick = () => {
		if(Object.keys(track).length === 0){
			return 
		}
		
		const { nextTrack, isTheLastTrack } = getNextTrack(listTracks, track.regID, track)
		nextTrack.id = collection.id

		if(random){
			if(listTracks.length > 1){
				const { randomTrack, listRandom } = getRandomTrack(listTracks, track, listRandomTracks)
				dispatchMusic({ type: 'setListRandomTracks', payload: listRandom })
				dispatchMusic({ type: 'setTrack', payload: randomTrack })
				handleChangeRepeat()
			}else{
				resetTrack(audioRef)
				if(!repeat && !repeatOne){
					dispatchAudio({ type: 'setPauseList', payload: true })
					dispatchAudio({ type: 'setPlaying', payload: false })
				}
				handleChangeRepeat()
			}
		}else{
			if(listTracks.length > 1){
				if(isTheLastTrack){
					if(repeat){
						handleChangeRepeat()
					}else if(repeatOne){
						handleChangeRepeat()
					}else{
						dispatchAudio({ type: 'setPauseList', payload: true })
						dispatchAudio({ type: 'setPlaying', payload: false })
						handleChangeRepeat()
					}
					dispatchMusic({ type: 'setTrack', payload: nextTrack })
				}else{
					dispatchAudio({ type: 'setPauseList', payload: false })
					dispatchMusic({ type: 'setTrack', payload: nextTrack })
					handleChangeRepeat()
				}
			}else{
				resetTrack(audioRef)
				if(!repeat && !repeatOne){
					dispatchAudio({ type: 'setPauseList', payload: true })
					dispatchAudio({ type: 'setPlaying', payload: false })
				}
				handleChangeRepeat()
			}
		}
	}

	return (
		<Tooltip title='Siguiente' placement="top-start" enterDelay={1000} enterNextDelay={1000}>
			<li className="button-item" onClick={handleClick}>
				<i className="fas fa-step-forward"></i>
			</li>
		</Tooltip>
	)
}

const PlayPauseButtons = ({ props }) => {
	const { stateAudio, dispatchAudio, stateMusic } = props
	const { audioRef, playing } = stateAudio
	const { track } = stateMusic

	const handleClick = () => {
		if(Object.keys(track).length !== 0){
			if (playing) {
				audioRef.current.pause()
				dispatchAudio({ type: 'setPlaying', payload: false })
			} else {
				audioRef.current.play()
				dispatchAudio({ type: 'setPlaying', payload: true })
			}
		}
	}

	return (
		<Tooltip title={playing ? 'Pausar' : 'Reanudar'} placement="top-start" enterDelay={1000} enterNextDelay={1000}>
			<li className="button-item active" onClick={handleClick}>
				{playing
					? <i className="fas fa-pause"></i>
					: <i className="fas fa-play"></i>
				}
			</li>
		</Tooltip>
	)
}

export function ButtonsPlayer() {
	const { stateAudio, dispatchAudio } = useContext(AudioContext)
	const { stateMusic, dispatchMusic } = useContext(MusicContext)

	const props = { 
		stateAudio: stateAudio,
		dispatchAudio: dispatchAudio,
		stateMusic: stateMusic,
		dispatchMusic: dispatchMusic,
	}

	return (
		<div className="buttons-player">
			<ul className="list-buttons">
				<RandomButton props={props} />
				<StepBackwardButton props={props} />
				<PlayPauseButtons props={props} />
				<StepForwardButton props={props} />
				<RepeatButton props={props} />
			</ul>
		</div>
	)
}