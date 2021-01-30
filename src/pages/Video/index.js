import React, { useEffect } from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { Player } from './components/Player'
import { VideoContextProvider } from '../../context/VideoContext'
import './styles.css'

const initialState = {
      videoRef: null,
      data: null,
      active: false,
      loading: false,
      timer: false,
      activeTimer: false,
      currentTime: 0,
      volume: 50,
      playing: false,
      muteVolume: false
}

const reducer = (state, action) => {
      switch (action.type) {
            case 'updateVideoRef': {
                  return {
                        ...state,
                        videoRef: action.payload,
                  }
            }
            case 'updateData': {
                  return {
                        ...state,
                        data: action.payload,
                        timer: false,
                        activeTimer: false
                  }
            }
            case 'updateActive': {
                  return {
                        ...state,
                        active: action.payload,
                  }
            }
            case 'updateLoading': {
                  return {
                        ...state,
                        loading: action.payload,
                  }
            }
            case 'updateTimer': {
                  return {
                        ...state,
                        timer: action.timer,
                        activeTimer: action.active,
                        data: null,
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
            case 'setCurrentTime': {
                  return {
                        ...state,
                        currentTime: action.payload
                  }
            }
            case 'setPlaying': {
                  return {
                        ...state,
                        playing: action.payload
                  }
            }
            default: return state;
      }
}

export function VideoVod({ state }) {
      const history = useHistory()
      const { url } = useRouteMatch()
      const { movieVod } = state

      if (!movieVod) {
            history.push(url.replace('/video', ''))
      }

      useEffect(() => {
            document.querySelector('.top-menu').style.opacity = 0
            return () => {
                  document.querySelector('.top-menu').style.opacity = 1
            }
      }, [])

      return (
            <VideoContextProvider state={initialState} reducer={reducer}>
                  <div className="video">
                        <div className="video-wrapper">
                              <Player state={state}/>
                        </div>
                  </div>
            </VideoContextProvider>
      )
}