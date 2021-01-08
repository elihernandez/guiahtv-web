import React from 'react'
import { NavLink as Link } from "react-router-dom"
import './styles.css'

export default function Links(){
    return (
        <div className="nav-link">
            <ul>
                <li>
                    <Link to="/musica">
                        <p>Iglesias</p>
                    </Link>
                </li>
                <li><p>Peliculas</p></li>
                <li><p>Series</p></li>
                <li><p>Documentales</p></li>
            </ul>
        </div>
    )
}