import React from 'react'
import { NavLink } from "react-router-dom";

export default function Logo(){
    return (
        <NavLink to="/">
            <div className="logo">
                <img src="build/assets/images/logos/guiahtv/guiahtv-logo-blue.png"/>
            </div>
        </NavLink>
    )
}

export function IconLogo(){
    return (
        <div className="logo">
            <img src="build/assets/images/logos/guiahtv/logo_foreground.png" />
        </div>
    )
}