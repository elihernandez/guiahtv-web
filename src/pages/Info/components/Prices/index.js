import React from 'react'
import { Button } from "../../../../components/Button/index"
import { Link } from "../../../../components/Link/index"
import './styles.css'

export function Prices(){
      return (
            <div className="prices-wrapper">
                  <h2 className="title-section">Disfruta del mejor espacio de fe</h2>
                  <div className="cards-plans-wrapper">
                        <div className="card-plan month"> 
                              <h2 className="name-plan">MENSUAL</h2>
                              <h3 className="price-plan">$89</h3>
                              <ul className="info-plan">
                                    <li>7 días de prueba</li>
                                    <li>Cancela cuando quieras</li>
                                    <li>Acceso desde la web, aplicaciones móviles y smart tv</li>
                              </ul>
                              <Link className="link-register" href="https://guiah.tv/axs/registro">
                                    <Button type="button" uppercase={true} color="transparent" classes="btn-login body-2">Probar sin costo</Button>
                              </Link>
                        </div>
                        <div className="card-plan year"> 
                              <h2 className="name-plan">ANUAL</h2>
                              <h3 className="price-plan">$890</h3>
                              <ul className="info-plan">
                                    <li>7 días de prueba</li>
                                    <li>Cancela cuando quieras</li>
                                    <li>Acceso desde la web, aplicaciones móviles y smart tv</li>
                              </ul>
                              <Link className="link-register" href="https://guiah.tv/axs/registro">
                                    <Button type="button" uppercase={true} color="transparent" classes="btn-login body-2">Probar sin costo</Button>
                              </Link>
                        </div>
                  </div>
            </div>
      )
}