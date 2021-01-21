import React, { useRef, useState, useContext, useEffect, useCallback, Fragment } from 'react'
import { Switch, Route, useRouteMatch } from "react-router-dom"
import { LiveTvContextProvider } from '../../context/LiveTvContext'
import { VideoContextProvider } from '../../context/VideoContext'
// import LiveTvContext  from '../../context/LiveTvContext'
import VideoContext from '../../context/VideoContext'
import { GuideChannels } from './Components/Guide'
import { Video } from './Components/Video'
import { InfoChannel } from './Components/InfoChannel'
import { TimerChannel } from './Components/Timer'
import { LoaderVideo } from './Components/LoaderVideo'
import { CSSTransition } from 'react-transition-group'
import useEventListener from "@use-it/event-listener";
import './styles.css'

function Content({ children, refer }) {
      const contentRef = useRef()
      const { state } = useContext(VideoContext)
      const { activeChannel } = state
      const [isVisible, setIsVisible] = useState(true)
      const timerRef = useRef(null)

      const fadeIn = () => {
            setIsVisible(true)
            document.querySelector('.top-menu').style.opacity = 1
      }

      const fadeOut = () => {
            setIsVisible(false)
            document.querySelector('.top-menu').style.opacity = 0
      }
      
      const handleUserMouseMove = useCallback(() => {
            if(activeChannel){
                  clearTimeout(timerRef.current)
                  timerRef.current = setTimeout(() => fadeOut(), 3000)
                  fadeIn()
            }

            if(!activeChannel){
                  clearTimeout(timerRef.current)
            }
      }, [activeChannel])

      useEffect(() => {
            handleUserMouseMove()
            window.addEventListener('mousemove', handleUserMouseMove)
            return () => {
                  window.removeEventListener('mousemove', handleUserMouseMove)
                  clearTimeout(timerRef.current)
            }
      }, [handleUserMouseMove])

      return (
            <div className="content-tv" ref={contentRef}>
                  <CSSTransition in={isVisible} timeout={300} classNames="active" unmountOnExit>
                        <div className="content-tv-wrapper">
                              {children}
                        </div>
                  </CSSTransition>
            </div>
      )
}

export function LiveTV() {
      const livetvRef = useRef()
      let { url } = useRouteMatch()

      useEffect(() => {
            document.querySelector('.navbar-top-menu').style.opacity = 1
            document.querySelector('.top-menu').classList.add('bggradient')
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
                                          <Content refer={livetvRef}>
                                                <div className="background-overlay" />
                                                <LoaderVideo />
                                                <InfoChannel />
                                                <TimerChannel />
                                                <GuideChannels />
                                          </Content>
                                    </div>
                              </div>
                        </VideoContextProvider>
                  </LiveTvContextProvider>
            </Fragment>
      )
}