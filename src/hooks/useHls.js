import { useState, useEffect } from 'react'
// require('hls.js/dist/hls.min.js')
import Hls from 'hls.js'
// console.log(Hls.version)

export function useHls(video, url, dispatch, movie) {
	const config = {
		debug: false,
		liveBackBufferLength: 900,
		enableWorker: true,
	}
	let hls = new Hls(config)
	const [error, setError] = useState(false)
	const [recover, setRecover] = useState(0)

	useEffect(() => {
		if(url){
			if (Hls.isSupported()) {
				setError(false)
				hls.attachMedia(video.current)
				hls.on(Hls.Events.MEDIA_ATTACHED, function () {
					hls.loadSource(url)
					hls.on(Hls.Events.MANIFEST_PARSED, function () {
						if(movie){
							if(movie.ResumePos){
								video.current.currentTime = movie.ResumePos / 1000
								dispatch({ type: 'setCurrentTime', payload: movie.ResumePos / 1000 })
								dispatch({ type: 'updateVideoRef', payload: video })
							}
						}
						dispatch({ type: 'setHls', payload: hls })
					})
				})
            
				hls.on(Hls.Events.ERROR, function (event, data) {
					console.log(event, data)
					dispatch({ type: 'updateLoading', payload: false })
                              
					if(event == 'hlsError' && data.details == 'manifestLoadError'){
						hls.destroy()
						dispatch({ type: 'updateLoading', payload: false })
						// dispatch({ type: 'updateData', payload: null })
						dispatch({ type: 'setHls', payload: null })
						setError('Señal no disponible por el momento')
					}

					if(data.details == 'bufferStalledError'){
						// hls.destroy()
						hls.startLoad()
						dispatch({ type: 'updateLoading', payload: true })
						// // dispatch({ type: 'updateData', payload: null })
						// dispatch({ type: 'setHls', payload: null })
						// setError("Contenido no disponible por el momento")
					}

					if(data.details == 'audioTrackLoadError'){
						if(recover != 3){
							// hls.destroy()
							setRecover(recover + 1)
						}
						dispatch({ type: 'updateLoading', payload: true })
						// // dispatch({ type: 'updateData', payload: null })
						// dispatch({ type: 'setHls', payload: null })
						// setError("Contenido no disponible por el momento")
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

				hls.on(Hls.Events.AUDIO_TRACKS_UPDATED, function(event, data){
					dispatch({ type: 'setAudioTracks', payload: data })
				})
                        
				hls.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, function(event, data){
					dispatch({ type: 'setSubtitleTracks', payload: data })
				})
			}
		}

		return (() => {
			// hls.destroy()
		})
	}, [url, recover])

	return { error, setError }
}