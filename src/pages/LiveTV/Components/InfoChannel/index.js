import React, { useContext, useState, useEffect } from 'react'
import VideoContext from '../../../../context/VideoContext'
import { CSSTransition } from 'react-transition-group'
import Tooltip from '@material-ui/core/Tooltip'
import Slider from '@material-ui/core/Slider'
import screenfull, { changeFullScreen, toggleFullScreen } from '../../../../js/Screen'
import './styles.css'

function ButtonFullScreen() {
      const [fullScreen, setFullScreen] = useState(false)

      const handleClick = () => {
            toggleFullScreen()
            setFullScreen(!fullScreen)
      }

      const handleChange = () => {
            if (screenfull.isFullscreen) {
                  setFullScreen(true)
            }else{
                  setFullScreen(false)
            }
      }

      useEffect(() => {
            changeFullScreen()
            document.addEventListener('dblclick', handleClick)
            screenfull.on('change', handleChange)

            return () => {
                  document.removeEventListener('dblclick', handleClick)
                  changeFullScreen()
                  screenfull.on('change', handleChange)
            }
      }, [])

      return (
            <Tooltip title={fullScreen ? "Salir de pantalla completa" : "Pantalla completa"} placement="top-start">
                  <span className="full-screen-icon icon" onClick={handleClick}>
                        {fullScreen
                              ? <i className="fas fa-compress" />
                              : <i className="fas fa-expand" />
                        }
                  </span>
            </Tooltip>
      )
}

function ButtonVolume() {
      const { stateVideo, dispatch } = useContext(VideoContext)
      const { volume, muteVolume } = stateVideo

      const handleChange = (event, newValue) => {
            dispatch({ type: 'updateVolume', payload: newValue })
            dispatch({ type: 'muteVolume', payload: false })
      }

      const handleClick = () => {
            if (!muteVolume) {
                  dispatch({ type: 'muteVolume', payload: true })
                  document.querySelector('video').volume = 0
            } else {
                  dispatch({ type: 'muteVolume', payload: false })
                  document.querySelector('video').volume = (volume / 100)
            }
      }

      useEffect(() => {
            if(muteVolume){
                  document.querySelector('video').volume = 0
            }else{
                  document.querySelector('video').volume = (volume / 100)
            }
      }, [volume])

      return (
            <div className="container-volume">
                  <Slider value={volume} onChange={handleChange} aria-labelledby="continuous-slider" />
                  <Tooltip title="Volumen" placement="top-start">
                        <span className="volume-icon icon" onClick={handleClick}>
                              {muteVolume &&
                                    <i className="fas fa-volume-mute"></i>
                              }
                              {volume == 0 && !muteVolume &&
                                    <i className="fas fa-volume-off"></i>
                              }
                              {volume > 0 && volume <= 60 && !muteVolume &&
                                    <i className="fas fa-volume-down"></i>
                              }
                              {volume > 60 && !muteVolume &&
                                    <i className="fas fa-volume-up"></i>
                              }
                        </span>
                  </Tooltip>
            </div>
      )
}

export function InfoChannel({ setShowTopMenu }) {
      const { stateVideo } = useContext(VideoContext)
      const { dataChannel, activeChannel } = stateVideo
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
                                    <div className="right-buttons">
                                          <ButtonVolume />
                                          <ButtonFullScreen />
                                    </div>
                              </div>
                        }
                  </div>
            </CSSTransition>
      )
}
