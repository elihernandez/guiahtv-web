import React, { Fragment, useRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'
import Slider from '@material-ui/core/Slider'
import { exitFullScreen, enterFullScreen, exitHandler } from '../../../../js/Screen'
import { CSSTransition } from 'react-transition-group'
import Popover from '@material-ui/core/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { capitalizeFirstLetter } from '../../../../js/String'

export function ButtonsPlaying({ videoRef, playing, dispatch }) {
      const history = useHistory()
      const togglePlaying = () => {
            if (playing) {
                  videoRef.current.pause()
                  dispatch({ type: 'setPlaying', payload: false })
            } else {
                  videoRef.current.play()
                  dispatch({ type: 'setPlaying', payload: true })
            }
      }

      const handleClickContent = (e) => {
            if(e.target == document.querySelector('.content-video')){
                  togglePlaying()
            }
      }

      const handleClick = () => {
            // history.goBack()
            togglePlaying()
      }

      useEffect(() => {
            document.querySelector('.video').addEventListener('click', handleClickContent)
            
            return () => {
                  document.querySelector('.video').removeEventListener('click', handleClickContent)
            }
      }, [playing])

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

export function ButtonUndo({ videoRef }) {

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

export function ButtonRedo({ videoRef }) {

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

export function ButtonBackward({ videoRef }) {

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

export function ButtonsFullScreen() {
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
            document.querySelector('.video').addEventListener('dblclick', toggleFullScreen)

            return () => {
                  document.removeEventListener('fullscreenchange', exitHandler)
                  document.removeEventListener('webkitfullscreenchange', exitHandler)
                  document.removeEventListener('mozfullscreenchange', exitHandler)
                  document.removeEventListener('MSFullscreenChange', exitHandler)
                  document.querySelector('.video').addEventListener('dblclick', toggleFullScreen)
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

export function ButtonVolume({ volume, muteVolume, dispatch }) {
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

function ItemTrack({ data, index, handleClick }) {
      const { id, name } = data 
      const className = data.default == true ? "track-item active" : "track-item" 

      return <li key={id} className={className} onClick={(e) => handleClick(e, index)}>{capitalizeFirstLetter(name)} <i className="fas fa-check" /></li>
}

function AudioTracks({ hls, audios }) {
      const listAudiosRef = useRef(null)
      const { audioTracks } = audios

      const toogleClassActive = (elem, list) => {
            for (var i = 0; i < list.children.length; i++) {
                  if (list.children[i].classList.contains('active')) {
                        list.children[i].classList.remove('active')
                  }
            }
            elem.classList.add('active')
      }

      const changeAudioTrack = (e, id) => {
            hls.audioTrack = id
            toogleClassActive(e.currentTarget, listAudiosRef.current)
      }

      return (
            <Fragment>
                  {audios
                        ? <ul className="list-tracks" ref={listAudiosRef}>
                              {
                                    audioTracks.map((data, index) => {
                                          return <ItemTrack key={data.id} data={data} index={index} handleClick={changeAudioTrack}/>
                                    })
                              }
                        </ul>
                        : <p>No hay audios disponibles</p>
                  }
            </Fragment>
      )
}

function SubtitleTracks({ hls, subtitles }) {
      const listSubtitlesRef = useRef(null)
      const { subtitleTracks } = subtitles

      const toogleClassActive = (elem, list) => {
            for (var i = 0; i < list.children.length; i++) {
                  if (list.children[i].classList.contains('active')) {
                        list.children[i].classList.remove('active')
                  }
            }
            elem.classList.add('active')
      }

      const changeSubtitleTrack = (e, id) => {
            hls.subtitleTrack = id
            toogleClassActive(e.currentTarget, listSubtitlesRef.current)
      }

      return (
            <Fragment>
                  {subtitles
                        ? <ul className="list-tracks" ref={listSubtitlesRef}>
                              <li className="track-item active" onClick={(e) => changeSubtitleTrack(e, -1)}>Desactivados <i className="fas fa-check" /></li>
                              {
                                    subtitleTracks.map((data, index) => {
                                          return <ItemTrack key={data.id} data={data} index={index} handleClick={changeSubtitleTrack}/>
                                    })
                              }
                        </ul>
                        : <p>No hay subtítulos disponible</p>
                  }
            </Fragment>
      )
}

export function ButtonTracks({ hls, audios, subtitles }) {
      const [anchorEl] = useState(null)
      const open = Boolean(anchorEl)
      const id = open ? 'transitions-popper' : undefined

      return (
            <Fragment>
                  <PopupState variant="popover" popupId="demo-popup-popover">
                        {(popupState) => (
                              <div>
                                    <Tooltip title="Audios / Subtítulos" placement="top-start">
                                          <button aria-describedby={id} type="button" className="content-button-icon" {...bindTrigger(popupState)}>
                                                <img src="src/assets/icons/audios-subs.png" />
                                          </button>
                                    </Tooltip>
                                    <Popover
                                          {...bindPopover(popupState)}
                                          anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                          }}
                                          transformOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                          }}
                                    >
                                          <div className="tracks-content">
                                                <div className="audios-content">
                                                      <h4 className="name-list">Audios</h4>
                                                      <AudioTracks hls={hls} audios={audios} />
                                                </div>
                                                <div className="subtitles-content">
                                                      <h4 className="name-list">Subtítulos</h4>
                                                      <SubtitleTracks hls={hls} subtitles={subtitles} />
                                                </div>
                                          </div>
                                    </Popover>
                              </div>
                        )}
                  </PopupState>
            </Fragment>
      )
}