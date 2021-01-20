import React, { useRef, useState, useContext, useEffect, Fragment } from 'react'
import { Switch, Route, useRouteMatch } from "react-router-dom"
import { LiveTvContextProvider } from '../../context/LiveTvContext'
import { VideoContextProvider } from '../../context/VideoContext'
// import LiveTvContext  from '../../context/LiveTvContext'
import VideoContext  from '../../context/VideoContext'
import { GuideChannels } from './Components/Guide'
import { Video } from './Components/Video'
import { InfoChannel } from './Components/InfoChannel'
import { LoaderVideo } from './Components/LoaderVideo'
import './styles.css'

function Content({children}){
      let { videoData } = useContext(VideoContext)
      const contentRef = useRef()
      const [isVisible, setIsVisible] = useState(true) 

      const fadeIn = () => {
            contentRef.current.style.opacity = 1
            document.querySelector('.top-menu').style.opacity = 1
      }

      const fadeOut = () => {
            contentRef.current.style.opacity = 0
            document.querySelector('.top-menu').style.opacity = 0
      }

      useEffect(() =>{
            // if(videoData){
            //       console.log(videoData)
            //       let timer = setTimeout(() => {
            //             fadeOut()
            //             setIsVisible(false)
            //       }, 4000)

            //       window.addEventListener("mousemove", (e) => {
            //             console.log(e)
            //             console.log(isVisible)
            //             if(isVisible){
            //                   clearTimeout(timer)
            //             }else{
            //                   fadeIn() 
            //                   setIsVisible(true)
            //             }
            //       })
            // }
          
            // return (()=>{
            //       window.removeEventListener("mousemove", ()=>{})
            // })
      }, [videoData, isVisible])
      
      return (
            <div className="content-tv" ref={contentRef}>
                  {children}
            </div>
      )
}

export function LiveTV() {
      const livetvRef = useRef()
      let { url } = useRouteMatch()

      useEffect(() => {
            document.querySelector('.navbar-top-menu').style.opacity = 1
            document.querySelector('.top-menu').classList.add('bggradient')
      }, [])

      return (
            <Fragment>
                  <LiveTvContextProvider>
                        <VideoContextProvider>
                              <div className="wrapper-livetv" ref={livetvRef}>
                                    <div className="section-content w-padding-top">
                                          <Switch>
                                                <Route path={`${url}/:categoria?/:canal?`} >
                                                      <Video />
                                                </Route>
                                          </Switch>
                                          <Content>
                                                <div className="background-overlay" />
                                                <LoaderVideo />
                                                <InfoChannel />
                                                <GuideChannels />
                                          </Content>
                                    </div>
                              </div>
                        </VideoContextProvider>
                  </LiveTvContextProvider>
            </Fragment>
      )
}

// <Video />