import React, { useState, useEffect } from 'react'
import { LoaderSpinnerMUI } from '../../../../../components/Loader'
import './styles.css'

export function Play({ data, loading, audioRef, active, playing, error, dispatchAudio }) {

      const handleClick = () => {
            if (playing) {
                  audioRef.current.pause()
                  dispatchAudio({ type: 'setPlaying', payload: false })
            } else {
                  audioRef.current.play()
                  dispatchAudio({ type: 'setPlaying', payload: true })
            }
      }

      return (
            <div className="button-play-wrapper">
                  <span className="button-play" onClick={handleClick}>
                        {loading &&
                              <LoaderSpinnerMUI />
                        }
                        {playing && active &&
                              <i className="fas fa-pause pause" />
                        }
                        {!playing && active &&
                              <i className="fas fa-play play" />
                        }
                        {error &&
                              <i className="fas fa-play play" />
                        }
                        {!data &&
                              <i className="fas fa-play play" />
                        }
                  </span>
            </div>
      )
}