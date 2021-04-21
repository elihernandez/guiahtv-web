import React, { useRef, useState, useContext, useEffect } from 'react'
import { useParams, useRouteMatch, useHistory } from 'react-router-dom'
import AudioContext from '../../../../context/AudioContext'
import { useAxios } from '../../../../hooks/useAxios'
import { useHls } from '../../../../hooks/useHls'
import { ProgressTime } from './components/ProgressTime'
import { InfoSong } from './components/InfoSong'
import { TimeSong } from './components/TimeSong'
import { ButtonsPlayer } from './components/Buttons'
import { VolumeBar } from './components/VolumeBar'
import { Extras } from './components/Extras'
import { resetTrack, findTrack, getNextTrack, getRandomTrack } from '../../scripts'
import './styles.css'

export function Player() {
	const audioRef = useRef(null)
	const history = useHistory()
	const match = useRouteMatch()
	const { trackId } = useParams()
	const { stateAudio, dispatchAudio } = useContext(AudioContext)
	const { data, track, listTrack, repeat, repeatOne, pauseList, random, listRandomTracks } = stateAudio
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
		if(!pauseList){
			audioRef.current.play() 
			audioRef.current.muted = false
		}else{
			audioRef.current.pause() 
		}
	}

	const onPlaying = () => {
		dispatchAudio({ type: 'setPlaying', payload: true })
		if(pauseList){
			dispatchAudio({ type: 'setPauseList', payload: false })
		}
	}

	const onPause = () => {
		dispatchAudio({ type: 'setPlaying', payload: false })
	}

	const onEnded = () => {
		if(repeatOne){
			resetTrack(audioRef)
		}else if(random){
			const { url, listRandom } = getRandomTrack(listTrack, track, listRandomTracks, match)
			dispatchAudio({ type: 'setListRandomTracks', payload: listRandom })
			history.push(url)
		}else if(repeat){
			const { url, isTheLastTrack } = getNextTrack(listTrack, trackId, track, match)
			if(isTheLastTrack){
				history.push(url)
			}else{
				history.push(url)
			}
		}else if(!repeat) {
			const { url, isTheLastTrack } = getNextTrack(listTrack, trackId, track, match)
			if(isTheLastTrack){
				dispatchAudio({ type: 'setPauseList', payload: true })
				history.push(url)
			}else{
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
				onEnded={onEnded}
			/>
			<ProgressTime />
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