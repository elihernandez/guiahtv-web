import React from 'react'
import { NavLink } from "react-router-dom"
import imgLogoBlue from '../../assets/images/logos/guiahtv/guiahtv-logo-blue.png'
import imgLogoPurple from '../../assets/images/logos/guiahtv/guiahtv-logo-purple.png'
import './styles.css'

export default function Logo({ color = 'blue', size = 'md' }) {
    let src
    switch(color){
        case 'blue':
            src = imgLogoBlue
            break
        case 'purple':
            src = imgLogoPurple
            break
        default:
            src = imgLogoPurple
            break
    }
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