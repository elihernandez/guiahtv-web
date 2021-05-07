import React, { useContext, useState, useEffect } from 'react'
import AudioContext from '../../../../../../context/AudioContext'
import MusicContext from '../../../../../../context/MusicContext'
import { secondsToString } from '../../../../../../js/Time'
import './styles.css'

export function TimeSong() {
	const { stateAudio } = useContext(AudioContext)
	const { audioRef } = stateAudio
	const { stateMusic } = useContext(MusicContext)
	const { track } = stateMusic
	const [currentTime, setCurrentTime] = useState(null)
	const [duration, setDuration] = useState(0)

	const updateDuration = () => {
		const durationInSeconds = secondsToString(audioRef.current.duration)
		setDuration(durationInSeconds)
	}

	const updateTime = () => {
		const time = secondsToString(audioRef.current.currentTime)
		setCurrentTime(time)
	}

	useEffect(() => {
		document.querySelector('audio').addEventListener('durationchange', updateDuration)
		document.querySelector('audio').addEventListener('timeupdate', updateTime)
		
		return () => {
			document.querySelector('audio').removeEventListener('durationchange', updateDuration)
			document.querySelector('audio').removeEventListener('timeupdate', updateTime)
		}
	}, [audioRef])

	if(!track){
		return null
	}

	return (
		<div className="current-music-time">
			<h3>{currentTime ? currentTime : ''}</h3>
			<p>{currentTime ? '-' : ''}</p>
			<h3>{currentTime ? duration : ''}</h3>
		</div>
	)
}

