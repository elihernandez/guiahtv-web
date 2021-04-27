import React, { useRef, useState, useEffect } from 'react'
import { Button } from '../../../../components/Button/index'
import { NavLink } from 'react-router-dom'
import './styles.css'

export function Header() {
	const headerRef = useRef(null)
	const [scroll, setScroll] = useState(0)

	useEffect(() => {
		window.onscroll = function () {
			if (window.scrollY > 25 && scroll == false) {
				setScroll(true)
			} else {
				setScroll(false)
			}
		}
	}, [])

	return (
		<header id="header" className={`header-home ${scroll ? 'bgcolor' : ''}`} ref={headerRef}>
			<NavLink to="/login" className="link-to-page-login" data-uia="link-to-page-login-label">
				<Button type="button" uppercase={true} color="transparent" classes="btn-login body-3">Iniciar sesión</Button>
			</NavLink>
		</header>
	)
}
