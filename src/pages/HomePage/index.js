import React, { useState, useEffect } from 'react'
import NavLink from '../../components/NavLink/index'
import Logo from '../../components/Logo/index'
import Spotlight from '../../components/Spotlight/index'
import ButtonsMenu from '../../components/ButtonsMenu/index'
import './styles.css'

export default function HomePage(){
    return (
        <>
            <div className="top-menu">
                <div className="section-content">
                    <div className="left-section">
                        <Logo/>
                        <NavLink/>
                    </div>
                    <div className="right-section">
                        <span><i className="fas fa-search"></i></span>
                        <span>Mi perfil&nbsp;&nbsp;&nbsp;<i className="fas fa-user-circle"></i></span>
                    </div>
                </div>
            </div>
            <div className="spotlight">
                <Spotlight/>
            </div>
            <div className="buttons-sections">
                <ButtonsMenu/>
            </div>
        </>
    )
}