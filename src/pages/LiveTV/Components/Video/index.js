import React, { useState, useContext, useEffect, useRef } from 'react'
import VideoContext from '../../../../context/VideoContext'
import UserContext from '../../../../context/UserContext'
import LiveTvContext from '../../../../context/LiveTvContext'
import { getVideo } from '../../../../services/getVideo'
import { useHls } from '../../../../hooks/useHls'
// import { getLiveTV } from '../../../../services/getLiveTV'
// import { createUrlString } from '../../../../js/String'
import './styles.css'

export function Video() {
      let { data } = useContext(LiveTvContext)
      const { state, dispatch } = useContext(VideoContext)
      const { dataChannel } = state
      const { userAuth } = useContext(UserContext)
      const [url, setUrl] = useState()
      const video = useRef()
      const {error} = useHls(video, url)

      const onPlayingVideo = () => {
            dispatch({ type: 'updateActive', payload: true })
            dispatch({ type: 'updateLoading', payload: false })
      }

      const onWaitingVideo = () => {
            dispatch({ type: 'updateLoading', payload: true })
      }

      const onErrorVideo = () => {
            console.log("error video")
      }

      useEffect(() => {
            if (dataChannel) {
                  dispatch({ type: 'updateActive', payload: false })
                  dispatch({ type: 'updateLoading', payload: true })
                  const requestVideo = async () => {
                        try {
                              const response = await getVideo(dataChannel, userAuth)
                              const url = response.Url
                              setUrl(url)
                              // if(!response.length) throw new Error('No se pudo obtener la información.')
                        } catch (e) {
                              console.log(e)
                        }
                  }

                  requestVideo()
            }

            return () => {

            }
      }, [userAuth, dataChannel])

      return (
            <div className="video">
                  <div className="video-wrapper">
                        <video loop={true} ref={video} onPlaying={onPlayingVideo} onWaiting={onWaitingVideo} onError={onErrorVideo} />
                        {     error
                              ?     <div className="error-message">
                                          <h1>{error}</h1>
                                    </div>
                              :     ""
                        }
                  </div>
            </div>
      )
}