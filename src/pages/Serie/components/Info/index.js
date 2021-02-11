import React from 'react'
import { replaceString } from '../../../../js/String'
import Tooltip from '@material-ui/core/Tooltip'
import './styles.css'

export function Info({ data }) {
      const {
            ContactFon,
            ContactWeb,
            ContactFb,
            ContactIG,
            ContactTw,
            ContactLoc
      } = data

      return (
            <div className="info-contact-wrapper">
                  
                  <div className="group-section">
                        <div className="phone-group"><i className="fas fa-phone-alt" />Télefono de contacto: &nbsp;&nbsp;&nbsp;{ContactFon}</div>
                        <div className="web-group"><i className="fas fa-globe" />Sitio web: &nbsp;&nbsp;&nbsp;<a href={ContactWeb}>{ContactWeb}</a></div>
                        <div className="social-media-group">
                              {ContactFb &&
                                    <Tooltip title="Facebook" placement="top-start">
                                          <a href={`https://www.facebook.com/${ContactFb}`}>
                                                <i className="fab fa-facebook-square" /> Facebook
                                          </a>
                                    </Tooltip>
                              }
                              {ContactIG &&
                                    <Tooltip title="Instagram" placement="top-start">
                                          <a href={`https://www.instagram.com/${ContactIG}`}>
                                                <i className="fab fa-instagram" /> Instagram
                                          </a>
                                    </Tooltip>
                              }
                              {ContactTw &&
                                    <Tooltip title="Twitter" placement="top-start">
                                          <a href={`https://www.twitter.com/${ContactTw}`}>
                                                <i className="fab fa-twitter-square" /> Twitter
                                          </a>
                                    </Tooltip>
                              }
                              {ContactLoc &&
                                    <Tooltip title="Ubicación" placement="top-start">
                                          <a href={`https://www.google.com/maps/place/${replaceString(ContactLoc, ",", "+")}`}>
                                                <i className="fas fa-map-marker-alt" /> Ubicación
                                          </a>
                                    </Tooltip>
                              }
                        </div>
                  </div>
            </div>
      )
}