import React, { useState, useRef, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import VodContext from '../../../../context/VodContext'
import VideoContext from '../../../../context/VideoContext'
import UserContext from '../../../../context/UserContext'
import { setResumePosVideo } from '../../../../services/setResumePosVideo'
import { isEpisode } from '../../../../js/String' 
import CircularProgress from '@material-ui/core/CircularProgress'
import './styles.css'

function findNextEpisode(actualMovie, seasonMovie){
	let nextEpisode
	const length = seasonMovie.length - 1
	const index = seasonMovie.findIndex((element) => element.Registro === actualMovie.Registro)

	if(index !== length){
		nextEpisode = seasonMovie[index + 1]
	}else{
		nextEpisode = null
	}

	return nextEpisode
}

export function EndingMovie(){
	const history = useHistory()
	const timeIntervalRef = useRef(null)
	const progressIntervalRef = useRef(null)
	const {stateUser} = useContext(UserContext)
	const {credentials} = stateUser
	const {stateVod, dispatchVod} = useContext(VodContext)
	const {stateVideo, dispatch} = useContext(VideoContext)
	const {currentTime, endingMovie, videoRef} = stateVideo
	const {movieVod, seasonVod} = stateVod
	const [progress, setProgress] = useState(5)
	const [time, setTime] = useState(5)
	const [show, setShow] = useState(false)
	const [nextEpisode, setNextEpisode] = useState(null)

	const onClick =() => {
		videoRef.current.pause()
		setTimeout(() => {
			dispatch({ type: 'setEndingMovie', payload: false })
			const positionVideoMil = Math.round(currentTime * 1000)
			setResumePosVideo(movieVod.Registro, positionVideoMil, credentials)
			if(nextEpisode){
				dispatchVod({ type: 'setMovie', payload: nextEpisode })
			}else{
				history.goBack()
			}
			setShow(false)
		}, 1000)
	}

	const timeInterval = () => {
		timeIntervalRef.current = setTimeout(() => {
			if(time > 0){
				setTime((prevTime) => (prevTime - 1))
			}
		}, 1000)
	}

	const progressInterval = () => {
		progressIntervalRef.current = setTimeout(() => {
			
			if(progress < 100){
				setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1))
			}
		}, 50)
	}

	useEffect(() => {
		if(endingMovie === true){
			progressInterval()

			if(progress === 100){
				onClick()
			}
		}

		return () => {
			clearTimeout(progressIntervalRef.current)
		}
	}, [progress])

	useEffect(() => {
		if(endingMovie === true){
			timeInterval()
		}

		return () => {
			clearTimeout(timeIntervalRef.current)
		}
	}, [time])

	useEffect(() => {
		if(endingMovie === true){
			if(isEpisode(movieVod.ContentType)){
				setNextEpisode(findNextEpisode(movieVod, seasonVod.cmData))
			}
			setShow(true)
		}
	}, [endingMovie])

	return (
		<CSSTransition in={show} timeout={300} classNames="fade" unmountOnExit>
			<div className="ending-movie-info-wrapper" onClick={onClick}>
				{nextEpisode &&
					<div className="background-next-episode">
						<img src={nextEpisode.HDPosterUrlLandscape} alt="Imagen del siguiente episodio" />
					</div>
				}
				<div className="info-next-episode">
					{nextEpisode
						?	<p className="text-box"><span>Siguiente capítulo:</span>{nextEpisode.Title}</p>
						:	<p className="text-box">Se regresará a la página anterior en: </p>
					}
				</div>
				<div className="progress-wrapper">
					<p className="time-text">{time}</p>
					<CircularProgress variant="determinate" size={50} value={progress} />
				</div>
			</div>
		</CSSTransition>
	)
}