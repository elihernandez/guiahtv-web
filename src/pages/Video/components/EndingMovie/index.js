import React, { useState, useRef, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import VodContext from '../../../../context/VodContext'
import VideoContext from '../../../../context/VideoContext'
import UserContext from '../../../../context/UserContext'
import { setResumePosVideo } from '../../../../services/setResumePosVideo'
import { isEpisode } from '../../../../js/String' 
import { getSeasons } from '../../../../services/getSeasons'
import CircularProgress from '@material-ui/core/CircularProgress'
import './styles.css'

function lengthSeason(season){
	return season.length - 1
}

function isLastEpisodeOfSeason(movie, season){
	const length = lengthSeason(season)
	const index = season.findIndex((element) => element.Registro === movie.Registro)

	if(index !== length){
		return false
	}

	return true
}

function findNextEpisode(movie, season){
	let nextEpisode = null
	const index = season.findIndex((element) => element.Registro === movie.Registro)

	if(!isLastEpisodeOfSeason(movie, season)){
		nextEpisode = season[index + 1]
	}

	return nextEpisode
}

function isLastSeasonOfSerie(season, seasons){
	const length = lengthSeason(seasons)
	const index = seasons.findIndex((element) => element.Title === season.category)

	if(index !== length){
		return false
	}

	return true
}

function findNextSeason(movie, season, seasons){
	let nextSeason = null
	// console.log(seasons)
	// console.log(season)
	const index = seasons.findIndex((element) => element.Title === season.category)

	if(!isLastSeasonOfSerie(season, seasons)){
		nextSeason = seasons[index + 1]
	}
	// console.log(nextSeason)

	return nextSeason
}

function getPositionVideoMil(currentTime){
	return Math.round(currentTime * 1000)
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
	const {movieVod, seasonVod, serieVod} = stateVod
	const [progress, setProgress] = useState(5)
	const [time, setTime] = useState(5)
	const [show, setShow] = useState(false)
	const [nextEpisode, setNextEpisode] = useState(null)
	const [nextSeason, setNextSeason] = useState(null)

	const validateData = async () => {
		try{
			if(isEpisode(movieVod.ContentType)){
				if(!isLastEpisodeOfSeason(movieVod, seasonVod.cmData)){
					setNextEpisode(findNextEpisode(movieVod, seasonVod.cmData))
				}
				// else{
				// 	const seasons = await getSeasons(movieVod.ContentTypeOrder)
				// 	console.log(seasons)
				// 	setNextSeason(findNextSeason(movieVod, seasonVod, seasons))
				// }
			}
			setShow(true)
		}catch(e){
			return null
		}
	}

	const handleEndingMovie = () => {
		videoRef.current.pause()
		if(show){

			setTimeout(() => {
				dispatch({ type: 'setEndingMovie', payload: false })
				const positionVideoMil = getPositionVideoMil(currentTime)
				setResumePosVideo(movieVod.Registro, positionVideoMil, credentials)
				if(nextEpisode){
					dispatchVod({ type: 'setMovie', payload: nextEpisode })
				}else{
					history.goBack()
				}
				setShow(false)
			}, 1500)
		}
	}

	const handleClick =() => {
		handleEndingMovie()
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
			validateData()
		}
	}, [endingMovie])

	useEffect(() => {
		if(endingMovie === true){
			progressInterval()

			if(progress === 100){
				handleEndingMovie()
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

	return (
		<CSSTransition in={show} timeout={300} classNames="fade" unmountOnExit>
			<div className="ending-movie-info-wrapper" onClick={handleClick}>
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