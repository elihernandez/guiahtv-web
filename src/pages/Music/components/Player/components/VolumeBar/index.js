import React, { useState, useContext } from 'react'
import AudioContext from '../../../../../../context/AudioContext'
import Tooltip from '@material-ui/core/Tooltip'
import Slider from '@material-ui/core/Slider'
import './styles.css'

export function VolumeBar() {
	const [volume, setVolume] = useState(50)
	const [mute, setMute] = useState(false)
	const { stateAudio } = useContext(AudioContext)
	const { audioRef, track } = stateAudio

	const handleChange = (event, newValue) => {
		setVolume(newValue)
		audioRef.current.volume = newValue / 100
	}

	const handleClick = () => {
		if (!mute) {
			audioRef.current.volume = 0
			setMute(true)
		} else {
			audioRef.current.volume = volume / 100
			setMute(false)
		}
	}

	return (
		<div className="volume-music-content">
			<Tooltip title={mute ? 'Desactivar silenciar' : 'Silenciar'} placement="top-start">
				<button type="button" className="content-button-icon" onClick={handleClick}>
					{mute &&
						<i className="fas fa-volume-mute mute" />
					}
					{volume <= 10 && !mute &&
						<i className="fas fa-volume-off" />
					}
					{volume > 10 && volume <= 40 && !mute &&
						<i className="fas fa-volume-down" />
					}
					{volume > 40 && volume <= 70 && !mute &&
						<i className="fas fa-volume" />
					}
					{volume > 70 && !mute &&
						<i className="fas fa-volume-up" />
					}
				</button>
			</Tooltip>
			<div className="wrapper-volume-music">
				<Slider
					orientation="horizontal"
					onChange={handleChange}
					value={volume}
					aria-labelledby="vertical-slider"
					disabled={mute || track.length === 0 ? true : false}
				/>
			</div>
		</div>
	)
}