import React, { useEffect, useState, useCallback } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Slider from '@material-ui/core/Slider'
import './styles.css'

export function ButtonVolume({ volume, muteVolume, dispatch }) {
	const [value, setValue] = useState(volume)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const handleClick = () => {
		if (!muteVolume) {
			dispatch({ type: 'muteVolume', payload: true })
			document.querySelector('video').muted = true
		} else {
			dispatch({ type: 'muteVolume', payload: false })
			document.querySelector('video').muted = false
		}
	}

	const updateDispatchVolume = useCallback(() => {
		setTimeout(() => {
			dispatch({ type: 'updateVolume', payload: value })
		}, 1500)
	}, [value])

	useEffect(() => {
		document.querySelector('video').volume = value / 100
		clearTimeout(updateDispatchVolume)
		updateDispatchVolume()
	}, [value])

	return (
		<div className="container-volume">
			<Tooltip 
				title={<Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />}
				placement="left"
				id="tyh-ugk"
				interactive
			>
				<span className="volume-icon icon" onClick={handleClick}>
					{muteVolume &&
                        <i className="fas fa-volume-mute" />
					}
					{value <= 10 && !muteVolume &&
                        <i className="fas fa-volume-off" />
					}
					{value > 10 && value <= 40 && !muteVolume &&
                        <i className="fas fa-volume-down" />
					}
					{value > 40 && value <= 70 && !muteVolume &&
                        <i className="fas fa-volume" />
					}
					{value > 70 && !muteVolume &&
                        <i className="fas fa-volume-up" />
					}
				</span>
			</Tooltip>
		</div>
	)
}