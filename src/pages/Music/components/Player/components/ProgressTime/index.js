import React, { useState, useContext, useEffect } from 'react'
import AudioContext from '../../../../../../context/AudioContext'
import Slider from '@material-ui/core/Slider'
import Tooltip from '@material-ui/core/Tooltip'
import './styles.css'

export function ProgressTime() {
	const { stateAudio } = useContext(AudioContext)
	const { audioRef, track } = stateAudio
	const [value, setValue] = useState(0)
	const [duration, setDuration] = useState(0)
	const [change, setChange] = useState(false)

	const onMouseUp = () => {
		if(change){
			setChange(false)
			audioRef.current.currentTime = value
		}
	}

	const handleChange = (event, newValue) => {
		setChange(true)
		setValue(newValue)
	}

	const updateTime = () => {
		if(!change){
			setValue(audioRef.current.currentTime)
		}
		setDuration(audioRef.current.duration)
	}

	useEffect(() => {
		document.querySelector('audio').addEventListener('timeupdate', updateTime)
		window.addEventListener('mouseup', onMouseUp)
		
		return () => {
			document.querySelector('audio').removeEventListener('timeupdate', updateTime)
			window.removeEventListener('mouseup', onMouseUp)
		}
	}, [audioRef, change, value])

	return (
		<div className="progress-time-wrapper">
			<div className="progress-content">
				<Slider
					value={value}
					onChange={handleChange}
					min={0}
					max={duration}
					aria-labelledby="continuous-slider"
					disabled={track?.length === 0 ? true : false}
				/>
			</div>
		</div>
	)
}