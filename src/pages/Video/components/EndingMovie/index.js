import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import CircularProgress from '@material-ui/core/CircularProgress'
import './styles.css'

export function EndingMovie(){
	const history = useHistory()
	const [progress, setProgress] = useState(0)
	const [time, setTime] = useState(0)
	const [show, setShow] = useState(false)

	useEffect(() => {
		const timer = setInterval(() => {
			if(progress < 100){
				setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1))
			}
		}, 50)

		if(progress === 100){
			history.goBack()
		}

		return () => {
			clearInterval(timer)
		}
	}, [progress])

	useEffect(() => {
		const timer = setInterval(() => {
			if(time < 5){
				setTime((prevProgress) => (prevProgress + 1))
			}
		}, 1000)

		return () => {
			clearInterval(timer)
		}
	}, [time])

	useEffect(() => {
		setShow(true)
	}, [])

	return (
		<CSSTransition in={show} timeout={300} classNames="fade" unmountOnExit>
			<div className="ending-movie-info-wrapper">
				<p className="text-box">Se regresará a la página anterior en: </p>
				<div className="progress-wrapper">
					<p className="time-text">{time}</p>
					<CircularProgress variant="determinate" size={50} value={progress} />
				</div>
			</div>
		</CSSTransition>
	)
}