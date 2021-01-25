import React, { useRef, useState, useContext, useEffect, useCallback } from 'react'
import { Switch, Route, useRouteMatch } from "react-router-dom"
import { LiveTvContextProvider } from '../../context/LiveTvContext'
import { VideoContextProvider } from '../../context/VideoContext'
import VideoContext from '../../context/VideoContext'
import { GuideChannels } from './Components/Guide'
import { Video } from './Components/Video'
import { InfoChannel } from './Components/InfoChannel'
import { TimerChannel } from './Components/Timer'
import { LoaderVideo } from './Components/LoaderVideo'
import { CSSTransition } from 'react-transition-group'
import { exitFullScreen, isFullScreenElement } from '../../js/Screen'
import './styles.css'

function Content({ children }) {
      const contentRef = useRef()
      const timerRef = useRef(null)
      const { stateVideo } = useContext(VideoContext)
      const { activeChannel } = stateVideo
      const [isVisible, setIsVisible] = useState(true)

      const fadeInContent = () => {
            setIsVisible(true)
            document.querySelector('.top-menu').style.opacity = 1
      }

      const fadeOutContent = () => {
            setIsVisible(false)
            document.querySelector('.top-menu').style.opacity = 0
      }

      const handleUserMouseMove = useCallback(() => {
            if (activeChannel) {
                  clearTimeout(timerRef.current)
                  timerRef.current = setTimeout(() => fadeOutContent(), 3000)
                  fadeInContent()
            } else {
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
      let { url } = useRouteMatch()

      useEffect(() => {
            document.querySelector('.navbar-top-menu').style.opacity = 1
            document.querySelector('.top-menu').classList.add('bggradient')

            return () => {
                  document.querySelector('.navbar-top-menu').style.opacity = 0
                  document.querySelector('.top-menu').classList.remove('bggradient')
                  if(isFullScreenElement()) exitFullScreen()
            }
      }, [])

      return (
            <div className="wrapper-livetv">
                  <LiveTvContextProvider>
                        <VideoContextProvider>
                              <div className="section-content w-padding-top">
                                    <Content>
                                          <div className="background-overlay" />
                                          <LoaderVideo />
                                          <InfoChannel />
                                          <TimerChannel />
                                          <GuideChannels />
                                    </Content>
                                    <Switch>
                                          <Route path={`${url}/:categoria?/:canal?`} >
                                                <Video />
                                          </Route>
                                    </Switch>
                              </div>
                        </VideoContextProvider>
                  </LiveTvContextProvider>
            </div>
      )
}