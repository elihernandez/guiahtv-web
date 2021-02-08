import React, { useState, useEffect } from 'react'
import Slider from '@material-ui/core/Slider'
import './styles.css'

export function Volume({audioRef, volume}) {
      const [value, setValue] = useState(volume)

      const handleChange = (event, newValue) => {
            setValue(newValue)
            audioRef.current.volume = newValue / 100
      }

      useEffect(() => {
            if(audioRef){
                  audioRef.current.volume = volume / 100
            }
      }, [audioRef])

      return (
            <div className="control-volume-wrapper">
                  <span className="volume-icon"><i className="fas fa-volume-up" /></span>
                  <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
            </div>
      )
}