import React, { useState, useContext, useEffect } from 'react'
import AudioContext from '../../../../../../context/AudioContext'
import Slider from '@material-ui/core/Slider'
import Tooltip from '@material-ui/core/Tooltip'
import './styles.css'

export function ProgressTime() {
	const { stateAudio } = useContext(AudioContext)
	const { audioRef, track} = stateAudio
	const [value, setValue] = useState(0)
	const [duration, setDuration] = useState(0)

	const handleChange = (event, newValue) => {
		audioRef.current.currentTime = newValue
		setValue(newValue)
	}

	const updateTime = () => {
		setValue(audioRef.current.currentTime)
		setDuration(audioRef.current.duration)
	}

	useEffect(() => {
		document.querySelector('audio').addEventListener('timeupdate', updateTime)
		
		return () => {
			document.querySelector('audio').removeEventListener('timeupdate', updateTime)
		}
	}, [audioRef])

	return (
		<div className="progress-content">
			{	track &&
				<Slider value={value} onChange={handleChange} min={0} max={duration} aria-labelledby="continuous-slider" />
			}
		</div>
	)
}