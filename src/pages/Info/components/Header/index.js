import React, { useRef, useState, useEffect } from 'react'
import { Link } from "../../../../components/Link/index"
import { Button } from "../../../../components/Button/index"
import { NavLink } from "react-router-dom"
import './styles.css'

export function Header() {
      const headerRef = useRef(null)
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
            <header id="header" className={`header-home ${scroll ? 'bgcolor' : ''}`} ref={headerRef}>
                  <NavLink to="/login" className="link-to-page-login" data-uia="link-to-page-login-label">
                        <Button type="button" uppercase={true} color="transparent" classes="btn-login body-2">Iniciar sesión</Button>
                  </NavLink>
            </header>
      )
}

// <Link className="link-register" href="https://guiah.tv/axs/registro">
//       <Button type="button" uppercase={true} color="primary" classes="btn-register body-2">Pruebalo sin costo</Button>
// </Link>
