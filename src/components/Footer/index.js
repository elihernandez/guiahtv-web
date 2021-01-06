import React from 'react'
import { IconLogo } from '../Logo/index'
import './styles.css'

export function Footer(){
      return (
            <div className="footer-content">
                  <div className="footer-wrapper">
                        <IconLogo/>
                        <h5 className="services-text">
                              MÚSICA | TV EN VIVO | PELÍCULAS | CONCIERTOS | CLÍNICAS | SERIES |
                              ZONA KIDS | PPV Y MUCHO MÁS
                        </h5>
                        <ul className="footer-links">
                              <li className="footer-link-item">
                                    <a className="footer-link" data-uia="footer-link-label" href="https://guiah.tv/privacidad/">
                                          <span>Política de privacidad</span>
                                    </a>
                              </li>
                              <li className="footer-link-item">
                                    <a className="footer-link" data-uia="footer-link-label" href="https://guiah.tv/terminos/">
                                          <span>Términos de uso</span>
                                    </a>
                              </li>
                              <li className="footer-link-item">
                                    <a className="footer-link" data-uia="footer-link-label" href="https://guiah.tv/">
                                          <span>Contáctanos</span>
                                    </a>
                              </li>
                        </ul>
                  </div>
            </div>
      )
}