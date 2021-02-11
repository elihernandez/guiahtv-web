import React, { Fragment, useRef, useContext, useState } from 'react'
import VideoContext from '../../../../context/VideoContext'
import LiveTvContext from '../../../../context/LiveTvContext'
import { NavLink } from "react-router-dom"
import { createUrlString, shortString, isShortString, replaceString, limitString } from '../../../../js/String'
import { isLive, getEventTime, getProgressTimeEvent } from '../../../../js/Time'
import { CSSTransition } from 'react-transition-group'
import { getContactInfo } from '../../../../services/getContactInfo'
import Tooltip from '@material-ui/core/Tooltip'
import './styles.css'

function isEvent(ContentType){
      if(ContentType == "leon_livetv_Event"){
            return true
      }

      return false
}

function ReadMore({readMoreActive, Name, Description, handleClickHideReadMore}){

      return (
            <Fragment>
            {     readMoreActive
            ?      <CSSTransition in={readMoreActive} timeout={100} classNames="active" unmountOnExit>
                        <div className="info-channel" tabIndex="0">
                              <div className="content-button-close" tabIndex="0">
                                    <span className="button-close" onClick={handleClickHideReadMore} tabIndex="0">
                                          <i className="fas fa-times" tabIndex="0" />
                                    </span>
                              </div>
                              <h2 className="title" tabIndex="0">{Name}</h2>
                              <h3 className="description" tabIndex="0">{Description}</h3>
                        </div>
                  </CSSTransition>
            :     null
            }
            </Fragment>
      )
}

function ContactInfo({moreInfoActive, contactInfo, handleClickHideMoreInfo}){

      const handleClickFb = () => {
            window.location=`https://www.facebook.com/${contactInfo.ContactFb}`
      }

      const handleClickIg = () => {
            window.location=`https://www.instagram.com/${contactInfo.ContactIG}`
      }

      const handleClickTw = () => {
            window.location=`https://www.twitter.com/${contactInfo.ContactTw}`
      }

      const handleClickGm = () => {
            window.location=`https://www.google.com/maps/place/${replaceString(contactInfo.ContactLoc, ",","+")}`
      }

      return (
            <Fragment>
                  {     moreInfoActive
                  ?     <CSSTransition in={moreInfoActive} timeout={100} classNames="active" unmountOnExit>
                              <div className="info-channel" tabIndex="0">
                                    <div className="content-button-close" tabIndex="0">
                                          <span className="button-close" onClick={handleClickHideMoreInfo} tabIndex="0">
                                                <i className="fas fa-times" tabIndex="0" />
                                          </span>
                                    </div>
                                    <h2 className="title" tabIndex="0">Información de {contactInfo.ContactTitle}</h2>
                                    <h3 className="description" tabIndex="0">{contactInfo.ContactDescription}</h3>
                                    {     contactInfo.ContactFon &&
                                          <div className="content-phone" tabIndex="0">
                                                <i className="fas fa-phone-alt" tabIndex="0"></i>
                                                <p tabIndex="0">{contactInfo.ContactFon}</p>
                                          </div>
                                    }
                                    {     contactInfo.ContactWeb &&
                                          <div className="content-web" tabIndex="0">
                                                <i className="fas fa-globe" tabIndex="0"></i>
                                                <p tabIndex="0">{contactInfo.ContactWeb}</p>
                                          </div>
                                    }
                                    <div className="content-social-media" tabIndex="0">
                                          {     contactInfo.ContactFb &&
                                                <span className="span-icon" tabIndex="0" onClick={handleClickFb}>
                                                      <i className="fab fa-facebook-square" tabIndex="0" />
                                                </span>
                                          }
                                          {     contactInfo.ContactIG &&
                                                <span className="span-icon" tabIndex="0" onClick={handleClickIg}>
                                                      <i className="fab fa-instagram" tabIndex="0" />
                                                </span>
                                          }
                                          {     contactInfo.ContactTw && 
                                                <span className="span-icon" tabIndex="0" onClick={handleClickTw}>
                                                      <i className="fab fa-twitter-square" tabIndex="0" />
                                                </span>
                                          }
                                          {     contactInfo.ContactLoc &&
                                                <span className="span-icon" tabIndex="0" onClick={handleClickGm}>
                                                      <i class="fas fa-map-marker-alt"  tabIndex="0"/>
                                                </span>
                                          }
                                    </div>
                              </div>
                        </CSSTransition>
                  :     null
                  }
            </Fragment>
      )
}

