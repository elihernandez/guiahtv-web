import React, { useState, useEffect } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Popover from '@material-ui/core/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { getContactInfo } from '../../../../../services/getContactInfo'
import './styles.css'

export function MoreInfo({ data }) {
      if (!data) return null
      const [contactInfo, setContactInfo] = useState(null)
      const { ContactID } = data

      const handleClickFb = () => {
            window.open(`https://www.facebook.com/${contactInfo.ContactFb}`, "_blank")
      }
      
      const handleClickIg = () => {
            window.open(`https://www.instagram.com/${contactInfo.ContactIG}`, "_blank")
      }
      
      const handleClickTw = () => {
            window.open(`https://www.twitter.com/${contactInfo.ContactTw}`, "_blank")
      }
      
      const handleClickGm = () => {
            window.open(`https://www.google.com/maps/place/${replaceString(contactInfo.ContactLoc, ",", "+")}`, "_blank")
      }

      useEffect(() => {
            const getInfoContact = async () => {
                  try {
                        const data = await getContactInfo(ContactID)
                        setContactInfo(data)
                  } catch (e) {

                  }
            }

            getInfoContact()
      }, [data])

      return (
            <PopupState variant="popover" popupId="demo-popup-popover">
                  {(popupState) => (
                        <div>
                              <div className="button-more-info-wrapper">
                                    <Tooltip title="Más info" placement="top-start">
                                          <span className="button-more-info" {...bindTrigger(popupState)}>
                                                <i className="fas fa-info" />
                                          </span>
                                    </Tooltip>
                              </div>
                              <Popover
                                    {...bindPopover(popupState)}
                                    anchorOrigin={{
                                          vertical: 'top',
                                          horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                          vertical: 'bottom',
                                          horizontal: 'center',
                                    }}
                              >
                                    {contactInfo &&
                                          <div className="contact-info-item">
                                                <h2 className="title">Información de {contactInfo.ContactTitle}</h2>
                                                <h3 className="description">{contactInfo.ContactDescription}</h3>
                                                {contactInfo.ContactFon &&
                                                      <div className="content-phone">
                                                            <i className="fas fa-phone-alt"></i>
                                                            <p>{contactInfo.ContactFon}</p>
                                                      </div>
                                                }
                                                {contactInfo.ContactWeb &&
                                                      <div className="content-web">
                                                            <i className="fas fa-globe"></i>
                                                            <p>{contactInfo.ContactWeb}</p>
                                                      </div>
                                                }
                                                <div className="content-social-media">
                                                      {contactInfo.ContactFb &&
                                                            <span className="span-icon" onClick={handleClickFb}>
                                                                  <i className="fab fa-facebook-square" />
                                                            </span>
                                                      }
                                                      {contactInfo.ContactIG &&
                                                            <span className="span-icon" onClick={handleClickIg}>
                                                                  <i className="fab fa-instagram" />
                                                            </span>
                                                      }
                                                      {contactInfo.ContactTw &&
                                                            <span className="span-icon" onClick={handleClickTw}>
                                                                  <i className="fab fa-twitter-square" />
                                                            </span>
                                                      }
                                                      {contactInfo.ContactLoc &&
                                                            <span className="span-icon" onClick={handleClickGm}>
                                                                  <i className="fas fa-map-marker-alt" />
                                                            </span>
                                                      }
                                                </div>
                                          </div>
                                    }
                              </Popover>
                        </div>
                  )}
            </PopupState>
      )
}