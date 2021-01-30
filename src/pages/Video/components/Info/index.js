import React, { useState, useEffect, useContext } from 'react'
import VideoContext from '../../../../context/VideoContext'
import { CSSTransition } from 'react-transition-group'
import './styles.css'

export function Info(){
      const { stateVideo } = useContext(VideoContext)
      const { data } = stateVideo
      const [loading, setLoading] = useState(false)
      const [title, setTitle] = useState('')

      useEffect(() => {
            if(data){
                  setLoading(true)
                  setTitle(<h2 className="name">{data.Title}</h2>)
            }
      }, [data])

      return (
            <CSSTransition in={loading} timeout={300} classNames="fade" unmountOnExit>
                  <div className="info-content">
                        <div className="title-content">
                              <p>Estás viendo:</p>
                              {data &&
                                    title
                              }
                        </div>
                  </div>
            </CSSTransition>
      )
}