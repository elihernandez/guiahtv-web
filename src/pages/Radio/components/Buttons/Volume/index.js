import React, { useState, useEffect } from 'react'
import Slider from '@material-ui/core/Slider'
import './styles.css'

export function Volume({ playing, data, audioRef, volume, muteVolume, dispatchAudio }) {
      const [value, setValue] = useState(volume)
      // const { stateVideo, dispatch } = useContext(VideoContext)
      // const { volume, muteVolume } = stateVideo

      const handleChange = (event, newValue) => {
            // setValue(newValue)
            // audioRef.current.volume = newValue / 100
            dispatchAudio({ type: 'setMuteVolume', payload: false })
            dispatchAudio({ type: 'setVolume', payload: newValue })
      }

      const handleClick = () => {
            if (!muteVolume) {
                  dispatchAudio({ type: 'setMuteVolume', payload: true })
                  audioRef.current.volume = 0
            } else {
                  dispatchAudio({ type: 'setMuteVolume', payload: false })
                  audioRef.current.volume = (value / 100)
            }
      }

      useEffect(() => {
            if (audioRef) {
                  audioRef.current.volume = volume / 100
            }
      }, [audioRef])

      useEffect(() => {
            if(audioRef){
                  if(muteVolume){
                        audioRef.current.volume = 0
                  }else{
                        audioRef.current.volume = (volume / 100)
                  }
            }
      }, [volume])

      return (
            <div className={`control-volume-wrapper ${data == null && playing == false  ? "disabled" : ""}`}>
                  <span className="volume-icon icon" onClick={handleClick}>
                        {muteVolume &&
                              <i className="fas fa-volume-mute"></i>
                        }
                        {volume == 0 && !muteVolume &&
                              <i className="fas fa-volume-off"></i>
                        }
                        {volume > 0 && volume <= 60 && !muteVolume &&
                              <i className="fas fa-volume-down"></i>
                        }
                        {volume > 60 && !muteVolume &&
                              <i className="fas fa-volume-up"></i>
                        }
                  </span>
                  <Slider value={volume} onChange={handleChange} aria-labelledby="continuous-slider" />
            </div>
      )
}