import React, { Fragment, useRef, useContext, useState, useEffect, useCallback } from 'react'
import VideoContext from '../../../../context/VideoContext'
import { Info } from '../Info'
import { Controls } from '../Controls'
import { CSSTransition } from 'react-transition-group'
import './styles.css'

export function Content() {
      const contentRef = useRef()
      const timerRef = useRef(null)
      const { stateVideo } = useContext(VideoContext)
      const { active } = stateVideo
      const [isVisible, setIsVisible] = useState(false)

      const fadeInContent = () => {
            setIsVisible(true)
      }

      const fadeOutContent = () => {
            setIsVisible(false)
      }

      const handleUserMouseMove = useCallback(() => {
            if (active) {
                  clearTimeout(timerRef.current)
                  timerRef.current = setTimeout(() => fadeOutContent(), 3000)
                  fadeInContent()
            } else {
                  clearTimeout(timerRef.current)
            }
      }, [active])

      useEffect(() => {
            handleUserMouseMove()
            window.addEventListener('mousemove', handleUserMouseMove)
            
            return () => {
                  window.removeEventListener('mousemove', handleUserMouseMove)
                  clearTimeout(timerRef.current)
            }
      }, [handleUserMouseMove])

      return (
            <CSSTransition in={isVisible} timeout={300} classNames="fade">
                  <div className="content-video" ref={contentRef}>
                        <Info />
                        <Controls />
                  </div>
            </CSSTransition>
      )
}