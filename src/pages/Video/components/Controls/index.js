import React, { useState, useContext, useEffect } from 'react'
import { ButtonsPlaying, ButtonUndo, ButtonRedo, ButtonBackward, ButtonsFullScreen, ButtonVolume, ButtonTracks } from '../Buttons'
import Slider from '@material-ui/core/Slider'
import VideoContext from '../../../../context/VideoContext'
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
            if (videoRef.current) {
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
                  dispatch({ type: 'setDuration', payload: videoRef.current.duration })
            }
      }

      useEffect(() => {

            if (videoRef) {
                  videoRef.current.addEventListener("timeupdate", timeUpdate)
            }

            return () => {
                  if (videoRef) {
                        if (videoRef.current != null) {
                              videoRef.current.removeEventListener("timeupdate", timeUpdate)
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

export function Controls() {
      const { stateVideo, dispatch } = useContext(VideoContext)
      const { hls, active, playing, videoRef, currentTime, volume, muteVolume, audioTracks, audioTrackActive, subtitleTracks, subtitleTrackActive } = stateVideo
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
                                    <ButtonUndo videoRef={videoRef} dispatch={dispatch} />
                                    <ButtonRedo videoRef={videoRef} dispatch={dispatch} />
                              </div>
                              <div className="group-buttons">
                                    <ButtonVolume volume={volume} muteVolume={muteVolume} dispatch={dispatch} />
                                    <ButtonTracks hls={hls} audios={audioTracks} subtitles={subtitleTracks} dispatch={dispatch} audioTrackActive={audioTrackActive} subtitleTrackActive={subtitleTrackActive}/>
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