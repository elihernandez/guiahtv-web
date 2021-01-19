import React, { useRef, useState, useEffect, Fragment } from 'react'
import { Switch, Route, useRouteMatch } from "react-router-dom"
import { LiveTvContextProvider } from '../../context/LiveTvContext'
import { VideoContextProvider } from '../../context/VideoContext'
import { GuideChannels} from './Components/Guide'
import { Video } from './Components/Video'
// import { CSSTransition } from 'react-transition-group';
// const cssTransition = require('css-transition')
import { fadeOutElement, fadeInElement } from '../../js/Transition/index'
import { CSSTransition } from 'react-transition-group'
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import './styles.css'

// function fadeOut({current}){
//       console.log(current)
//       cssTransition(current, {
//             backgroundColor: 'red'
//       }, 300, function () {
//             console.log('finalizando')
//       })
// }


// function fadeIn(){
//       cssTransition(element.current, {
//             opacity: 1,
//       }, 300, function () {
//       })
// }

function InfoChannel(){ return null }

export function LiveTV() {
      const livetvRef = useRef()
      const contentRef = useRef()
      const [isVisible, setIsVisible] = useState(false)
      let { url } = useRouteMatch()
      
      useEffect(() => {
            document.querySelector('.navbar-top-menu').style.opacity = 1
            setIsVisible(true)
      }, [])

      return (
            <Fragment>
                  <LiveTvContextProvider>
                        <VideoContextProvider>
                              <div className="wrapper-livetv" ref={livetvRef}>
                                    <div className="section-content w-padding-top">
                                          <Switch>
                                                <Route path={`${url}/:categoria?/:canal?`} >
                                                      <Video />
                                                </Route>
                                          </Switch>
                                          <Fade in={isVisible}>
                                                <div className="content-tv" ref={contentRef}>
                                                      <InfoChannel />
                                                      <GuideChannels />
                                                </div>
                                          </Fade>
                                    </div>
                              </div>
                        </VideoContextProvider>
                  </LiveTvContextProvider>
            </Fragment>
      )
}