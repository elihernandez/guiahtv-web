import React, { useEffect, useRef } from 'react'
import { Navbar } from '../Navbar/index'
import { UserMenu } from '../UserMenu/index'
import Logo from '../Logo/index'
import RadioIcon from '@material-ui/icons/Radio';
import './styles.css'

export function hideTopMenuNavbar(){
      if(document.querySelector('.navbar-top-menu')){
            document.querySelector('.navbar-top-menu').style.opacity = 0
            document.querySelector('.top-menu').classList.remove('bggradient')
      }
}

export function showTopMenuNavbar(){
      if(document.querySelector('.navbar-top-menu')){
            document.querySelector('.navbar-top-menu').style.opacity = 1
            document.querySelector('.top-menu').classList.add('bggradient')
      }
}

function NavbarTopMenu(){
      const navLinks = [
            {title: 'En vivo', href: '/tv', icon: <i className="fas fa-tv"></i>},
            {title: 'A la carta', href: '/alacarta', icon: <i className="fas fa-film"></i>},
            {title: 'Radio', href: '/radio', icon: <RadioIcon />},
         
            {title: 'Zona kids', href: '/zonakids', icon: <i className="fas fa-child"></i>}
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
            let scroll = 0
            
            window.onscroll = function() {
                  scroll = window.scrollY
                  if (scroll > 25){
                        topMenu.current.classList.add('bgcolor')
                  } else {
                        topMenu.current.classList.remove('bgcolor')
                  } 
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