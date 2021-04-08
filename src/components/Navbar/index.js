import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import './styles.css'

export function Navbar({ navLinks, classNavbar, classItems, show }) {
	const navbarRef = useRef(null)
	const classItem = `navbar-link ${classItems}`
	const classNav = `navbar ${classNavbar}`
    
	return (
		<CSSTransition nodeRef={navbarRef} in={show} timeout={300} classNames="fade" unmountOnExit>
			<div className={classNav} ref={navbarRef}>
				<div className="section-wrapper">
					<ul className="navbar-list">
						{
							navLinks.map(({ title, href, icon }) => {
								return  <li key={title} className="navbar-item">
									<NavLink to={href} className={classItem} activeClassName="active">
										{icon}
										<p>{title}</p>
									</NavLink>
								</li>
							})
						}
					</ul>
				</div>
			</div>
		</CSSTransition>
	)
}