import React, { useState, useContext, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import canAutoPlay from 'can-autoplay'
import VideoContext from '../../../../context/VideoContext'
import UserContext from '../../../../context/UserContext'
import LiveTVContext from '../../../../context/LiveTvContext'
import { PipBackground } from '../../../../components/PipBackground'
import { getVideo } from '../../../../services/getVideo'
import { useHls } from '../../../../hooks/useHls'
import { isLive } from '../../../../js/Time'
import backgroundTvImg from '../../../../assets/images/logos/guiahtv/backTVnuevologo.jpg'
import { useAxios } from '../../../../hooks/useAxios'
import './styles.css'

export function Video() {
	const video = useRef()
	const [url, setUrl] = useState()
	const { channelId } = useParams()
	const { state } = useContext(LiveTVContext)
	const { dataTV } = state
	const { stateUser } = useContext(UserContext)
	const { credentials } = stateUser
	const { stateVideo, dispatch } = useContext(VideoContext)
	const { dataChannel, timerChannel, loadingChannel } = stateVideo
	const { error, setError } = useHls(video, url, dispatch)
	const { errors } = useAxios('livetv')

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

	errors && video.current.pause()

	canAutoPlay
		.video({timeout: 1500, muted: false})
		.then(({result, error}) => {
			if(result && loadingChannel){
				video.current.play()
			}
			if(result === false){
				console.warn('Error did occur: ', error)
			}
		})

	useEffect(() => {
		if(dataChannel){
			setError(false)
			const requestVideo = async () => {
				dispatch({ type: 'updateActive', payload: false })
				dispatch({ type: 'updateLoading', payload: true })
				setUrl(null)
				try {
					const response = await getVideo(dataChannel, credentials)
					if(response == 'error') throw new Error('No se pudo obtener la información.')
					const url = response.Url
					setUrl(url)
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
	}, [dataChannel])

	useEffect(() => {
		let id = undefined 
		if(dataChannel){
			id = dataChannel.Id ? dataChannel.Id : dataChannel.Registro
		}
		if(id != channelId){
			dataTV.map((categories) => {
				categories.cmData.map((channel) => {
					if(channelId == channel.Id){
						dispatch({ type: 'updateData', payload: channel })
					}
				})
			})
		}
	}, [channelId, dataTV])

	return (
		<div className="video">
			<div className="video-wrapper">
				<video loop={true} ref={video} preload="auto" onPlaying={onPlayingVideo} onWaiting={onWaitingVideo} onError={onErrorVideo} />
				{error &&
					<div className="error-message">
						<h2 className="text-error">{error}</h2>
					</div>
				}
				{stateVideo.activeTimer &&
					<div className="preview-poster">
						<img
							onError={(e) => {
								e.nativeEvent.target.src = backgroundTvImg
							}}
							src={timerChannel.PreviewPoster}/>
					</div>
				}
			</div>
			<PipBackground />
		</div>
	)
}