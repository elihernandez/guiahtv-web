import React, { useRef, useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAxios } from '../../../../hooks/useAxios'
import { useHls } from '../../../../hooks/useHls'
import AudioContext from '../../../../context/AudioContext'
import { ProgressTime } from './components/ProgressTime'
import { InfoSong } from './components/InfoSong'
import { TimeSong } from './components/TimeSong'
import { ButtonsPlayer } from './components/Buttons'
import { VolumeBar } from './components/VolumeBar'
import { Extras } from './components/Extras'
import './styles.css'

function findTrack(data, trackId){
	let dataTrack
	
	data.map((category) => {
		category.tracks.map((track) => {
			if(track.regID == trackId){
				dataTrack = track
			}
		})
	})
	return dataTrack
}

export function Player() {
	const audioRef = useRef(null)
	const { trackId } = useParams()
	const { stateAudio, dispatchAudio } = useContext(AudioContext)
	const { data, track } = stateAudio
	const [params, setParams] = useState({})
	const [url, setUrl] = useState()
	const [sendRequest, setSendRequest] = useState(false)
	const { data: response } = useAxios('track-link', sendRequest, params)
	useHls(audioRef, url)

	useEffect(() => {
		const dataTrack = findTrack(data, trackId)
		dispatchAudio({ type: 'setTrack', payload: dataTrack })
		dispatchAudio({ type: 'setAudioRef', payload: audioRef })
	}, [trackId, data])

	useEffect(() => {
		if(track && track.regID){
			setParams({trackId: track.regID})
			setSendRequest(true)
		}
	}, [track])

	useEffect(() => {
		if(response.url){
			setSendRequest(false)
			setUrl(response.url)
		}
	}, [response])

	const onCanPlay = () => {
		audioRef.current.play() 
		audioRef.current.muted = false
	}

	const onPlaying = () => {
		dispatchAudio({ type: 'setPlaying', payload: true })
	}

	const onPause = () => {
		dispatchAudio({ type: 'setPlaying', payload: false })
	}

	return (
		<div className="player-wrapper">
			<audio
				muted
				type="application/x-mpegURL"
				ref={audioRef}
				onCanPlay={onCanPlay}
				onPlaying={onPlaying}
				onPause={onPause} />
			<div className="progress-time-wrapper">
				<ProgressTime />
			</div>
			<div className="player-content-wrapper">
				<div className="player-content">
					<div className="group-controls info">
						<InfoSong />
						<TimeSong />
					</div>
					<div className="group-controls controls">
						<ButtonsPlayer />
					</div>
					<div className="group-controls buttons">
						<VolumeBar />
						<Extras />
					</div>
				</div>
			</div>
		
		</div>
	)
}