import React from 'react'
import { IconLogo } from '../Logo'
import { Link } from '../Link'
import './styles.css'

function Links() {
      return (
            <ul className="footer-links">
                  <li className="footer-link-item">
                        <Link className="footer-link" href="https://guiah.tv/privacidad/">
                              <span className="title-link caption">Política de privacidad</span>
                        </Link>
                  </li>
                  <li className="footer-link-item">
                        <Link className="footer-link" href="https://guiah.tv/terminos/">
                              <span className="title-link caption">Términos de uso</span>
                        </Link>
                  </li>
                  <li className="footer-link-item">
                        <Link className="footer-link" href="https://guiah.tv/">
                              <span className="title-link caption">Contáctanos</span>
                        </Link>
                  </li> 
            </ul>
      )
}

export function Footer() {
      return (
            <div className="footer-content">
                  <div className="footer-wrapper">
                        <IconLogo />
                        <h5 className="services-text body-3">
                              MÚSICA | TV EN VIVO | PELÍCULAS | CONCIERTOS | CLÍNICAS | SERIES |
                              ZONA KIDS | PPV Y MUCHO MÁS
                        </h5>
                        <Links />
                  </div>
            </div>
      )
}