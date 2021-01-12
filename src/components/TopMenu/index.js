import React from 'react'
import { Navbar } from '../Navbar/index'
import { UserMenu } from '../UserMenu/index'
import Logo from '../Logo/index'
import './styles.css'

function NavbarTopMenu(){
      const navLinks = [
            {title: 'Música', href: '/musica'},
            {title: 'Iglesias', href: '/a'},
            {title: 'Peliculas', href: '/b'},
            {title: 'Series', href: '/c'},
            {title: 'Documentales', href: '/d'}
      ]

      const classItems = 'navbar-link-top-menu'
      const classNavbar = 'navbar-top-menu'

      return (
            <Navbar navLinks={navLinks} classNavbar={classNavbar} classItems={classItems} />
      )
}

export function TopMenu() {
      return (
            <div className="top-menu">
                  <div className="section-wrapper">
                        <div className="left-section">
                              <Logo color="blue" />
                              <NavbarTopMenu />
                        </div>
                        <div className="right-section">
                              <span><i className="fas fa-search"/></span>
                              <UserMenu/>
                        </div>
                  </div>
            </div>
      )
}