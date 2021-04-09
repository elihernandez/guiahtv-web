import React, { useContext } from 'react'
import { LoaderSpinnerMUI } from '../../../../components/Loader/index'
import VideoContext from '../../../../context/VideoContext'
import { CSSTransition } from 'react-transition-group'

export function LoaderVideo() {
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