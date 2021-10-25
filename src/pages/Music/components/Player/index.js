import React, { useRef, useState, useContext, useEffect } from 'react'
import { useParams, useRouteMatch, useHistory } from 'react-router-dom'
import AudioContext from '../../../../context/AudioContext'
import MusicContext from '../../../../context/MusicContext'
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
	const [url, setUrl] = useState('')
	const [params, setParams] = useState({})
	const [sendRequest, setSendRequest] = useState(false)
	const { collectionID, trackId } = useParams()
	const { stateAudio, dispatchAudio } = useContext(AudioContext)
	const { repeat, repeatOne, pauseList, random } = stateAudio
	const { stateMusic, dispatchMusic } = useContext(MusicContext)
	const { data, track, listTracks, listRandomTracks } = stateMusic
	const { data: response } = useAxios('track-link', sendRequest, params)
	const { error } = useHls(audioRef, url)

	useEffect(() => {
		dispatchAudio({ type: 'setAudioRef', payload: audioRef })
	}, [audioRef])

	useEffect(() => {
		if(trackId && collectionID){
			const { dataTrack, listTrack } = findTrack(data, collectionID, trackId)
			if(dataTrack && listTrack){
				dispatchAudio({ type: 'setTrack', payload: dataTrack })
				dispatchAudio({ type: 'setListTrack', payload: listTrack })
			}
		}
	}, [trackId, collectionID, data])

	useEffect(() => {
		if(track?.regID){
			// history.push(`${route}`, { trackID: track.regID })
			setParams({trackId: track.regID})
			setSendRequest(true)
		}
	}, [track])

	useEffect(() => {
		if(response?.url){
			setSendRequest(false)
			setUrl(response.url)
		}
	}, [response])

	useEffect(() => {
		if(error){
			dispatchAudio({ type: 'setError', payload: 'No se puede reproducir este contenido' })
		}else{
			dispatchAudio({ type: 'setError', payload: false })
		}
	}, [error])

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
			const { randomTrack, listRandom } = getRandomTrack(listTracks, track, listRandomTracks)
			dispatchMusic({ type: 'setListRandomTracks', payload: listRandom })
			dispatchMusic({ type: 'setTrack', payload: randomTrack })
		}else if(repeat){
			const { nextTrack } = getNextTrack(listTracks, track.regID, track)
			dispatchMusic({ type: 'setTrack', payload: nextTrack })
		}else if(!repeat) {
			const { nextTrack, isTheLastTrack } = getNextTrack(listTracks, track.regID, track)
			dispatchMusic({ type: 'setTrack', payload: nextTrack })
			if(isTheLastTrack){
				dispatchAudio({ type: 'setPauseList', payload: true })
				dispatchAudio({ type: 'setPlaying', payload: false })
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
						{/* <Extras /> */}
					</div>
				</div>
			</div>
		</div>
	)
}