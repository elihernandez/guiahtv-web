import React, { useContext, useState, useEffect, useRef, useCallback } from 'react'
import VideoContext from '../../../../context/VideoContext'
import { CSSTransition } from 'react-transition-group'
import Tooltip from '@material-ui/core/Tooltip'
import Slider from '@material-ui/core/Slider'
import './styles.css'

function ButtonFullScreen() {
      const [fullScreen, setFullScreen] = useState(false)

      const toggleFullScreen = () => {
            if (!document.fullscreenElement) {
                  if (!document.fullscreenElement) {
                        document.documentElement.requestFullscreen()
                  } else if (!document.webkitRequestFullscreen) { /* Safari */
                        document.documentElement.webkitRequestFullscreen()
                  } else if (!document.msRequestFullscreen) { /* IE11 */
                        document.documentElement.msRequestFullscreen()
                  }
                  setFullScreen(true)
            } else {
                  if (document.fullscreenElement) {
                        if (document.exitFullscreen) {
                              document.exitFullscreen()
                        } else if (document.webkitExitFullscreen) { /* Safari */
                              document.webkitExitFullscreen()
                        } else if (document.msExitFullscreen) { /* IE11 */
                              document.msExitFullscreen()
                        }
                  }
                  setFullScreen(false)
            }
      }

      const handleClick = () => {
            toggleFullScreen()
      }
      
      useEffect(() => {
            document.addEventListener('dblclick', toggleFullScreen)

            return () => {
                  document.removeEventListener('dblclick', toggleFullScreen)
            }
      }, [])

      return (
            <Tooltip title={fullScreen == true ? "Salir de pantalla completa" : "Pantalla completa"} placement="top-start">
                  <span className="full-screen-icon" onClick={handleClick}>
                        {fullScreen
                              ? <i className="fas fa-compress" />
                              : <i className="fas fa-expand" />
                        }
                  </span>
            </Tooltip>
      )
}

function ButtonVolume() {
      const { state, dispatch } = useContext(VideoContext)
      const { volume } = state

      const handleChange = (event, newValue) => {
            dispatch({ type: 'updateVolume', payload: newValue })
      }

      useEffect(() => {
            document.querySelector('video').volume = (volume / 100)
      }, [volume])

      return (
            <div className="container-volume">
                  <Slider value={volume} onChange={handleChange} aria-labelledby="continuous-slider" />
                  <Tooltip title="Volumen" placement="top-start">
                        <span className="volume-icon">
                              {volume == 0 &&
                                    <i className="fas fa-volume-off"></i>
                              }
                              {volume > 0 && volume < 60 &&
                                    <i className="fas fa-volume-down"></i>
                              }
                              {volume > 60 &&
                                    <i className="fas fa-volume-up"></i>
                              }
                        </span>
                  </Tooltip>
            </div>
      )
}

export function InfoChannel() {
      const { state } = useContext(VideoContext)
      const { dataChannel, activeChannel } = state
      const [name, setName] = useState('')

      useEffect(() => {
            if (activeChannel) setName(dataChannel.Name)
      }, [activeChannel])



      return (
            <CSSTransition in={activeChannel} timeout={100} classNames="active" unmountOnExit>
                  <div className="info-channel">
                        {name &&
                              <div className="info-channel-wrapper">
                                    <div className="title-channel">
                                          <h3 className="text-info">Estás viendo:</h3>
                                          <h2 className="channel-name">{name}</h2>
                                    </div>
                                    <div className="right-section">
                                          <ButtonVolume />
                                          <ButtonFullScreen />
                                    </div>
                              </div>
                        }
                  </div>
            </CSSTransition>
      )
}
