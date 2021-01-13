import React, { useEffect } from 'react'
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

      var topMenu = document.querySelector('.top-menu')
      var previousScroll = 0
      window.onscroll = function() {
            var scroll = window.scrollY;
            // var scroll = $(this).scrollTop();
            if (scroll > previousScroll && scroll > 50){
                 topMenu.classList.add('bgcolor')
            } else {
                 topMenu.classList.remove('bgcolor')
            }
            previousScroll = scroll   
      }

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