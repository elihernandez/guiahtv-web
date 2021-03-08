import React, { useRef, useState, useContext, useEffect, useCallback } from 'react'
import { Switch, Route, useRouteMatch } from "react-router-dom"
import ReactCursorPosition from 'react-cursor-position'
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
      let positionX = useRef(0)
      let positionY = useRef(0)
      const contentRef = useRef()
      const timerRef = useRef(null)
      const { stateVideo } = useContext(VideoContext)
      const { activeChannel } = stateVideo
      const [isVisible, setIsVisible] = useState(true)
      // const [clientX, setClientX] = useState(0)
      // const [clientY, setClientY] = useState(0)

      const fadeInContent = () => {
            // setIsVisible(true)
            document.querySelector('.top-menu').style.opacity = 1
            document.body.style.cursor = ''
      }

      const fadeOutContent = () => {
            // positionX.current = clientX
            // positionY.current = clientY
            // setIsVisible(false)
            document.querySelector('.top-menu').style.opacity = 0
            document.body.style.cursor = 'none'
      }

      const handleUserMouseMove = useCallback(() => {
            if (activeChannel) {
                  clearTimeout(timerRef.current)
                  timerRef.current = setTimeout(() => fadeOutContent(), 10000)
                  fadeInContent()
            } else {
                  clearTimeout(timerRef.current)
            }
      }, [activeChannel])

      const handleClick = (e) => {       
            if (e.target == document.querySelector('.background-overlay') ||
                  e.target == document.querySelector('.info-channel-wrapper') ||
                  e.target == document.querySelector('.info-channel') ||
                  e.target == document.querySelector('.text-info') ||
                  e.target == document.querySelector('.channel-name') ||
                  e.target == document.querySelector('.navbar-list')
            ) {
                  if (isVisible && activeChannel) {
                        clearTimeout(timerRef.current)
                        fadeOutContent()
                  } else {
                        clearTimeout(timerRef.current)
                        timerRef.current = setTimeout(() => fadeOutContent(), 10000)
                        fadeInContent()
                  }
            }
      }

      // const handleMove = (e) => {
      //       // console.log(clientX,clientY)
      //       setClientX(e.clientX)
      //       setClientY(e.clientY)
      //       console.log(positionX.current, positionY.current)
      // }

      useEffect(() => {
            handleUserMouseMove()
            document.addEventListener('mousemove', handleUserMouseMove)
            contentRef.current.addEventListener('click', handleClick)
            
            return () => {
                  document.removeEventListener('mousemove', handleUserMouseMove)
                  contentRef.current.removeEventListener('click', handleClick)
                  clearTimeout(timerRef.current)
            }
      }, [handleUserMouseMove, positionX, positionY])

      // useEffect(() => {
      //       window.addEventListener('mousemove', handleMove)

      //       return () => {
      //             window.removeEventListener('mousemove', handleMove)
      //       }
      // }, [handleUserMouseMove])

      return (
            <div className="content-tv" ref={contentRef}>
                  <CSSTransition in={isVisible} timeout={300} classNames="fade" unmountOnExit>
                        <div className="content-tv-wrapper">
                              {children}
                        </div>
                  </CSSTransition>
            </div>
      )
}

export function LiveTV() {
      let { url } = useRouteMatch()
      const initialState = {
            dataChannel: null,
            activeChannel: false,
            loadingChannel: false,
            timerChannel: false,
            activeTimer: false,
            volume: 50,
            muteVolume: false,
            fullScreen: false
      }

      const reducer = (state, action) => {
            switch (action.type) {
                  case 'updateData': {
                        return {
                              ...state,
                              dataChannel: action.payload,
                              timerChannel: false,
                              activeTimer: false
                        }
                  }
                  case 'updateActive': {
                        return {
                              ...state,
                              activeChannel: action.payload,
                        }
                  }
                  case 'updateLoading': {
                        return {
                              ...state,
                              loadingChannel: action.payload,
                        }
                  }
                  case 'updateTimer': {
                        return {
                              ...state,
                              timerChannel: action.timer,
                              activeTimer: action.active
                        }
                  }
                  case 'updateVolume': {
                        return {
                              ...state,
                              volume: action.payload
                        }
                  }
                  case 'muteVolume': {
                        return {
                              ...state,
                              muteVolume: action.payload
                        }
                  }
                  case 'setFullScreen': {
                        return {
                              ...state,
                              fullScreen: action.payload
                        }
                  }
                  default: return state;
            }
      }

      useEffect(() => {
            document.querySelector('.navbar-top-menu').style.opacity = 1
            document.querySelector('.top-menu').classList.add('bggradient')

            return () => {
                  document.querySelector('.navbar-top-menu').style.opacity = 0
                  document.querySelector('.top-menu').classList.remove('bggradient')
                  if (isFullScreenElement()) exitFullScreen()
            }
      }, [])

      return (
            <div className="wrapper-livetv">
                  <LiveTvContextProvider>
                        <VideoContextProvider state={initialState} reducer={reducer}>
                              <div className="section-content w-padding-top">
                                    <ReactCursorPosition>
                                          <Content>
                                                <div className="background-overlay" />
                                                <LoaderVideo />
                                                <InfoChannel />
                                                <TimerChannel />
                                                <GuideChannels />
                                          </Content>
                                    </ReactCursorPosition>
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