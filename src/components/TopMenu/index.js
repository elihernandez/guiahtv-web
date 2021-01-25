import React, { useEffect, useRef } from 'react'
import { Navbar } from '../Navbar/index'
import { UserMenu } from '../UserMenu/index'
import Logo from '../Logo/index'
import './styles.css'

function NavbarTopMenu(){
      const navLinks = [
            {title: 'En vivo', href: '/tv', icon: 'fas fa-tv'},
            {title: 'A la carta', href: '/alacarta', icon: 'fas fa-film'},
            {title: 'Radio', href: '/radio', icon: 'fas fa-broadcast-tower'},
            {title: 'Música', href: '/musica', icon: 'fas fa-music'},
            {title: 'Zona kids', href: '/zonakids', icon: 'fas fa-child'}
      ]

      const classItems = 'navbar-link-top-menu'
      const classNavbar = 'navbar-top-menu'

      return (
            <Navbar navLinks={navLinks} classNavbar={classNavbar} classItems={classItems} />
      )
}

export function TopMenu() {
      const topMenu = useRef(null)
      const navbar = useRef(null)
      
      useEffect(() => {
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
      }, [])

      return (
            <div id="top-menu" className="top-menu" ref={topMenu}>
                  <div className="section-wrapper">
                        <div className="left-section">
                              <Logo color="blue" />
                              <div ref={navbar}>
                                    <NavbarTopMenu />
                              </div>
                        </div>
                        <div className="right-section">
                              <span><i className="fas fa-search"/></span>
                              <UserMenu/>
                        </div>
                  </div>
            </div>
      )
}