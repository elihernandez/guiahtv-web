import React from 'react'
import { NavLink } from "react-router-dom"
import './styles.css'

export function Navbar(){
    return(
        <div className="navbar-content">
        <ul className="navbar-list">
                <li className="navbar-item">
                    <NavLink to="/musica" className="navbar-link" activeClassName="active">
                        <p>Música</p>
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/a" className="navbar-link" activeClassName="active">
                        <p>Iglesias</p>
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/b" className="navbar-link" activeClassName="active">
                        <p>Peliculas</p>
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/c" className="navbar-link" activeClassName="active">
                        <p>Series</p>
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/d" className="navbar-link" activeClassName="active">
                        <p>Documentales</p>
                    </NavLink>
                </li>
            </ul>
        </div>          
    )
}