import React, { Fragment, useState, useContext, useEffect, useRef } from 'react'
import VideoContext from '../../../../context/VideoContext'
import UserContext from '../../../../context/UserContext'
import { getVideo } from '../../../../services/getVideo'
import { LoaderSpinner } from '../../../../components/Loader/index'

export function Video() {
      let hls = new Hls()
      const { videoData } = useContext(VideoContext)
      const { userAuth } = useContext(UserContext)
      const [videoActive, setVideoActive] = useState()
      console.log(videoActive)
      const video = useRef()
      const loader = useRef()

      const onPlayingVideo = () => {
            loader.current.style.display = "none"
      }

      const onWaitingVideo = () => {
            loader.current.style.display = ""
      }

      useEffect(() => {
            if (videoData) {
                  console.log(videoData)
                 
                  const requestVideo = async () => {
                        try {
                              const response = await getVideo(videoData, userAuth)
                              setVideoActive(true)
                              const url = response.Url
                              if (Hls.isSupported()) {
                                    hls = new Hls();
                                    hls.attachMedia(video.current);
                                    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                                          hls.loadSource(url)
                                          hls.on(Hls.Events.MANIFEST_PARSED, function () {
                                                video.current.play()
                                          })
                                    })
                              }


                              // if(!response.length) throw new Error('No se pudo obtener la información.')
                        } catch (e) {
                              console.log(e)
                        }
                  }

                  requestVideo()
            }

            return () => {

            }
      }, [videoData, videoActive])

      return (
            <Fragment>
                  <video ref={video} onPlaying={onPlayingVideo} onWaiting={onWaitingVideo}></video>
                  <div className="content-loader" ref={loader}>
                        <LoaderSpinner color="blue" />
                  </div>
            </Fragment>
      )
}

// {
//       videoActive
//       ?     <video ref={video}></video>
//       :     <LoaderSpinner color="blue" />
// }