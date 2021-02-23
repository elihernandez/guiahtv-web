import React, { Fragment } from 'react'
import { isIOS, isAndroid, isMobileOnly, isTablet } from "react-device-detect"
import Logo from '../../components/Logo'
import { Footer } from '../../components/Footer'
import './styles.css'

function ImgDevice(){
      return (
            <Fragment>
                  {isMobileOnly &&
                        <img className="img-device" alt="Descarga la app en celular" src="build/assets/images/backgrounds/cantanteiphone.png" />
                  }
                  {isTablet &&
                        <img className="img-device" alt="Descarga la app en tabled" src="build/assets/images/backgrounds/cantanteipad.png" />
                  }
            </Fragment>
      )
}

function InfoDevice(){
      return (
            <div className="info-wrapper">
                  {isIOS &&
                        <Fragment>
                              <h3 className="message">Descarga la app para iOS y disfruta de todo nuestro contenido.</h3>
                              <div className="content-badge">
                                    <a href="https://apps.apple.com/us/app/gu%C3%ADah-tv/id1499559136?itsct=apps_box&amp;itscg=30200">
                                          <img 
                                                src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/es-MX?size=250x83&amp;releaseDate=1605139200&h=cf2a4a1acc18319deb1670e5e8041495" 
                                                alt="Descarga la app en la App Store y disfruta"
                                                className="badge-store-ios"
                                          />
                                    </a>
                              </div>
                        </Fragment>
                  }
                  {isAndroid && 
                        <Fragment>             
                              <h3 className="message">Descarga la app para Android y disfruta de todo nuestro contenido.</h3>
                              <div className="content-badge">
                                    <a href='https://play.google.com/store/apps/details?id=tv.guiah.app&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                                          <img 
                                                src='https://play.google.com/intl/en_us/badges/static/images/badges/es_badge_web_generic.png'
                                                alt='Descarga la app en Google Play y disfruta'
                                                className="badge-store-google"
                                          />
                                    </a> 
                              </div>
                        </Fragment>
                  }
            </div>
      )
}

export function GetApp() {
      return (
            <div className="get-app-wrapper">
                  <div className="container-wrapper">
                        <Logo color="blue" />
                        <h2 className="title">Disfruta en donde quieras, cancela cuando quieras.</h2>
                        <ImgDevice />
                        <InfoDevice />
                  </div>
                  <Footer />
            </div>
      )
}