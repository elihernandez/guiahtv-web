import React from 'react'
import { NavLink } from 'react-router-dom'
import imgLogoBlue from '../../assets/images/logos/guiahtv/guiahtv-logo-blue.png'
import imgLogoPurple from '../../assets/images/logos/guiahtv/guiahtv-logo-purple.png'
import logoForeground from '../../assets/images/logos/guiahtv/logo_foreground.png'
import './styles.css'

export default function Logo({ color = 'blue', size = 'md' }) {

	const listImgs = {
		'blue': imgLogoBlue,
		'purple': imgLogoPurple
	}

	return (
		<NavLink to="/">
			<div className="logo-guiahtv">
				<img className={`img-logo ${size}`} src={listImgs[color] || imgLogoBlue} alt="logo-guiahtv" />
			</div>
		</NavLink>
	)
}

export function IconLogo() {
	return (
		<div className="foreground-logo">
			<img src={logoForeground} alt="foreground-logo-guiahtv" />
		</div>
	)
}