import Hls from 'hls.js'
import React, { useEffect, useContext, useRef } from 'react'
import AudioContext from '../../../../context/AudioContext'
import RadioContext from '../../../../context/RadioContext'
import UserContext from '../../../../context/UserContext'
import { getLinkRadioStation } from '../../../../services/getLinkRadioStation'
import { containsString } from '../../../../js/String'
import { useParams, useHistory } from 'react-router-dom'
import { Controls } from '../Controls'
import './styles.css'

export function Player() {
	const hls = new Hls()
	const history = useHistory()
	const audio = useRef()
	const { contentId } = useParams()
	const { stateUser } = useContext(UserContext)
	const { credentials } = stateUser
	const { stateAudio, dispatchAudio } = useContext(AudioContext)
	const { stateRadio } = useContext(RadioContext)
	const { dataRadio } = stateRadio 

	const onPlayingVideo = () => {
		dispatchAudio({ type: 'setActive', payload: true })
		dispatchAudio({ type: 'setLoading', payload: false })
		dispatchAudio({ type: 'setPlaying', payload: true })
	}

	const onWaitingVideo = () => {
		dispatchAudio({ type: 'setLoading', payload: true })
		dispatchAudio({ type: 'setPlaying', payload: false })
	}

	const onErrorVideo = () => {
		dispatchAudio({ type: 'setLoading', payload: false })
		dispatchAudio({ type: 'setData', payload: null })
		dispatchAudio({ type: 'setError', payload: 'Estación de radio no disponible por el momento' })
		dispatchAudio({ type: 'setActive', payload: false })
		dispatchAudio({ type: 'setPlaying', payload: false })
		history.replace('/radio')
	}

	const onCanPlay = () => {
		audio.current.play() 
		audio.current.muted = false
	}

	useEffect(() => {
		const requestLink = async () => {
			audio.current.pause()
			dispatchAudio({ type: 'setPlaying', payload: false })
			dispatchAudio({ type: 'setError', payload: false })
			dispatchAudio({ type: 'setAudioRef', payload: audio })
			dispatchAudio({ type: 'setActive', payload: false })
			dispatchAudio({ type: 'setLoading', payload: true })
			try {
				const response = await getLinkRadioStation(contentId, credentials)
				if (response == 'error') throw new Error('No se pudo obtener la información')
				if(containsString(response.Url, 'm3u8')){
					hls.attachMedia(audio.current)

					hls.on(Hls.Events.MEDIA_ATTACHED, function () {
						hls.loadSource(response.Url)
						hls.on(Hls.Events.MANIFEST_PARSED, function () {
							
						})
					})
				}else{
					if(containsString(response.Url, 'https')){
						audio.current.src = response.Url
					}else{
						dispatchAudio({ type: 'setLoading', payload: false })
						dispatchAudio({ type: 'setData', payload: null })
						dispatchAudio({ type: 'setError', payload: 'Reproduciendo radio en ventana externa' })
						dispatchAudio({ type: 'setPlaying', payload: false })
						history.replace('/radio')
						window.open(response.Url, '_blank')
					}
				}
			} catch (e) {
				console.log(e)
				dispatchAudio({ type: 'setLoading', payload: false })
				dispatchAudio({ type: 'setData', payload: null })
				dispatchAudio({ type: 'setError', payload: 'Estación de radio no disponible por el momento' })
				dispatchAudio({ type: 'setPlaying', payload: false })
				history.replace('/radio')
				// setError(e.message)
			}
		}

		if (contentId) {
			requestLink()
		}
	}, [contentId])

	useEffect(() => {
		if(dataRadio){
			dataRadio.map(({cmData}) => {
				cmData.map((data) => {
					if(data.Registro == contentId){
						dispatchAudio({ type: 'setData', payload: data })
					}
				})
			})
		}
	}, [dataRadio])

	return (
		<div className="player-content">
			<audio ref={audio} type="application/x-mpegURL" muted onPlaying={onPlayingVideo} onWaiting={onWaitingVideo} onError={onErrorVideo} onCanPlay={onCanPlay} />
			<Controls stateAudio={stateAudio} dispatchAudio={dispatchAudio} />
		</div>
	)
}