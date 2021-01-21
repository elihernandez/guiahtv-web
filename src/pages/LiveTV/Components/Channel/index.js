import React, { useRef, useContext, useState } from 'react'
import VideoContext from '../../../../context/VideoContext'
import { NavLink } from "react-router-dom"
import { createUrlString } from '../../../../js/String'
import { isLive, getEventTime, getProgressTimeEvent } from '../../../../js/Time'
import { CSSTransition } from 'react-transition-group'
import Tooltip from '@material-ui/core/Tooltip';
const moment = require('moment')
import './styles.css'

function shortString(string) {
      if (string.length > 60) {
            string = string.substring(0, 60)
            string = string + "..."
      }

      return string
}

function isShortString(string){
      if (string.length > 60) {
            return true
      }

      return false
}

function LiveTvChannel({ dataChannel, handleClick, handleError }) {
      let {  Description, Name, Poster } = dataChannel
      let description = shortString(Description)
      let imgChannel = useRef(null)

      const [infoActive, setInfoActive] = useState(false)

      const handleClickShowInfo = () => {
            setInfoActive(true)
      }

      const handleClickHideInfo = () => {
            setInfoActive(false)
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
                              <p className="description-channel">{description}</p>
                        </div>
                       
                        <CSSTransition in={infoActive} timeout={100} classNames="active" unmountOnExit>
                              <div className="info-channel">
                                    <div className="content-button-close">
                                          <span className="button-close" onClick={handleClickHideInfo}>
                                                <i className="fas fa-times"></i>
                                          </span>
                                    </div>
                                    <h2 className="title">{Name}</h2>
                                    <h3 className="description">{Description}</h3>
                                    <div className="content-phone">
                                          <i className="fas fa-phone-alt"></i> 
                                          <p>+1(718)205-1209</p>
                                    </div>
                                    <div className="content-web">
                                          <i className="fas fa-globe"></i>
                                          <p>www.canalluz.com</p>
                                    </div>
                                    <div className="content-social-media">
                                          <span className="span-icon"><i class="fab fa-facebook-square"></i></span>
                                          <span className="span-icon"><i class="fab fa-instagram"></i></span>
                                          <span className="span-icon"><i class="fab fa-twitter-square"></i></span>
                                    </div>
                              </div>
                        </CSSTransition>
                     
                        {
                              isShortString(Description) &&
                              <div className="buttons-content" onClick={handleClickShowInfo}>
                                    <Tooltip title="Más info" placement="top-start">
                                          <span><i className="fas fa-ellipsis-h"></i></span>
                                    </Tooltip>
                              </div>
                        }
                  </div>
            </div>
      )
}

function LiveTvEvent({ dataChannel, handleClick, handleError }) {
      let {  Description, Name, Poster, Inicio, Fin } = dataChannel
      let description = shortString(Description)
      let imgChannel = useRef(null)

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
                        {     isLive(Inicio, Fin) &&
                              <div className="progress-time-content">
                                    <div className="progress-time-current" style={{width: getProgressTimeEvent(Inicio, Fin)}}></div>
                              </div>
                        }
                        <div className="event-time-content">
                              <p className="event-time-channel">
                                    <i className="far fa-clock"></i>{getEventTime(Inicio, Fin)}
                              </p>
                              {     isLive(Inicio, Fin) &&
                                    <div className="button-live">EN VIVO</div>
                              }
                        </div>
                        <div className="description-content">
                              <p className="description-channel">{description}</p>
                        </div>
                        {
                              isShortString(Description) &&
                              <div className="buttons-content">
                                    <span><i className="fas fa-ellipsis-h"></i></span>
                              </div>
                        }
                  </div>
            </div>
      )
}

export function Channel({ data, category }) {
      let channel
      let href = `/tvenvivo/${createUrlString(category.category)}/${createUrlString(data.Name)}`
      const { dispatch } = useContext(VideoContext)

      const handleError = (e) => {
            e.nativeEvent.target.src = 'build/assets/images/logos/guiahtv/error-tv-landscape.png'
      }

      const handleClick = () => {
            dispatch({ type: 'updateData', payload: data })
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
      }

      return <NavLink to={href} className="channel-link" activeClassName="active">{channel}</NavLink>
}