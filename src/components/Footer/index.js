import React from 'react'
import { IconLogo } from '../Logo/index'
import './styles.css'

function FooterLink({ className, href, text }) {
      const classNameItem = `${className}-item`
      const dataUia = `${className}-label`

      return (
            <li className={classNameItem}>
                  <a className={className} data-uia={dataUia} href={href}>
                        <span className="title-link">{text}</span>
                  </a>
            </li>
      )
}

function FooterLinks() {
      return (
            <ul className="footer-links">
                  <FooterLink className="footer-link" href="https://guiah.tv/privacidad/" text="Política de privacidad" />
                  <FooterLink className="footer-link" href="https://guiah.tv/terminos/" text="Términos de uso" />
                  <FooterLink className="footer-link" href="https://guiah.tv/" text="Contáctanos" />
            </ul>
      )
}

export function Footer() {
      return (
            <div className="footer-content">
                  <div className="footer-wrapper">
                        <IconLogo />
                        <h5 className="services-text">
                              MÚSICA | TV EN VIVO | PELÍCULAS | CONCIERTOS | CLÍNICAS | SERIES |
                              ZONA KIDS | PPV Y MUCHO MÁS
                        </h5>
                        <FooterLinks />
                  </div>
            </div>
      )
}