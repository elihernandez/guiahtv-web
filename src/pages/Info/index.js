import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../components/Logo/index";
import { Footer } from "../../components/Footer/index";
import "./styles.css";

export default function Info() {
      return (
            <div className="wrapper-home">
                  <div className="wrapper-background" />
                  <div className="gradient-overlay" />
                  <div className="center-content">
                        <Logo />
                        <h1 className="title-text">
                              Disfruta de la mejor plataforma de <br /> contenido exclusivo y
                              espiritual para <br /> toda la familia.
                        </h1>
                        <h2 className="secondary-text">
                              Disfruta en donde quieras, cancela cuando quieras.
                        </h2>
                        <div className="group-info">
                              <p>¿Quieres ver Guíah TV ya?</p>
                              <a className="link-register" data-uia="link-register-label" href="https://guiah.tv/axs/registro">
                                    <button type="button" className="btn-register">Registrarme</button>
                              </a>
                              <NavLink to="/login" className="link-to-page-login" data-uia="link-to-page-login-label">
                                    <button type="button" className="btn-login">Iniciar sesión</button>
                              </NavLink>
                        </div>
                  </div>
                  <Footer />
            </div>
      );
}
