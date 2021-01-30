import React, { useEffect, useState, useContext, useRef} from 'react'
import { LoaderSpinnerMUI } from '../../../../components/Loader' 
import UserContext from '../../../../context/UserContext'
import VideoContext from '../../../../context/VideoContext'
import { getLinkVideoVod } from '../../../../services/getLinkVideoVod'
import { useHls } from '../../../../hooks/useHls'
import { Content } from '../Content'
import './styles.css'

export function Player({state}){
      // console.log(state)
      const video = useRef()
      const { movieVod } = state
      const [url, setUrl] = useState()
      const { stateUser } = useContext(UserContext)
      const { credentials } = stateUser
      const { stateVideo, dispatch } = useContext(VideoContext)
      const { loading } = stateVideo
      const {error, setError} = useHls(video, url, dispatch)

      const onPlayingVideo = () => {
            dispatch({ type: 'updateData', payload: movieVod })
            dispatch({ type: 'updateActive', payload: true })
            dispatch({ type: 'updateLoading', payload: false })
            dispatch({ type: 'setPlaying', payload: true })
      }

      const onWaitingVideo = () => {
            dispatch({ type: 'updateLoading', payload: true })
      }

      const onErrorVideo = () => {
            dispatch({ type: 'updateLoading', payload: false })
            dispatch({ type: 'updateData', payload: null })
            setError("Contenido no disponible por el momento")
      }

      useEffect(() => {
            const requestLink = async () => {
                  dispatch({ type: 'updateVideoRef', payload: video })
                  dispatch({ type: 'updateActive', payload: false })
                  dispatch({ type: 'updateLoading', payload: true})
                  try{
                        const response = await getLinkVideoVod(movieVod, credentials)
                        if(response == "error") throw new Error('No se pudo obtener la información.')
                        const url = response.Url
                        setUrl(url)
                  } catch (e) {
                        dispatch({ type: 'updateLoading', payload: false })
                        dispatch({ type: 'updateData', payload: null })
                        setError(e.message)
                  }
            }

            requestLink()
            return () => {

            }
      }, [])

      return (
            <div className="player">
                  <div className="player-wrapper">
                        <video loop={true} ref={video} preload="auto" onPlaying={onPlayingVideo} onWaiting={onWaitingVideo} onError={onErrorVideo} />
                        {loading &&
                              <LoaderSpinnerMUI />
                        }
                        {     error &&
                              <div className="error-message">
                                    <h2 className="text-error">{error}</h2>
                              </div>
                        }
                        <Content />
                  </div>
            </div>
      )
}