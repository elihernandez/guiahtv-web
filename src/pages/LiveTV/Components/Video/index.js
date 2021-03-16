import React, { useState, useContext, useEffect, useRef } from 'react'
import VideoContext from '../../../../context/VideoContext'
import UserContext from '../../../../context/UserContext'
import { getVideo } from '../../../../services/getVideo'
import { useHls } from '../../../../hooks/useHls'
import { isLive } from '../../../../js/Time'
import './styles.css'

export function Video() {
	const video = useRef()
	const [url, setUrl] = useState()
	const { stateUser } = useContext(UserContext)
	const { credentials } = stateUser
	const { stateVideo, dispatch } = useContext(VideoContext)
	const { dataChannel, timerChannel } = stateVideo
	// let { timeoutErrorRef } = stateVideo
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
		// clearTimeoutError(timeoutErrorRef)
	}

	const onCanPlay = () => {
		video.current.muted = false
		video.current.play()
	}

	const handleErrorImage = (e) => {
		e.nativeEvent.target.src = 'build/assets/images/logos/guiahtv/backTVnuevologo.jpg'
	}

	// const setTimeoutError = () =>{
	// 	timeoutErrorRef = setTimeout(() => {
	// 		console.log('Error timeout')
	// 	}, 5000)
	// }

	// const clearTimeoutError = () => {
	// 	console.log(timeoutErrorRef)
	// 	clearTimeout(timeoutErrorRef)
	// }

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

	// useEffect(() => {
	// 	console.log("effect error")
	// 	if(error !== false){
	// 		onErrorVideo()
	// 	}
	// }, [error])

	return (
		<div className="video">
			<div className="video-wrapper">
				<video loop={true} ref={video} autoPlay muted="muted" preload="auto" onPlaying={onPlayingVideo} onWaiting={onWaitingVideo} onError={onErrorVideo} onCanPlay={onCanPlay} />
				{     error &&
                              <div className="error-message">
                              	<h2 className="text-error">{error}</h2>
                              </div>
				}
				{     stateVideo.activeTimer &&
                              <div className="preview-poster">
                              	<img onError={handleErrorImage} src={timerChannel.PreviewPoster}/>
                              </div>
				}
			</div>
		</div>
	)
}