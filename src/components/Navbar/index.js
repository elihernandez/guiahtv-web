import React from 'react'
import NavLink from '../NavLink/index'
import Logo from '../Logo/index'
import './styles.css'

export function Navbar(){
      return(
            <div className="top-menu">
                <div className="section-content">
                    <div className="left-section">
                        <Logo color="blue" />
                        <NavLink />
                    </div>
                    <div className="right-section">
                        <span><i className="fas fa-search"></i></span>
                        <span>Mi perfil&nbsp;&nbsp;&nbsp;<i className="fas fa-user-circle"></i></span>
                    </div>
                </div>
            </div>
      )
}