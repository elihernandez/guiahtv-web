import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Navbar } from '../Navbar/index'
import { UserMenu } from '../UserMenu/index'
import Logo from '../Logo/index'
import RadioIcon from '@material-ui/icons/Radio';
import './styles.css'

function LeftContent() {
      const navLinks = [
            { title: 'En vivo', href: '/tv', icon: <i className="fas fa-tv"></i> },
            { title: 'A la carta', href: '/alacarta', icon: <i className="fas fa-film"></i> },
            { title: 'Radio', href: '/radio', icon: <RadioIcon /> },
            { title: 'Zona kids', href: '/zonakids', icon: <i className="fas fa-child"></i> }
      ]

      const classItems = 'navbar-link-top-menu'
      const classNavbar = 'navbar-top-menu'

      return (
            <div className="left-content">
                  <Logo color="purple" size="sm" />
                  <Navbar navLinks={navLinks} classNavbar={classNavbar} classItems={classItems} />
            </div>
      )
}

function RightContent() {
      return (
            <div className="right-content">
                  <UserMenu />
            </div>
      )
}

export const TopMenu = () => {
      const topMenuRef = useRef(null)
      const [scroll, setScroll] = useState(0)

      useEffect(() => {
            window.onscroll = function () {
                  if (window.scrollY > 25 && scroll == false) {
                        setScroll(true)
                  } else {
                        setScroll(false)
                  }
            }
      }, [])

      return (
            <div id="top-menu" className={`top-menu ${scroll ? 'bgcolor' : ''}`} ref={topMenuRef}>
                  { useMemo(() => (
                        <div className="section-wrapper">
                              <LeftContent />
                              <RightContent />
                        </div>
                  ), [])}
            </div>
      )
}