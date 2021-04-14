import React, { useContext } from 'react'
import { CSSTransition } from 'react-transition-group'
import VideoContext from '../../../../context/VideoContext'
import { LoaderSpinnerMUI } from '../../../../components/Loader/index'
import './styles.css'

export function Loader() {
	const { stateVideo } = useContext(VideoContext)
	const { loadingChannel } = stateVideo

	return (
		<CSSTransition in={loadingChannel} timeout={100} classNames="active" unmountOnExit>
			<div className="loader-video">
				<LoaderSpinnerMUI/>
			</div>
		</CSSTransition>
	)
}