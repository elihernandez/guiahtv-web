import React, { useEffect, useState, useContext, useRef } from 'react'
import AudioContext from '../../../../context/AudioContext'
import RadioContext from '../../../../context/RadioContext'
import UserContext from '../../../../context/UserContext'
import { getLinkRadioStation } from '../../../../services/getLinkRadioStation'
// import { useHls } from '../../../../hooks/useHls'
import { containsString } from '../../../../js/String'
import { useParams } from 'react-router-dom'
import { Controls } from '../Controls'
import './styles.css'

export function Player() {
      const audio = useRef()
      const { contentId } = useParams()
      const { stateUser } = useContext(UserContext)
      const { credentials } = stateUser
      const { stateAudio, dispatchAudio } = useContext(AudioContext)
      const { stateRadio } = useContext(RadioContext)
      const { dataRadio } = stateRadio 
      // const { error, setError } = useHls(audio, url, dispatchAudio)

      const onPlayingVideo = () => {
            dispatchAudio({ type: 'setActive', payload: true })
            dispatchAudio({ type: 'setLoading', payload: false })
            dispatchAudio({ type: 'setPlaying', payload: true })
      }

      const onWaitingVideo = () => {
            dispatchAudio({ type: 'setLoading', payload: true })
            dispatchAudio({ type: 'setPlaying', payload: false })
      }

      const onErrorVideo = () => {
            dispatchAudio({ type: 'setLoading', payload: false })
            dispatchAudio({ type: 'setData', payload: null })
            dispatchAudio({ type: 'setError', payload: true })
            dispatchAudio({ type: 'setActive', payload: false })
            dispatchAudio({ type: 'setPlaying', payload: false })
      }

      useEffect(() => {
            const requestLink = async () => {
                  audio.current.pause()
                  dispatchAudio({ type: 'setPlaying', payload: false })
                  dispatchAudio({ type: 'setError', payload: false })
                  dispatchAudio({ type: 'setAudioRef', payload: audio })
                  dispatchAudio({ type: 'setActive', payload: false })
                  dispatchAudio({ type: 'setLoading', payload: true })
                  try {
                        const response = await getLinkRadioStation(contentId, credentials)
                        if (response == "error") throw new Error('No se pudo obtener la información.')
                        // console.log(response.Url)
                        if(containsString(response.Url, 'https')){
                              audio.current.src = response.Url
                        }else{
                              window.open(response.Url, "_blank")
                        }
                  } catch (e) {
                        dispatchAudio({ type: 'setLoading', payload: false })
                        dispatchAudio({ type: 'setData', payload: null })
                        dispatchAudio({ type: 'setError', payload: true })
                        dispatchAudio({ type: 'setPlaying', payload: false })
                        // setError(e.message)
                  }
            }

            if (contentId) {
                  requestLink()
            }
      }, [contentId])

      useEffect(() => {
            if(dataRadio){
                  dataRadio.map(({cmData}) => {
                        cmData.map((data) => {
                              if(data.Registro == contentId){
                                    dispatchAudio({ type: 'setData', payload: data })
                              }
                        })
                  })
            }
      }, [dataRadio])

      return (
            <div className="player-content">
                  <audio ref={audio} type="application/x-mpegURL" autoPlay onPlaying={onPlayingVideo} onWaiting={onWaitingVideo} onError={onErrorVideo} />
                  <Controls stateAudio={stateAudio} dispatchAudio={dispatchAudio} />
            </div>
      )
}