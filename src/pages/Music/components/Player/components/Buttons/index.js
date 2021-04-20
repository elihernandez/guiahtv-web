import React, { useContext, useState } from 'react'
import AudioContext from '../../../../../../context/AudioContext'
import Tooltip from '@material-ui/core/Tooltip'
import './styles.css'

const RandomReproductionButton = ({ state, dispatch }) => {
	const { random } = state

	const handleClick = () => {
		if(random){
			dispatch({ type: 'setRandom', payload: false })
		}else{
			dispatch({ type: 'setRandom', payload: true })
		}
	}

	return (
		<Tooltip title={random ? 'Desactivar reproducción aleatoria' : 'Activar reproducción aleatoria'} placement="top-start">
			<li className="button-item" onClick={handleClick}>
				<i className={`far fa-random random ${random ? 'active' : ''}`}></i>
			</li>
		</Tooltip>
	)
}

const RepeatButton = ({ state, dispatch }) => {
	const { repeat, repeatOne } = state
	const [tooltipText, setTooltipText] = useState('Activar repetición')

	const handleClick = () => {
		if(!repeat && !repeatOne){
			dispatch({ type: 'setRepeat', payload: true })
			dispatch({ type: 'setRepeatOne', payload: false })
			setTooltipText('Repetir una canción')
		}
		
		if(repeat && !repeatOne){
			dispatch({ type: 'setRepeat', payload: false })
			dispatch({ type: 'setRepeatOne', payload: true })
			setTooltipText('Desactivar repetición')
		}
		
		if(!repeat && repeatOne){
			dispatch({ type: 'setRepeat', payload: false })
			dispatch({ type: 'setRepeatOne', payload: false })
			setTooltipText('Activar repetición')
		}
	}

	return (
		<Tooltip title={tooltipText} placement="top-start">
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

export function ButtonsPlayer() {
	const { stateAudio, dispatchAudio } = useContext(AudioContext)
	const { audioRef, playing } = stateAudio

	const handleClick = () => {
		if (playing) {
			audioRef.current.pause()
			dispatchAudio({ type: 'setPlaying', payload: false })
		} else {
			audioRef.current.play()
			dispatchAudio({ type: 'setPlaying', payload: true })
		}
	}

	const handleBackward = () => {
		audioRef.current.currentTime = 0
	}

	return (
		<div className="buttons-player">
			<ul className="list-buttons">
				<RandomReproductionButton state={stateAudio} dispatch={dispatchAudio} />
				<Tooltip title='Anterior' placement="top-start">
					<li className="button-item" onClick={handleBackward}>
						<i className="fas fa-step-backward"></i>
					</li>
				</Tooltip>
				<Tooltip title={playing ? 'Pausar' : 'Reanudar'} placement="top-start">
					<li className="button-item active" onClick={handleClick}>
						{playing
							? <i className="fas fa-pause"></i>
							: <i className="fas fa-play"></i>
						}

					</li>
				</Tooltip>
				<li className="button-item">
					<i className="fas fa-step-forward"></i>
				</li>
				<RepeatButton state={stateAudio} dispatch={dispatchAudio} />
			</ul>
		</div>
	)
}