import React, { useRef, useState, useContext, useEffect } from 'react'
import { useParams, useRouteMatch, useHistory } from 'react-router-dom'
import { useAxios } from '../../../../hooks/useAxios'
import { useHls } from '../../../../hooks/useHls'
import AudioContext from '../../../../context/AudioContext'
import { ProgressTime } from './components/ProgressTime'
import { InfoSong } from './components/InfoSong'
import { TimeSong } from './components/TimeSong'
import { ButtonsPlayer } from './components/Buttons'
import { VolumeBar } from './components/VolumeBar'
import { Extras } from './components/Extras'
import { replaceString } from '../../../../js/String'
import './styles.css'

function findTrack(data, trackId){
	let dataTrack
	let listTrack
	
	data.map((category) => {
		category.tracks.map((track) => {
			if((track.regID == trackId) && !listTrack){
				dataTrack = track
				listTrack = category
			}
		})
	})
	return { dataTrack, listTrack }
}

function isLastTrack(data, indexTrack){
	const length = data.tracks.length - 1

	if(indexTrack == length){
		return true
	}

	return false
}

function findIndexTrack(data, trackId){
	let indexTrack
	data.tracks.map((track, index) => {
		if(track.regID == trackId){
			indexTrack = index
		}
	})

	return indexTrack
}

function findNextTrack(data, trackId){
	let nextTrack
	isLastTrack(data, trackId)
	data.tracks.map((track, index) => {
		if(track.regID == trackId){
			if(isLastTrack(data, index)){
				nextTrack = data.tracks[0]
			}else{
				nextTrack = data.tracks[index + 1]
			}
		}
	})

	return nextTrack
}

export function Player() {
	const audioRef = useRef(null)
	const history = useHistory()
	const match = useRouteMatch()
	const { trackId } = useParams()
	const { stateAudio, dispatchAudio } = useContext(AudioContext)
	const { data, track, listTrack, repeat, repeatOne, random } = stateAudio
	const [params, setParams] = useState({})
	const [sendRequest, setSendRequest] = useState(false)
	const [url, setUrl] = useState()
	const { data: response } = useAxios('track-link', sendRequest, params)
	useHls(audioRef, url)

	useEffect(() => {
		dispatchAudio({ type: 'setAudioRef', payload: audioRef })
	}, [audioRef])

	useEffect(() => {
		const { dataTrack, listTrack } = findTrack(data, trackId)
		dispatchAudio({ type: 'setTrack', payload: dataTrack })
		dispatchAudio({ type: 'setListTrack', payload: listTrack })
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

	const onEnded = () => {
		if(repeatOne){
			audioRef.current.currentTime = 0
		}else if(random){

			console.log('Modo aleatorio')
		}else if(repeat){
			const nextTrack = findNextTrack(listTrack, trackId)
			const url = replaceString(match.url, `${track.regID}`, nextTrack.regID)
			history.push(url)
		}else if(!repeat) {
			const indexTrack = findIndexTrack(listTrack, trackId)
			if(!isLastTrack(listTrack, indexTrack)){
				const nextTrack = findNextTrack(listTrack, trackId)
				const url = replaceString(match.url, `${track.regID}`, nextTrack.regID)
				history.push(url)
			}
		}
	}

	return (
		<div className="player-wrapper">
			<audio
				muted
				type="application/x-mpegURL"
				ref={audioRef}
				onCanPlay={onCanPlay}
				onPlaying={onPlaying}
				onPause={onPause}
				onEnded={onEnded} />
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