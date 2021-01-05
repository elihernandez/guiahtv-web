import React from 'react'
import './styles.css'

export default function NavLink(){
    return (
        <div className="nav-link">
            <ul>
                <li className="active"><p>Inicio</p></li>
                <li><p>Iglesias</p></li>
                <li><p>Peliculas</p></li>
                <li><p>Series</p></li>
                <li><p>Documentales</p></li>
            </ul>
        </div>
    )
}