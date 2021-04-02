import React, { useState, useContext, useEffect, useRef } from 'react'
import VideoContext from '../../../../context/VideoContext'
import UserContext from '../../../../context/UserContext'
import { getVideo } from '../../../../services/getVideo'
import { useHls } from '../../../../hooks/useHls'
import { isLive } from '../../../../js/Time'
import canAutoPlay from 'can-autoplay'
import backgroundTvImg from '../../../../assets/images/logos/guiahtv/backTVnuevologo.jpg'
import './styles.css'

export function Video() {
	const video = useRef()
	const [url, setUrl] = useState()
	const { stateUser } = useContext(UserContext)
	const { credentials } = stateUser
	const { stateVideo, dispatch } = useContext(VideoContext)
	const { dataChannel, timerChannel, loadingChannel, activeChannel } = stateVideo
	const {error, setError} = useHls(video, url, dispatch)

	const onPlayingVideo = () => {
		dispatch({ type: 'updateActive', payload: true })
		dispatch({ type: 'updateLoading', payload: false })
	}

	const onWaitingVideo = () => {
		dispatch({ type: 'updateLoading', payload: true })
	}

	const onErrorVideo = () => {
		dispatch({ type: 'updateLoading', payload: false })
		dispatch({ type: 'updateData', payload: null })
		setError('Señal no disponible por el momento')
	}

	canAutoPlay
		.video({muted: false})
		.then(({result, error}) => {
			if(loadingChannel && activeChannel){
				setTimeout(() => {
					video.current.muted = false
					video.current.play()
				}, 2000)
			}
			if(result === false){
				console.warn('Error did occur: ', error)
			}
		})

	const handleErrorImage = (e) => {
		e.nativeEvent.target.src = 'build/assets/images/logos/guiahtv/backTVnuevologo.jpg'
	}

	useEffect(() => {
		if (dataChannel) {
			const requestVideo = async () => {
				dispatch({ type: 'updateActive', payload: false })
				dispatch({ type: 'updateLoading', payload: true })
				setUrl(null)
				try {
					const response = await getVideo(dataChannel, credentials)
					if(response == 'error') throw new Error('No se pudo obtener la información.')
					const url = response.Url
					setUrl(url)
					// setTimeoutError()
				} catch (e) {
					dispatch({ type: 'updateLoading', payload: false })
					dispatch({ type: 'updateData', payload: null })
					setError(e.message)
				}
			}

			switch (dataChannel.ContentType) {
			case 'leon_livetv_Channel':
				requestVideo()
				break
			case 'leon_livetv_Event':
				if(isLive(dataChannel.Inicio, dataChannel.Fin)){
					requestVideo()
				}else{
					setUrl(null)
					dispatch({ type: 'updateActive', payload: false })
					dispatch({ type: 'updateLoading', payload: true })
					setTimeout(() => {
						dispatch({ type: 'updateLoading', payload: false })
						dispatch({ type: 'updateTimer', active: true, timer: dataChannel })
					}, 1000)
				}
				break
			case 'leon_livetv_Radio':
				requestVideo()
				break
			default: 
				requestVideo()
				break
			}
		}

		return () => {
			// clearTimeoutError()
		}
	}, [dataChannel])

	return (
		<div className="video">
			<div className="video-wrapper">
				<video loop={true} ref={video} autoPlay muted="muted" preload="auto" onPlaying={onPlayingVideo} onWaiting={onWaitingVideo} onError={onErrorVideo} />
				{error &&
					<div className="error-message">
						<h2 className="text-error">{error}</h2>
					</div>
				}
				{stateVideo.activeTimer &&
					<div className="preview-poster">
						<img onError={handleErrorImage} src={timerChannel.PreviewPoster}/>
					</div>
				}
			</div>
		</div>
	)
}

// export function Video() {
// 	const videoRef = useRef(null)
// 	const [url, setUrl] = useState()
// 	const { stateUser } = useContext(UserContext)
// 	const { credentials } = stateUser
// 	const { stateVideo, dispatch } = useContext(VideoContext)
// 	const { dataChannel, timerChannel } = stateVideo
// 	const { PreviewPoster } = timerChannel
// 	const {success, error, audioTracks, subtitleTracks} = useHls(videoRef, url)
// 	console.log(success, error, audioTracks, subtitleTracks)

// 	const onPlayingVideo = () => {
// 		dispatch({ type: 'updateActive', payload: true })
// 		dispatch({ type: 'updateLoading', payload: false })
// 	}

// 	const onWaitingVideo = () => {
// 		dispatch({ type: 'updateLoading', payload: true })
// 	}

// 	const onErrorVideo = () => {
// 		dispatch({ type: 'updateLoading', payload: false })
// 		dispatch({ type: 'updateData', payload: null })
// 		// setError('Señal no disponible por el momento')
// 	}

// 	const onCanPlay = () => {
// 		videoRef.current.muted = false
// 		videoRef.current.play()
// 	}

// 	const handleErrorImage = (e) => {
// 		e.nativeEvent.target.src = backgroundTvImg
// 	}

// 	const requestVideo = async () => {
// 		dispatch({ type: 'updateActive', payload: false })
// 		dispatch({ type: 'updateLoading', payload: true })
// 		setUrl(null)
// 		try {
// 			const response = await getVideo(dataChannel, credentials)
// 			if(response == 'error') throw new Error('No se pudo obtener la información.')
// 			const url = response.Url
// 			setUrl(url)
// 			// setTimeoutError()
// 		} catch (e) {
// 			dispatch({ type: 'updateLoading', payload: false })
// 			dispatch({ type: 'updateData', payload: null })
// 			// setError(e.message)
// 		}
// 	}

// 	const showTimerEvent = () => {
// 		setUrl(null)
// 		dispatch({ type: 'updateActive', payload: false })
// 		dispatch({ type: 'updateLoading', payload: true })
// 		setTimeout(() => {
// 			dispatch({ type: 'updateLoading', payload: false })
// 			dispatch({ type: 'updateTimer', active: true, timer: dataChannel })
// 		}, 1000)
// 	}

// 	useEffect(() => {
// 		if (dataChannel) {
// 			switch (dataChannel.ContentType) {
// 			case 'leon_livetv_Channel':
// 				requestVideo()
// 				break
// 			case 'leon_livetv_Event':
// 				if(isLive(dataChannel.Inicio, dataChannel.Fin)){
// 					requestVideo()
// 				}else{
// 					showTimerEvent()
// 				}
// 				break
// 			case 'leon_livetv_Radio':
// 				requestVideo()
// 				break
// 			default: 
// 				requestVideo()
// 				break
// 			}
// 		}
// 	}, [dataChannel])

// 	return (
// 		<div className="video">
// 			<div className="video-wrapper">
// 				<video
// 					loop={true}
// 					ref={videoRef}
// 					autoPlay
// 					muted="muted"
// 					preload="auto"
// 					onPlaying={onPlayingVideo}
// 					onWaiting={onWaitingVideo}
// 					onError={onErrorVideo}
// 					onCanPlay={onCanPlay}
// 				/>
// 				{error &&
// 					<div className="error-message">
// 						<h2 className="text-error">{error}</h2>
// 					</div>
// 				}
// 				{stateVideo.activeTimer &&
// 					<div className="preview-poster">
// 						<img onError={handleErrorImage} src={PreviewPoster}/>
// 					</div>
// 				}
// 			</div>
// 		</div>
// 	)
// }