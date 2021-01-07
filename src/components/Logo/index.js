import React from 'react'
import { NavLink } from "react-router-dom"

export default function Logo({color}){
    const imgSrc = `build/assets/images/logos/guiahtv/guiahtv-logo-${color}.png`

    return (
        <NavLink to="/">
            <div className="logo">
                <img src={imgSrc} alt="guiahtv-logo"/>
            </div>
        </NavLink>
    )
}

export function IconLogo(){
    return (
        <div className="logo">
            <img src="build/assets/images/logos/guiahtv/logo_foreground.png" alt="guiahtv-icon-logo"/>
        </div>
    )
}