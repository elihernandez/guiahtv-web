import React, { useEffect, useState, useContext, useRef } from 'react'
import AudioContext from '../../../../context/AudioContext'
import UserContext from '../../../../context/UserContext'
import { getLinkRadioStation } from '../../../../services/getLinkRadioStation'
import { useHls } from '../../../../hooks/useHls'
import { useParams } from 'react-router-dom'
import './styles.css'

export function Player() {
      const audio = useRef()
      const [url, setUrl] = useState()
      const { contentId } = useParams()
      const { stateUser } = useContext(UserContext)
      const { credentials } = stateUser
      const { stateAudio, dispatchAudio } = useContext(AudioContext)
      const { currentStation } = stateAudio
      // const { error, setError } = useHls(audio, url, dispatchAudio)
      const [error, setError] = useState(null)

      const onPlayingVideo = () => {
            dispatchAudio({ type: 'updateActive', payload: true })
            dispatchAudio({ type: 'updateLoading', payload: false })
            dispatchAudio({ type: 'setPlaying', payload: true })
      }

      const onWaitingVideo = () => {
            dispatchAudio({ type: 'updateLoading', payload: true })
      }

      const onErrorVideo = () => {
            dispatchAudio({ type: 'updateLoading', payload: false })
            dispatchAudio({ type: 'updateData', payload: null })
            setError("Contenido no disponible por el momento")
      }

      useEffect(() => {
            const requestLink = async () => {
                  dispatchAudio({ type: 'setAudioRef', payload: audio })
                  dispatchAudio({ type: 'updateActive', payload: false })
                  dispatchAudio({ type: 'updateLoading', payload: true })
                  try {
                        const response = await getLinkRadioStation(contentId, credentials)
                        if (response == "error") throw new Error('No se pudo obtener la información.')
                        audio.current.src = response.Url
                        // const url = response.Url
                        // setUrl(url)
                  } catch (e) {
                        dispatchAudio({ type: 'updateLoading', payload: false })
                        dispatchAudio({ type: 'updateData', payload: null })
                        setError(e.message)
                  }
            }

            if (contentId) {
                  console.log("Hola")
                  requestLink()
            }
      }, [contentId])


      return (
            <div className="player-content">
                  <audio ref={audio} type="application/x-mpegURL" autoPlay onPlaying={onPlayingVideo} onWaiting={onWaitingVideo} onError={onErrorVideo} />
                  {currentStation &&
                        <Fragment>
                              <div className="info-audio">
                                    {currentStation.Title}
                              </div>
                              <div className="controls">
                              </div>
                              <div className="">
                              </div>
                        </Fragment>
                  }
            </div>
      )
}