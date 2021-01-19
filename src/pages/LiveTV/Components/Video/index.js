import React, { useState, useContext, useEffect, useRef } from 'react'
import { useParams } from "react-router-dom"
import VideoContext from '../../../../context/VideoContext'
import UserContext from '../../../../context/UserContext'
import LiveTvContext from '../../../../context/LiveTvContext'
import { getVideo } from '../../../../services/getVideo'
import { useHls } from '../../../../hooks/useHls'
import { LoaderSpinner } from '../../../../components/Loader/index'
import { getLiveTV } from '../../../../services/getLiveTV'
import { createUrlString } from '../../../../js/String'
import './styles.css'

export function Video() {
      let { categoria, canal } = useParams()
      const { videoData, setVideoData } = useContext(VideoContext)
      let { data } = useContext(LiveTvContext)
      const { userAuth } = useContext(UserContext)
      const [loading, setLoading] = useState()
      const [url, setUrl] = useState()
      const video = useRef()
      const {error} = useHls(video, url)

      const onPlayingVideo = () => {
            setLoading(false)
      }

      const onWaitingVideo = () => {
            setLoading(true)
      }

      const onErrorVideo = () => {
            console.log("error video")
      }

      useEffect(() => {
            // if(data.data.length == 0){
            //       const requestData = async () => {
            //             try {
            //                   const response = await getLiveTV(userAuth)
            //                   if (!response.length) throw new Error('No se pudo obtener la información.')
            //                   response.map(({category, cmData}) => {
            //                         if(createUrlString(category) == categoria){
            //                              cmData.map((dataChannel) => {
            //                                     if(createUrlString(dataChannel.Name) == canal){
            //                                           data = response
            //                                           setVideoData(dataChannel)
                                                      
            //                                           // console.log("Hola")
            //                                           // const response = getVideo(dataChannel, userAuth)
            //                                           // const url = response.Url
            //                                           // setUrl(url)
            //                                     }

            //                              })
            //                         }
            //                   })
            //             } catch (e) {
            //                   console.log(e)
            //             }
            //       }

            //       requestData()
            // }

            if (videoData) {
                  setLoading(true)
                  const requestVideo = async () => {
                        try {
                              const response = await getVideo(videoData, userAuth)
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
      }, [userAuth, videoData])

      return (
            <div className="video">
                  <div className="video-wrapper">
                        <video loop={true} ref={video} onPlaying={onPlayingVideo} onWaiting={onWaitingVideo} onError={onErrorVideo} />
                        {     loading && !error
                        ?     <div className="content-loader">
                                    <LoaderSpinner color="blue" />
                              </div>
                        :     ""
                        }
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