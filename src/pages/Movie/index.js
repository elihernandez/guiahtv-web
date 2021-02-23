import React, { useState, useEffect } from 'react'
import { InfoMovie } from '../../components/InfoContent'
import { CSSTransition } from 'react-transition-group'

export function ContentMovie({data}){
      const [show, setShow] = useState(false)

      useEffect(() => {
            setShow(true)
      }, [])

      return (
            <CSSTransition in={show} timeout={300} classNames="fade" unmountOnExit>
                  <div className="movie-info info-wrapper">
                        <InfoMovie data={data}/>
                  </div>
            </CSSTransition>
      )
}
