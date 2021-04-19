import React, { useContext } from 'react'
import AudioContext from '../../../../../../context/AudioContext'
import Tooltip from '@material-ui/core/Tooltip'

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
				<li className="button-item">
					<i className="fas fa-redo"></i>
				</li>
				<Tooltip title='Anterior' placement="top-start">
					<li className="button-item" onClick={handleBackward}>
						<i className="fas fa-backward"></i>
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
					<i className="fas fa-forward"></i>
				</li>
				<li className="button-item">
					<i className="fas fa-random"></i>
				</li>
			</ul>
		</div>
	)
}