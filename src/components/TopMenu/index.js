import React from 'react'
import { Navbar } from '../Navbar/index'
import { UserMenu } from '../UserMenu/index'
import Logo from '../Logo/index'
import './styles.css'

// function MenuUserProfile(){
//       return (
//             <span>Mi perfil&nbsp;&nbsp;&nbsp;<i className="fas fa-user-circle"/></span>
//       )
// }

export function TopMenu() {
      return (
            <div className="top-menu">
                  <div className="section-content">
                        <div className="left-section">
                              <Logo color="blue" />
                              <Navbar />
                        </div>
                        <div className="right-section">
                              <span><i className="fas fa-search"/></span>
                              <UserMenu/>
                        </div>
                  </div>
            </div>
      )
}