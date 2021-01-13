import React, { useEffect, useRef } from 'react'
import { Navbar } from '../Navbar/index'
import { UserMenu } from '../UserMenu/index'
import Logo from '../Logo/index'
import './styles.css'

function NavbarTopMenu(){
      const navLinks = [
            {title: 'Música', href: '/musica', icon: 'fas fa-music'},
            {title: 'Iglesias', href: '/a', icon: 'fas fa-place-of-worship'},
            {title: 'Peliculas', href: '/b', icon: 'fas fa-film'},
            {title: 'Series', href: '/c', icon: 'fas fa-tv'}
      ]

      const classItems = 'navbar-link-top-menu'
      const classNavbar = 'navbar-top-menu'

      return (
            <Navbar navLinks={navLinks} classNavbar={classNavbar} classItems={classItems} />
      )
}

export function TopMenu() {
      const topMenu = useRef(null)
      let previousScroll = 0
      let scroll = 0
      
      window.onscroll = function() {
            scroll = window.scrollY;
            if (scroll > previousScroll && scroll > 50){
                  topMenu.current.classList.add('bgcolor')
            } else {
                  topMenu.current.classList.remove('bgcolor')
            }
            previousScroll = scroll   
      }

      return (
            <div className="top-menu" ref={topMenu}>
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