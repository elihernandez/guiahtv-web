import { useState, useEffect } from 'react'

export function useHls(video, url, dispatch) {
      let hls = new Hls()
      const [error, setError] = useState(false)

      useEffect(() => {
            if(url){
                  if (Hls.isSupported()) {
                        setError(false)
                        hls.attachMedia(video.current);
                        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                              hls.loadSource(url)
                              hls.on(Hls.Events.MANIFEST_PARSED, function () {
                                    video.current.play()
                              })
                        })
            
                        hls.on(Hls.Events.ERROR, function (data) {
                              if(data.details == "manifestLoadError"){
                                    hls.destroy()
                                    dispatch({ type: 'updateLoading', payload: false })
                                    dispatch({ type: 'updateData', payload: null })
                                    setError("Señal no disponible por el momento")
                              }
                              // if (data.fatal) {
                              //       switch (data.type) {
                              //             case Hls.ErrorTypes.MEDIA_ERROR:
                              //                   hls.destroy()
                              //                   setError("Señal no disponible por el momento")
                              //             break
                              //       }
                              // }
                        })
                  }
            }

            return (() => {
                  hls.destroy()
            })
      }, [url])

      return { error, setError }
}