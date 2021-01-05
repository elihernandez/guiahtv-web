import React from 'react'
import WrapperInfo from '../../components/WrapperInfo/WrapperInfo'
import {NavLink} from "react-router-dom";
import Logo from '../../components/Logo/index'
import './styles.css'

export default function Info(){
      return (
            <WrapperInfo>
                  <div className="center-content">
                        <NavLink to="/"><Logo/></NavLink>
                        <h2 className="text">
                              Disfruta de la mejor plataforma de contenido exclusivo y espiritual para toda la familia.
                        </h2>
                        <h3 className="text">
                              Disfruta en donde quieras, cancela cuando quieras.
                        </h3>
                        <div className="group-info">
                              <p>¿Quieres ver Guíah TV ya?</p>
                              <a href="https://guiah.tv/axs/registro"><button className="btn-register">Registrarme</button></a>
                              <NavLink to="/login"><button className="btn-login">Iniciar sesión</button></NavLink>
                        </div>
                        <div className="bottom-info">
                              <div className="logo">
                                    <img src="../src/assets/images/logos/guiahtv/logo_foreground.png"/>
                              </div>
                              <h5>MÚSICA | TV EN VIVO | PELÍCULAS | CONCIERTOS | CLÍNICAS | SERIES | ZONA KIDS | PPV Y MUCHO MÁS</h5>
                              <ul>
                                    <a href="https://guiah.tv/privacidad/"><li>Política de privacidad</li></a>
                                    <a href="https://guiah.tv/terminos/"><li>Términos de uso</li></a>
                                    <a href="https://guiah.tv/"><li>Contáctanos</li></a>
                              </ul>
                        </div>
                  </div>
            </WrapperInfo>
      )
}