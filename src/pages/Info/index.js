import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import Logo from "../../components/Logo/index"
import { H1, H2 } from "../../components/Typography/index"
import { Link } from "../../components/Link/index"
import { Button } from "../../components/Button/index"
import { Footer } from "../../components/Footer/index"
import { CSSTransition } from 'react-transition-group'
import "./styles.css"

export function Info() {
      const [show, setShow] = useState(false)

      useEffect(() => {
            setShow(true)
      }, [])

      return (
            <CSSTransition in={show} timeout={50} classNames="fade-50" unmountOnExit>
                  <div className="wrapper-main-home">
                        <div className="wrapper-background" />
                        <div className="gradient-overlay" />
                        <div className="main-info">
                              <Logo color="blue" size="md" />
                              <H1 className="title-text large-title-1">El mejor contenido espiritual y de valores reunidos en una sola plataforma para toda la familia.</H1>
                              <H2 className="subtitle-text title-2">Disfruta en donde quieras, cancela cuando quieras.</H2>
                              <div className="group-buttons-actions">
                                    <p className="body-2">¿Quieres ver Guíah TV ya?</p>
                                    <Link className="link-register" href="https://guiah.tv/axs/registro">
                                          <Button type="button" uppercase={true} color="primary" classes="btn-register title-3">Registrarme</Button>
                                          </Link>
                                          <NavLink to="/login" className="link-to-page-login" data-uia="link-to-page-login-label">
                                          <Button type="button" uppercase={true} color="transparent" classes="btn-login title-3">Iniciar sesión</Button>
                                    </NavLink>
                              </div>
                        </div>
                        <Footer />
                  </div>
            </CSSTransition>
      );
}

// <ButtonUI type="button" className="primary uppercase btn-register title-3" text="Registrarme" />
// <H1 className="title-text large-title-1">Disfruta de la mejor plataforma de <br /> contenido exclusivo y espiritual para <br /> toda la familia.</H1>