import React , { useState, useRef, useContext, useEffect } from 'react'
import LiveTvContext from '../../../../context/LiveTvContext'
var cssTransition = require('css-transition')
import { useRequest } from '../../../../hooks/useRequest'
import { Categories } from '../Categories/index'
import { Navbar } from '../Navbar/index'
import './styles.css'
import GuideLoader from '../ContentLoader/Guide'


export function Guide() {
      const { data } = useRequest('livetv')
      const { setData } = useContext(LiveTvContext)
      const [guideActive, setGuideActive] = useState(true)
      const refChannels = useRef()
      const guideRef = useRef()

      const handleClickLeft = () => {
            cssTransition(refChannels.current, {
                  transform: 'translate3d(0%, 0, 0)'
            }, 300, function () {
            })
      }

      const handleClickRight = () => {
            cssTransition(refChannels.current, {
                  transform: 'translate3d(-100%, 0, 0)'
            }, 300, function () {
            })
      }
      
      let interval
      useEffect(() => {
            // interval = setTimeout(function(){
            //       if(guideActive){
            //             guideRef.current.style.opacity = "0"
            //             setGuideActive(false)
            //       }
            // }, 5000)

            // if(data){
            //       setData(data)
            // }

            // window.addEventListener('mousemove', () => {
            //       if(!guideActive){
            //             guideRef.current.style.opacity = "1"
            //             clearTimeout(interval)
            //             setGuideActive(true)  
            //       }
            // })

            // return () => clearTimeout(interval);

            window.addEventListener('keydown', () => {
                  console.log("Hola")
                  if(guideActive){
                       setGuideActive(false) 
                  }else{
                        setGuideActive(true) 
                  }
            })
      }, [data])

      return (
            <div className="guide" ref={guideRef}>
                  {     data
                  ?     <div className="guide-wrapper">
                              <Navbar data={data} />
                              <Categories refer={refChannels} />
                              <div className="direction-prev" onClick={handleClickLeft}>
                                    <i className="fas fa-chevron-left"></i>
                              </div>
                              <div className="direction-next" onClick={handleClickRight}>
                                    <i className="fas fa-chevron-right"></i>
                              </div>
                        </div>
                  :     <GuideLoader />
                  }
            </div>
      )
}