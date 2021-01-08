import React from 'react'
import Logo from '../../components/Logo/index'
import { NavLink } from "react-router-dom"
import './styles.css'

export function Page404() {
      return (
            <div className="page-404">
                  <div className="page-404-wrapper">
                        <Logo color="blue" />
                        <div className="message-container">
                              <h3 className="title-text">¿Te perdiste?</h3>
                              <p>
                                    No encontramos la página a la que intentas acceder. Encontrarás
                                    muchos títulos para explorar en la página de inicio.
                              </p>
                              <NavLink to="/" className="link-to-home" data-uia="link-to-home-label">
                                    <button type="button" className="btn-secondary btn-link-to-home">
                                          Volver al inicio
                                    </button>
                              </NavLink>
                        </div>
                  </div>
            </div>
      )
}