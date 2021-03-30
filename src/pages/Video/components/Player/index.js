import React, { useEffect, useState, useContext, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { LoaderSpinnerMUI } from '../../../../components/Loader'
import UserContext from '../../../../context/UserContext'
import VideoContext from '../../../../context/VideoContext'
import { getLinkVideoVod } from '../../../../services/getLinkVideoVod'
import { setResumePosVideo } from '../../../../services/setResumePosVideo'
import { useHls } from '../../../../hooks/useHls'
import { Content } from '../Content'
import { EndingMovie } from '../EndingMovie'
import { isSuscribed } from '../../../../js/Auth'
import { setProgressMovie } from '../../../../js/Time'
import './styles.css'

export function Player({ state, dispatchVod }) {
	const history = useHistory()
	const video = useRef()
	const { dataVod, movieVod } = state
	const [url, setUrl] = useState()
	const { stateUser } = useContext(UserContext)
	const { credentials } = stateUser
	const { stateVideo, dispatch } = useContext(VideoContext)
	const { loading, currentTime, duration, endingMovie } = stateVideo
	const { error, setError } = useHls(video, url, dispatch, movieVod)

	const onPlayingVideo = () => {
		dispatch({ type: 'updateData', payload: movieVod })
		dispatch({ type: 'updateActive', payload: true })
		dispatch({ type: 'updateLoading', payload: false })
		dispatch({ type: 'setPlaying', payload: true })
	}

	const onWaitingVideo = () => {
		dispatch({ type: 'updateLoading', payload: true })
	}

	const onErrorVideo = (e) => {
		console.log(e.nativeEvent.code)
		dispatch({ type: 'updateLoading', payload: false })
		// dispatch({ type: 'updateData', payload: null })
		setError('Contenido no disponible por el momento')
	}

	const onCanPlay = () => {
		video.current.muted = false
		video.current.play()
	}

	useEffect(() => {
		const requestLink = async () => {
			dispatch({ type: 'updateVideoRef', payload: video })
			dispatch({ type: 'updateActive', payload: false })
			dispatch({ type: 'updateLoading', payload: true })
			try {
				const response = await getLinkVideoVod(movieVod, credentials)
				if (response == 'error') throw new Error('No se pudo obtener la información.')
				const url = response.Url
				setUrl(url)
			} catch (e) {
				dispatch({ type: 'updateLoading', payload: false })
				dispatch({ type: 'updateData', payload: null })
				setError(e.message)
			}
		}

		requestLink()

            
	}, [])

	useEffect(() => {
		const requestPositionVideo = async () => {
			let positionVideoMil = 0
      
			if (currentTime) {
				if ((currentTime >= duration) || (currentTime > (duration - 10))) {
					positionVideoMil = 0
					setProgressMovie(0, movieVod, dataVod, dispatchVod)
				} else {
					positionVideoMil = Math.round(currentTime * 1000)
					setProgressMovie(currentTime, movieVod, dataVod, dispatchVod)
				}
			}
      
			try {
				const response = await setResumePosVideo(movieVod.Registro, positionVideoMil, credentials)
				if(response == 'error') throw new Error('No se pudo guardar posición de video')
			} catch (e) {
				// console.log(e.message)
			}
		}

		return () => {
			if(history.action == 'POP'){
				if(isSuscribed(credentials)){
					requestPositionVideo()
				}
			}
		}
	}, [currentTime])


	return (
		<div className="player">
			<div className="player-wrapper">
				<video loop={false} ref={video} preload="auto" muted="muted" onPlaying={onPlayingVideo} onWaiting={onWaitingVideo} onError={onErrorVideo} onCanPlay={onCanPlay} />
				{loading &&
                    <LoaderSpinnerMUI />
				}
				{error &&
					<div className="error-message">
						<h2 className="text-error">{error}</h2>
					</div>
				}
				<Content />
				{endingMovie &&
					<EndingMovie/>
				}
			</div>
		</div>
	)
}