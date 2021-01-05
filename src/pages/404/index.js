import React from 'react'
import Logo from '../../components/Logo/index'
import {NavLink} from "react-router-dom"
import './styles.css'

export default function PageNotFound(){
      return (
        <div className="page-not-found container">
            <NavLink to="/">
                  <Logo />
            </NavLink>
            <div className="message-container">
                  <h3 className="title-message">¿Te perdiste?</h3>
                  <p className="text-message">
                        No encontramos la página a la que intentas acceder. Encontrarás
                        muchos títulos para explorar en la página de inicio.
                  </p>
                  <NavLink to="/inicio">
                        <button type="button" className="btn-secondary">
                        Volver al inicio
                        </button>
                  </NavLink>
            </div>
        </div>
      );
}