import React, { useState, useEffect, useRef } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { Navbar } from '../Navbar/index'
import { UserMenu } from '../UserMenu/index'
import Logo from '../Logo/index'
import { containsString } from '../../js/String'
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
		{ title: 'Zona kids', href: '/zonakids', icon: <i className="fas fa-child"></i> }
	]

	return (
		<div className="left-content">
			<Logo color="purple" size="sm" />
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
	let location = useLocation()
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

	useEffect(() => {
		switch(pathname){
		case '/':
			setShowLeftContent(true)
			setShowNavbar(false)
			setShowRightContent(true)
			break
		case '/perfiles':
			setShowLeftContent(true)
			setShowNavbar(false)
			setShowRightContent(false)
			break
		default:
			setShowLeftContent(true)
			setShowRightContent(true)
			setShowNavbar(true)
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