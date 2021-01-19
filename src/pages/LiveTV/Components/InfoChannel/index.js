import React, { Fragment, useContext, useState, useEffect } from 'react'
import VideoContext from '../../../../context/VideoContext'
import './styles.css'

export function InfoChannel(){ 
      const { videoData } = useContext(VideoContext)
      const [isVisible, setIsVisible] = useState(false)

      useEffect(() => {
            setIsVisible(false)
            if(videoData){
                  setIsVisible(true)
            }
      }, [videoData])

      return (
            <div className="info-channel">
            {     isVisible &&
                  <div className="info-channel-wrapper">
                        <h3 className="text-info">Estás viendo:</h3>
                        <h2 className="channel-name">{videoData.Name}</h2>
                  </div>
            }
            </div>
      )
}