import React from 'react'
import badgeAmazon from '../../../../assets/images/badges/amazon.png'
import badgeAppStore from '../../../../assets/images/badges/app_store.png'
import badgeGooglePlay from '../../../../assets/images/badges/google_play.png'
import badgeLg from '../../../../assets/images/badges/lg.png'
import badgeSamsung from '../../../../assets/images/badges/samsung.png'
import './styles.css'

export function Platforms(){
      return (
            <div className="platforms-available-wrapper">
                  <div className="info-wrapper">
                        <h2 className="title-section">Disponible en tus dispositivos favoritos</h2>
                        <div className="icons-wrapper">
                              <div className="device">
                                    <i className="fas fa-tv"></i>
                                    <h5 className="name-device">Televisión</h5>
                              </div>
                              <div className="device">
                                    <i className="fas fa-laptop"></i>
                                    <h5 className="name-device">Computadoras</h5>
                              </div>
                              <div className="device">
                                    <i className="fas fa-tablet-alt"></i>
                                    <h5 className="name-device">Tabletas</h5>
                              </div>
                              <div className="device">
                                    <i className="fas fa-mobile-alt"></i>
                                    <h5 className="name-device">Celulares</h5>
                              </div>
                        </div>
                        <div className="badges-wrapper">
                              <img src={badgeAmazon} />
                              <img src={badgeAppStore} />
                              <img src={badgeGooglePlay} />
                              <img src={badgeLg} />
                              <img src={badgeSamsung} />
                        </div>
                  </div>
            </div>
      )
}
