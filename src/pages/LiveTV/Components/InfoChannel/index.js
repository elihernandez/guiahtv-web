import React, { useContext, useState, useEffect } from 'react'
import VideoContext from '../../../../context/VideoContext'
import { CSSTransition } from 'react-transition-group'
import './styles.css'

export function InfoChannel() {
      const { state } = useContext(VideoContext)
      const { dataChannel, activeChannel } = state
      const [name, setName] = useState('')

      useEffect(() => {
            if (activeChannel) setName(dataChannel.Name)
      }, [activeChannel])

      return (
            <CSSTransition in={activeChannel} timeout={100} classNames="active" unmountOnExit>
                  <div className="info-channel">
                        {name &&
                              <div className="info-channel-wrapper">
                                    <h3 className="text-info">Estás viendo:</h3>
                                    <h2 className="channel-name">{name}</h2>
                              </div>
                        }
                  </div>
            </CSSTransition>
      )
}