function LiveTvChannel({ dataChannel, handleClick, handleError }) {
      let { Description, Name, Poster, ContactID } = dataChannel
      let imgChannel = useRef(null)
      const [contactInfo, setContactInfo] = useState([])
      const [moreInfoActive, setMoreInfoActive] = useState(false)
      const [readMoreActive, setReadMoreActive] = useState(false)

      const handleClickShowMoreInfo = () => {
            const getInfoContact = async () => {
                  try {
                        const data = await getContactInfo(ContactID)
                        setContactInfo(data)
                        setMoreInfoActive(true)
                  } catch (e) {

                  }
            }

            getInfoContact()
      }

      const handleClickHideMoreInfo = () => {
            setMoreInfoActive(false)
      }

      const handleClickShowReadMore = () => {
            setReadMoreActive(true)
      }

      const handleClickHideReadMore = () => {
            setReadMoreActive(false)
      }

      return (
            <div className="channel" onClick={handleClick}>
                  <div className="channel-content">
                        <div className="title-content">
                              <h2 className="title-channel">
                                    {Name}
                              </h2>
                        </div>
                        <div className="poster-content">
                              <img ref={imgChannel} className="poster-channel" src={Poster} onError={handleError} />
                              <div className="content-play">
                                    <span>
                                          <i className="fas fa-pause"></i>
                                    </span>
                              </div>
                        </div>
                        <div className="description-content">
                              <p className="description-channel">{limitString(Description, 80)}</p>
                        </div>
                        
                        <ContactInfo moreInfoActive={moreInfoActive} contactInfo={contactInfo} handleClickHideMoreInfo={handleClickHideMoreInfo}/>
                        <ReadMore readMoreActive={readMoreActive} Name={Name} Description={Description} handleClickHideReadMore={handleClickHideReadMore}/>

                        <div className="buttons-content" >
                             
                              <Tooltip title="Más info" placement="top-start">
                                    <span tabIndex="0" onClick={handleClickShowMoreInfo}>
                                          <i className="fas fa-info" tabIndex="0" />
                                    </span>
                              </Tooltip>

                              {     isShortString(Description) &&
                                    <Tooltip title="Leer más" placement="top-start">
                                          <span tabIndex="0" onClick={handleClickShowReadMore}>
                                                <i className="fas fa-ellipsis-h" tabIndex="0" />
                                          </span>
                                    </Tooltip>
                              }
                        </div>
                  </div>
            </div>
      )
}

function LiveTvEvent({ dataChannel, handleClick, handleError }) {
      let { Description, Name, Poster, Inicio, Fin, ContactID } = dataChannel
      let description = shortString(Description)
      let imgChannel = useRef(null)
      const [contactInfo, setContactInfo] = useState([])
      const [moreInfoActive, setMoreInfoActive] = useState(false)
      const [readMoreActive, setReadMoreActive] = useState(false)

      const handleClickShowMoreInfo = () => {
            const getInfoContact = async () => {
                  try {
                        const data = await getContactInfo(ContactID)
                        setContactInfo(data)
                        setMoreInfoActive(true)
                  } catch (e) {

                  }
            }

            getInfoContact()
      }

      const handleClickHideMoreInfo = () => {
            setMoreInfoActive(false)
      }

      const handleClickShowReadMore = () => {
            setReadMoreActive(true)
      }

      const handleClickHideReadMore = () => {
            setReadMoreActive(false)
      }

      return (
            <div className="channel" onClick={handleClick}>
                  <div className="channel-content">
                        <div className="title-content">
                              <h2 className="title-channel">
                                    {Name}
                              </h2>
                        </div>
                        <div className="poster-content">
                              <img ref={imgChannel} className="poster-channel" src={Poster} onError={handleError} />
                        </div>
                        {isLive(Inicio, Fin) &&
                              <div className="progress-time-content">
                                    <div className="progress-time-current" style={{ width: getProgressTimeEvent(Inicio, Fin) }}></div>
                              </div>
                        }
                        <div className="event-time-content">
                              <p className="event-time-channel">
                                    <i className="far fa-clock"></i>{getEventTime(Inicio, Fin)}
                              </p>
                              {isLive(Inicio, Fin) &&
                                    <div className="button-live">EN VIVO</div>
                              }
                        </div>
                        <div className="description-content">
                              <p className="description-channel">{description}</p>
                        </div>
                        <ContactInfo moreInfoActive={moreInfoActive} contactInfo={contactInfo} handleClickHideMoreInfo={handleClickHideMoreInfo}/>
                        <ReadMore readMoreActive={readMoreActive} Name={Name} Description={Description} handleClickHideReadMore={handleClickHideReadMore}/>
                        <div className="buttons-content" >
                             
                              <Tooltip title="Más info" placement="top-start">
                                    <span tabIndex="0" onClick={handleClickShowMoreInfo}>
                                          <i className="fas fa-info" tabIndex="0" />
                                    </span>
                              </Tooltip>
                              
                              {     isShortString(Description) &&
                                    <Tooltip title="Leer más" placement="top-start">
                                          <span tabIndex="0" onClick={handleClickShowReadMore}>
                                                <i className="fas fa-ellipsis-h" tabIndex="0" />
                                          </span>
                                    </Tooltip>
                              }
                        </div>
                  </div>
            </div>
      )
}

export function Channel({ data, category, page, categoria }) {
      let href
      let channel
      if(isEvent(data.ContentType)){
            href = `/tv/${createUrlString(category.category)}/${data.Id}`
      }else{
            href = `/tv/${createUrlString(category.category)}/${createUrlString(data.Name)}`
      }
      const { dispatch } = useContext(VideoContext)
      const { dispatchTV } = useContext(LiveTvContext)

      const handleError = (e) => {
            e.nativeEvent.target.src = 'build/assets/images/logos/guiahtv/error-tv-landscape.png'
      }

      const handleClick = (e) => {
            if (e.nativeEvent.target.tabIndex != 0) {
                  dispatch({ type: 'updateData', payload: data })
                  dispatchTV({ type: 'updatePage', payload: page })
                  dispatchTV({ type: 'updateCategory', payload: categoria })
            }
      }

      switch (data.ContentType) {
            case 'leon_livetv_Channel':
                  channel = <LiveTvChannel dataChannel={data} handleClick={handleClick} handleError={handleError} />
                  break
            case 'leon_livetv_Event':
                  channel = <LiveTvEvent dataChannel={data} handleClick={handleClick} handleError={handleError} />
                  break
            case 'leon_livetv_Radio':
                  channel = <LiveTvEvent dataChannel={data} handleClick={handleClick} handleError={handleError} />
                  break
            default:
                  channel = <LiveTvChannel dataChannel={data} handleClick={handleClick} handleError={handleError} />
                  break
      }

      return <NavLink to={href} className="channel-link" activeClassName="active">{channel}</NavLink>
}