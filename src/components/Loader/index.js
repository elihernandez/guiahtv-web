import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { CSSTransition } from 'react-transition-group'
import './styles.css'

export function LoaderSpinner({ color }) {
	const className = `loader-spinner ${color}`

	return (
		<div className="section-content">
			<div className={className}>
				<div className="spinner" />
			</div>
		</div>
	)
}

export function LoaderLogo({ color }) {
	const imgSrc = `../src/assets/images/logos/guiahtv/guiahtv-logo-${color}.png`

	return (
		<div className="section-content">
			<div className="loader-logo">
				<img className="logo" src={imgSrc} alt="guiahtv-logo" />
			</div>
		</div>
	)
}

export function LoaderLogoSpinner({ color }) {
	const imgSrc = `../src/assets/images/logos/guiahtv/guiahtv-logo-${color}.png`
	const className = `loader-logo-spinner ${color}`

	return (
		<div className="section-content">
			<div className="loader-logo">
				<img className="logo" src={imgSrc} alt="guiahtv-logo" />
			</div>
			<div className={className}>
				<div className="spinner" />
			</div>
		</div>
	)
}

export function LoaderSpinnerMUI({ text, placementText }) {
	const [show, setShow] = useState(false)
	const classContent = placementText == ('top' || 'bottom') ? 'column' : 'row'

	useEffect(() => {
		setShow(true)
	}, [])

	return (
		<CSSTransition in={show} timeout={100} classNames="fade" unmountOnExit>
			<div className={`spinner-mui ${classContent}`}>
				<CircularProgress disableShrink />
				{text &&
					<p className="text-loading">{text}</p>
				}
			</div>
		</CSSTransition>
	)
}