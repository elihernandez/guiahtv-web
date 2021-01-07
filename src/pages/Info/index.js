import React from "react"
import { NavLink } from "react-router-dom"
import Logo from "../../components/Logo/index"
import { Footer } from "../../components/Footer/index"
import { H1, H2 } from "../../components/Text/index"
import { ButtonUI } from "../../components/Button/index"
import { Link } from "../../components/Link/index"
import "./styles.css"

export function Info() {
      return (
            <div className="wrapper-main-home">
                  <div className="wrapper-background" />
                  <div className="gradient-overlay" />
                  <div className="center-content">
                        <Logo color="blue" />
                        <H1>Disfruta de la mejor plataforma de <br /> contenido exclusivo yespiritual para <br /> toda la familia.</H1>
                        <H2>Disfruta en donde quieras, cancela cuando quieras.</H2>
                        <div className="group-info">
                              <p>¿Quieres ver Guíah TV ya?</p>
                              <Link className="link-register" href="https://guiah.tv/axs/registro">
                                    <ButtonUI type="button" className="primary uppercase btn-register" text="Registrarme" />
                              </Link>
                              <NavLink to="/login" className="link-to-page-login" data-uia="link-to-page-login-label">
                                    <ButtonUI type="button" className="transparent white uppercase btn-login" text="Iniciar sesión" />
                              </NavLink>
                        </div>
                  </div>
                  <Footer />
            </div>
      );
}
