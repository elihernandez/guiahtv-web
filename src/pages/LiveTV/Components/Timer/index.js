import React, { useContext, useState, useEffect } from 'react'
import VideoContext from '../../../../context/VideoContext'
import { CSSTransition } from 'react-transition-group'
import { timerEvent, isLive } from '../../../../js/Time'
import './styles.css'

export function Timer() {
	let interval
	const { stateVideo, dispatch } = useContext(VideoContext)
	const { timerChannel, activeTimer } = stateVideo
	const [time, setTime] = useState('')

	useEffect(() => {
		if (activeTimer){
			interval = setInterval(() => {
				if(isLive(timerChannel.Inicio, timerChannel.Fin)){
					dispatch({ type: 'updateData', payload: timerChannel })
				}else{
					setTime(timerEvent(timerChannel.Inicio, timerChannel.Fin))
				}
			}, 1000)
		}

		return () => {
			clearInterval(interval)
		}
	}, [activeTimer])

	return (
		<CSSTransition in={activeTimer} timeout={100} classNames="active" unmountOnExit>
			<div className="info-timer">
				{   timerChannel &&
					<div className="info-timer-wrapper">
						<h3 className="text-info">Este evento comienza en:</h3>
						<h2 className="current-timer">{time}</h2>
					</div>
				}
			</div>
		</CSSTransition>
	)
}