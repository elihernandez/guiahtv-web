import React, { useState, useContext, useEffect, useRef } from 'react'
import VideoContext from '../../../../context/VideoContext'
import UserContext from '../../../../context/UserContext'
// import LiveTvContext from '../../../../context/LiveTvContext'
import { getVideo } from '../../../../services/getVideo'
import { useHls } from '../../../../hooks/useHls'
import { isLive } from '../../../../js/Time'
// import { getLiveTV } from '../../../../services/getLiveTV'
// import { createUrlString } from '../../../../js/String'
import './styles.css'

export function Video() {
      // let { data } = useContext(LiveTvContext)
      const video = useRef()
      const [url, setUrl] = useState()
      const { userAuth } = useContext(UserContext)
      const { state, dispatch } = useContext(VideoContext)
      const { dataChannel, timerChannel } = state
      const {error, setError} = useHls(video, url, dispatch)

      const onPlayingVideo = () => {
            dispatch({ type: 'updateActive', payload: true })
            dispatch({ type: 'updateLoading', payload: false })
      }

      const onWaitingVideo = () => {
            dispatch({ type: 'updateLoading', payload: true })
      }

      const onErrorVideo = () => {
            dispatch({ type: 'updateLoading', payload: false })
            dispatch({ type: 'updateData', payload: null })
            setError("Señal no disponible por el momento")
      }

      useEffect(() => {
            if (dataChannel) {
                  const requestVideo = async () => {
                        dispatch({ type: 'updateActive', payload: false })
                        dispatch({ type: 'updateLoading', payload: true })
                        setUrl(null)
                        try {
                              const response = await getVideo(dataChannel, userAuth)
                              if(response == "error") throw new Error('No se pudo obtener la información.')
                              const url = response.Url
                              setUrl(url)
                        } catch (e) {
                              dispatch({ type: 'updateLoading', payload: false })
                              dispatch({ type: 'updateData', payload: null })
                              setError(e.message)
                        }
                  }

                  switch (dataChannel.ContentType) {
                        case 'leon_livetv_Channel':
                              requestVideo()
                              break
                        case 'leon_livetv_Event':
                              if(isLive(dataChannel.Inicio, dataChannel.Fin)){
                                    requestVideo()
                              }else{
                                    setUrl(null)
                                    dispatch({ type: 'updateActive', payload: false })
                                    dispatch({ type: 'updateLoading', payload: true })
                                    setTimeout(() => {
                                          dispatch({ type: 'updateLoading', payload: false })
                                          dispatch({ type: 'updateTimer', active: true, timer: dataChannel })
                                    }, 1000)
                              }
                              break
                        case 'leon_livetv_Radio':
                              requestVideo()
                              break
                  }
            }

            return () => {

            }
      }, [userAuth, dataChannel])

      return (
            <div className="video">
                  <div className="video-wrapper">
                        <video loop={true} ref={video} onPlaying={onPlayingVideo} onWaiting={onWaitingVideo} onError={onErrorVideo} />
                        {     error &&
                              <div className="error-message">
                                    <h1>{error}</h1>
                              </div>
                        }
                        {     state.activeTimer &&
                              <div className="preview-poster">
                                    <img  src={timerChannel.PreviewPoster}/>
                              </div>
                        }
                  </div>
            </div>
      )
}

// {     state.activeTimer &&
//       <div className="preview-poster">
//             <img />
//       </div>
// }