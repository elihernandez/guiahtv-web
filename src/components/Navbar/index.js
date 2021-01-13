import React from 'react'
import { NavLink } from "react-router-dom"
import './styles.css'

export function Navbar({ navLinks, classNavbar, classItems }) {
    const classItem = `navbar-link ${classItems}`
    const classNav = `navbar ${classNavbar}`
    
    return (
        <div className={classNav}>
            <div className="section-wrapper">
                <ul className="navbar-list">
                    {
                        navLinks.map(({ title, href, icon }) => {
                            return  <li key={title} className="navbar-item">
                                        <NavLink to={href} className={classItem} activeClassName="active">
                                            <i className={icon}></i>
                                            <p>{title}</p>
                                        </NavLink>
                                    </li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}