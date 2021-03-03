import React from 'react'
import { NavLink } from "react-router-dom"
import './styles.css'

export default function Logo({ color = 'blue', size = 'md' }) {
    const src = `build/assets/images/logos/guiahtv/guiahtv-logo-${color}.png`
    const className = `img-logo ${size}`

    return (
        <NavLink to="/">
            <div className="logo-guiahtv">
                <img className={className} src={src} alt="guiahtv-logo" />
            </div>
        </NavLink>
    )
}

export function IconLogo() {
    return (
        <div className="logo">
            <img src="build/assets/images/logos/guiahtv/logo_foreground.png" alt="guiahtv-icon-logo" />
        </div>
    )
}