import React, { useState, useEffect, useRef } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { Navbar } from '../Navbar/index'
import { UserMenu } from '../UserMenu/index'
import Logo from '../Logo/index'
// import { containsString } from '../../js/String'	
import './styles.css'

function LeftContent({showNavbar	}) {
	let location = useLocation()
	const { pathname } = location
	const classItems = 'navbar-link-top-menu'
	const classNavbar = 'navbar-top-menu'
	
	const navLinks = [
		{ title: 'En vivo', href: pathname.includes('tv') ? location : '/tv', icon: <i className="fas fa-tv"></i> },
		{ title: 'A la carta', href: '/alacarta', icon: <i className="fas fa-popcorn"></i> },
		{ title: 'Radio', href: '/radio', icon: <i className="fas fa-radio"></i> },
		{ title: 'Musica', href: pathname.includes('musica') ? location : '/musica/inicio', icon: <i className="fas fa-headphones"></i> },
		{ title: 'Zona kids', href: '/zonakids', icon: <i className="fas fa-child"></i> },
		// { title: 'PPV', href: pathname.includes('tv') ? location : '/tv', icon: <i className="fas fa-play-circle"></i> }
	]

	return (
		<div className="left-content">
			<Logo color="blue" size="sm" />
			<Navbar navLinks={navLinks} classNavbar={classNavbar} classItems={classItems} show={showNavbar} />
		</div>
	)
}

function RightContent() {
	return (
		<div className="right-content">
			<NavLink to='/busqueda' className="search-button" activeClassName="active">
				<span>
					Búsqueda &nbsp;&nbsp;<i className="fas fa-search"></i> 
				</span>
			</NavLink>
			
			<UserMenu />
		</div>
	)
}

export const TopMenu = () => {
	const location = useLocation()
	const topMenuRef = useRef(null)
	const { pathname } = location
	const [showLeftContent, setShowLeftContent] = useState(false)
	const [showRightContent, setShowRightContent] = useState(false)
	const [showNavbar, setShowNavbar] = useState(false)
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

	const hideTopMenu = () => {
		setShowLeftContent(true)
		setShowNavbar(false)
		setShowRightContent(true)
	}

	const showTopMenu = () => {
		setShowLeftContent(true)
		setShowNavbar(true)
		setShowRightContent(true)
	}

	useEffect(() => {
		switch(pathname){
		case '/':
			hideTopMenu()
			break
		case '/perfiles':
			hideTopMenu()
			break
		case '/perfiles/editar':
			hideTopMenu()
			break
		default:
			showTopMenu()
			break
		}
	}, [pathname])

	return (
		<div id="top-menu" className={`top-menu ${scroll ? 'bgcolor' : 'bggradient'}`} ref={topMenuRef}>
			<div className="section-wrapper">
				{	showLeftContent &&
					<LeftContent showNavbar={showNavbar}/>
				}
				{	showRightContent &&
					<RightContent />
				}
			</div>
		</div>
	)
}