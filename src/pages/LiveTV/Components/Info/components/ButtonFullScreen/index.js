import React, { useEffect } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import screenfull, { changeFullScreen, toggleFullScreen } from '../../../../../../js/Screen'
import './styles.css'

export function ButtonFullScreen({ dispatch, fullScreen }) {

	const handleClick = () => {
		toggleFullScreen()
		dispatch({ type: 'setFullScreen', payload: !fullScreen })
	}

	const handleChange = () => {
		if (screenfull.isFullscreen) {
			dispatch({ type: 'setFullScreen', payload: true })
		} else {
			dispatch({ type: 'setFullScreen', payload: false })
		}
	}

	useEffect(() => {
		changeFullScreen()
		document.addEventListener('dblclick', handleClick)
		screenfull.on('change', handleChange)

		return () => {
			changeFullScreen()
			document.removeEventListener('dblclick', handleClick)
			screenfull.on('change', handleChange)
		}
	}, [])

	return (
		<Tooltip title={fullScreen ? 'Salir de pantalla completa' : 'Pantalla completa'} placement="top-start">
			<span className="full-screen-icon icon" onClick={handleClick}>
				{fullScreen
					? <i className="fas fa-compress-wide" />
					: <i className="fas fa-expand-wide" />
				}
			</span>
		</Tooltip>
	)
}