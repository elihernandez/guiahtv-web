import React, { useEffect, useState, useContext, useRef} from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { LoaderSpinnerMUI } from '../../components/Loader'
import UserContext from '../../context/UserContext'
import VideoContext from '../../context/VideoContext'
import { VideoContextProvider } from '../../context/VideoContext'
import { getLinkVideoVod } from '../../services/getLinkVideoVod'
import { useHls } from '../../hooks/useHls'

const initialState = {
      data: null,
      active: false,
      loading: false,
      timer: false,
      activeTimer: false,
      volume: 50,
      muteVolume: false
}

const reducer = (state, action) => {
      switch (action.type) {
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
            default: return state;
      }
}

function Player({state}){
      console.log(state)
      const video = useRef()
      const { movieVod } = state
      const [url, setUrl] = useState()
      const { stateUser } = useContext(UserContext)
      const { credentials } = stateUser
      const { stateVideo, dispatch } = useContext(VideoContext)
      const {error, setError} = useHls(video, url, dispatch)

      useEffect(() => {

            const requestLink = async () => {
                  try{
                        const response = await getLinkVideoVod(movieVod, credentials)
                        if(response == "error") throw new Error('No se pudo obtener la información.')
                        const url = response.Url
                        setUrl(url)
                  }catch(e){

                  }
            }

            requestLink()
            return () => {

            }
      }, [])

      return (
            <div className="video">
                  <div className="video-wrapper">
                        <video loop={true} ref={video} preload="auto" />
                  </div>
            </div>
      )
}

export function VideoVod({ state }) {
      const history = useHistory()
      const { url } = useRouteMatch()
      const { movieVod } = state

      if (!movieVod) {
            history.push(url.replace('/video', ''))
      }

      return (
            <VideoContextProvider state={initialState} reducer={reducer}>
                  <Player state={state}/>
            </VideoContextProvider>
      )
}