import React, { useRef, useContext, useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import VideoContext from '../../../../context/VideoContext'
import { timerEvent, isLive } from '../../../../js/Time'
import './styles.css'

export function Timer() {
	const intervalTimer = useRef(null)
	const { stateVideo, dispatch } = useContext(VideoContext)
	const { timerChannel, activeTimer } = stateVideo
	const [time, setTime] = useState('')

	useEffect(() => {
		if (activeTimer){
			intervalTimer.current = setInterval(() => {
				if(isLive(timerChannel.Inicio, timerChannel.Fin)){
					dispatch({ type: 'updateData', payload: timerChannel })
				}else{
					setTime(timerEvent(timerChannel.Inicio, timerChannel.Fin))
				}
			}, 1000)
		}

		return () => {
			clearInterval(intervalTimer.current)
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