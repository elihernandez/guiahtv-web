import React, { useState, useEffect } from 'react'
import Slider from '@material-ui/core/Slider'
import './styles.css'

export function Volume({ data, audioRef, volume, muteVolume, dispatchAudio }) {
	const [value, setValue] = useState(volume)

	const handleChange = (event, newValue) => {
		setValue(newValue)
		audioRef.current.volume = newValue / 100
		dispatchAudio({ type: 'setMuteVolume', payload: false })
		dispatchAudio({ type: 'setVolume', payload: newValue })
	}

	const handleClick = () => {
		if (!muteVolume) {
			dispatchAudio({ type: 'setMuteVolume', payload: true })
			audioRef.current.volume = 0
		} else {
			dispatchAudio({ type: 'setMuteVolume', payload: false })
			audioRef.current.volume = (value / 100)
		}
	}

	useEffect(() => {
		if (audioRef) {
			audioRef.current.volume = volume / 100
		}
	}, [audioRef])

	useEffect(() => {
		if(audioRef){
			if(muteVolume){
				audioRef.current.volume = 0
			}else{
				audioRef.current.volume = (volume / 100)
			}
		}
	}, [volume])

	return (
		<div className="control-volume-wrapper">
			<span className="volume-icon icon" onClick={handleClick}>
				{muteVolume &&
					<i className="fas fa-volume-mute mute" />
				}
				{volume <= 10 && !muteVolume &&
					<i className="fas fa-volume-off" />
				}
				{volume > 10 && volume <= 40 && !muteVolume &&
					<i className="fas fa-volume-down" />
				}
				{volume > 40 && volume <= 70 && !muteVolume &&
					<i className="fas fa-volume" />
				}
				{volume > 70 && !muteVolume &&
					<i className="fas fa-volume-up" />
				}
			</span>
			<Slider
				orientation="horizontal"
				value={!data ? 0 : volume}
				onChange={handleChange}
				aria-labelledby="radio-player-slider"
				disabled={muteVolume || !data ? true : false}
			/>
		</div>
	)
}