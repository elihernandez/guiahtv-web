import React, { Fragment, useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'
import Slider from '@material-ui/core/Slider'
import VideoContext from '../../../../context/VideoContext'
import { exitFullScreen, enterFullScreen, exitHandler } from '../../../../js/Screen'
import { CSSTransition } from 'react-transition-group'
import './styles.css'

function getDurationMovie(duration) {
      let hours = Math.floor(duration / 3600);
      let minutes = Math.floor((duration % 3600) / 60);
      let seconds = Math.floor(duration % 60);

      // Anteponiendo un 0 a los minutos si son menos de 10 
      minutes = minutes < 10 ? '0' + minutes : minutes;
      // Anteponiendo un 0 a los segundos si son menos de 10 
      seconds = seconds < 10 ? '0' + seconds : seconds;

      if (hours < 1) {
            return minutes + ":" + seconds;  // 41:30
      } else {
            return hours + ":" + minutes + ":" + seconds;  // 2:41:30
      }
}

function ProgressBarTime({ videoRef, currentTime, duration, dispatch }) {
      const [value, setValue] = useState(currentTime)

      const handleChange = (event, newValue) => {
            videoRef.current.pause()
            videoRef.current.currentTime = newValue
            videoRef.current.play()
            setValue(newValue)
            dispatch({ type: 'setCurrentTime', payload: newValue })
      }

      useEffect(() => {
            setValue(currentTime)
      }, [currentTime])

      return <Slider value={value} onChange={handleChange} min={0} max={duration} aria-labelledby="continuous-slider" />
}

function TimeMovie({ videoRef, duration, dispatch }) {
      const [actualTime, setActualTime] = useState(null)

      const timeUpdate = () => {
            if(videoRef.current){
                  let hours = Math.floor(videoRef.current.currentTime / 3600);
                  let minutes = Math.floor((videoRef.current.currentTime % 3600) / 60);
                  let seconds = Math.floor(videoRef.current.currentTime % 60);
      
                  // Anteponiendo un 0 a los minutos si son menos de 10 
                  minutes = minutes < 10 ? '0' + minutes : minutes;
                  // Anteponiendo un 0 a los segundos si son menos de 10 
                  seconds = seconds < 10 ? '0' + seconds : seconds;
      
                  if (hours < 1) {
                        setActualTime(minutes + ":" + seconds)
                  } else {
                        setActualTime(hours + ":" + minutes + ":" + seconds)
                  }
      
                  dispatch({ type: 'setCurrentTime', payload: videoRef.current.currentTime })
            }
      }

      useEffect(() => {

            if (videoRef) {
                  videoRef.current.addEventListener("timeupdate", timeUpdate)
            }

            return () => {
                  if (videoRef) {
                        if (videoRef.current) {
                              videoRef.current.removeListener("timeupdate", timeUpdate)
                        }
                  }
            }
      }, [duration])

      return (
            <p>
                  {actualTime
                        ? actualTime
                        : '00:00'
                  }
                  &nbsp;/&nbsp;
                  {duration &&
                        getDurationMovie(duration)
                  }
            </p>
      )
}

function ButtonsPlaying({ videoRef, playing, dispatch }) {
      // const history = useHistory()

      const handleClick = () => {
            // history.goBack()
            if (playing) {
                  videoRef.current.pause()
                  dispatch({ type: 'setPlaying', payload: false })
            } else {
                  videoRef.current.play()
                  dispatch({ type: 'setPlaying', payload: true })
            }
      }

      return (
            <Fragment>
                  {playing
                        ? <Tooltip title="Pausar" placement="top-start">
                              <button type="button" className="content-button-icon" onClick={handleClick}>
                                    <i className="fas fa-pause"></i>
                              </button>
                        </Tooltip>
                        : <Tooltip title="Reanudar" placement="top-start">
                              <button type="button" className="content-button-icon" onClick={handleClick}>
                                    <i className="fas fa-play"></i>
                              </button>
                        </Tooltip>
                  }
            </Fragment>
      )
}

function ButtonUndo({ videoRef }) {

      const handleClick = () => {
            videoRef.current.pause()
            videoRef.current.currentTime = videoRef.current.currentTime - 10
            videoRef.current.play()
            dispatch({ type: 'setCurrentTime', payload: videoRef.current.currentTime - 10 })
      }

      return (
            <Tooltip title="Regresar 10 segundos" placement="top-start">
                  <button type="button" className="content-button-icon" onClick={handleClick}>
                        <i className="fas fa-undo-alt"></i>
                  </button>
            </Tooltip>
      )
}

function ButtonRedo({ videoRef }) {

      const handleClick = () => {
            videoRef.current.pause()
            videoRef.current.currentTime = videoRef.current.currentTime + 10
            videoRef.current.play()
            dispatch({ type: 'setCurrentTime', payload: videoRef.current.currentTime + 10 })
      }

      return (
            <Tooltip title="Adelantar 10 segundos" placement="top-start">
                  <button type="button" className="content-button-icon" onClick={handleClick}>
                        <i className="fas fa-redo-alt"></i>
                  </button>
            </Tooltip>
      )
}

function ButtonBackward({ videoRef }) {

      const handleClick = () => {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
            videoRef.current.play()
            dispatch({ type: 'setCurrentTime', payload: 0 })
      }

      return (
            <Tooltip title="Desde el comienzo" placement="top-start">
                  <button type="button" className="content-button-icon" onClick={handleClick}>
                        <i className="fas fa-step-backward"></i>
                  </button>
            </Tooltip>
      )
}

function ButtonsFullScreen() {
      const [fullScreen, setFullScreen] = useState(false)

      const toggleFullScreen = () => {
            if (!document.fullscreenElement) {
                  enterFullScreen()
                  setFullScreen(true)
            } else {
                  exitFullScreen()
                  setFullScreen(false)
            }
      }

      const handleClick = () => {
            toggleFullScreen()
      }

      useEffect(() => {
            document.addEventListener('fullscreenchange', exitHandler)
            document.addEventListener('webkitfullscreenchange', exitHandler)
            document.addEventListener('mozfullscreenchange', exitHandler)
            document.addEventListener('MSFullscreenChange', exitHandler)

            return () => {
                  document.removeEventListener('dblclick', toggleFullScreen)
                  document.removeEventListener('fullscreenchange', exitHandler)
                  document.removeEventListener('webkitfullscreenchange', exitHandler)
                  document.removeEventListener('mozfullscreenchange', exitHandler)
                  document.removeEventListener('MSFullscreenChange', exitHandler)
            }
      }, [])

      return (
            <Tooltip title={fullScreen == true ? "Salir de pantalla completa" : "Pantalla completa"} placement="top-start">
                  <button type="button" className="content-button-icon" onClick={handleClick}>
                        {fullScreen
                              ? <i className="fas fa-compress" />
                              : <i className="fas fa-expand" />
                        }
                  </button>
            </Tooltip>
      )
}

function ButtonVolume({ volume, muteVolume, dispatch }) {
      const [showVolume, setShowVolume] = useState(false)

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

      const handleOver = () => {
            setShowVolume(true)
      }

      const handleBlur = () => {
            setShowVolume(false)
      }

      useEffect(() => {
            if (muteVolume) {
                  document.querySelector('video').volume = 0
            } else {
                  document.querySelector('video').volume = (volume / 100)
            }
      }, [volume])

      return (
            <Fragment>
                  <CSSTransition in={showVolume} timeout={100} classNames="active" unmountOnExit>
                        <div className="container-volume" onBlur={handleBlur} onMouseLeave={handleBlur}>
                              <Slider
                                    orientation="vertical"
                                    onChange={handleChange}
                                    value={volume}
                                    aria-labelledby="vertical-slider"
                              />
                        </div>
                  </CSSTransition>
                  <Tooltip title="Volumen" placement="top-start">
                        <button type="button" className="content-button-icon" onClick={handleClick} onMouseOver={handleOver}>
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
                        </button>
                  </Tooltip>
            </Fragment>
      )
}

export function Controls() {
      const { stateVideo, dispatch } = useContext(VideoContext)
      const { active, playing, videoRef, currentTime, volume, muteVolume } = stateVideo
      const [duration, setDuration] = useState(null)

      useEffect(() => {
            if (videoRef) {
                  setDuration(videoRef.current.duration)
            }
      }, [active])

      return (
            <div className="controls-player">
                  <div className="controls-wrapper">
                        <div className="top-section">
                              <div className="group-buttons">
                                    <ButtonBackward videoRef={videoRef} />
                                    <ButtonsPlaying videoRef={videoRef} playing={playing} dispatch={dispatch} />
                                    <ButtonUndo videoRef={videoRef} />
                                    <ButtonRedo videoRef={videoRef} />
                              </div>
                              <div className="group-buttons">
                                    <ButtonVolume volume={volume} muteVolume={muteVolume} dispatch={dispatch} />
                                    <ButtonsFullScreen />
                                    <div className="group-time">
                                          <TimeMovie videoRef={videoRef} duration={duration} dispatch={dispatch} />
                                    </div>
                              </div>
                        </div>
                        <div className="content-progress-time">
                              <ProgressBarTime videoRef={videoRef} currentTime={currentTime} duration={duration} dispatch={dispatch} />
                        </div>
                  </div>
            </div>
      )
}