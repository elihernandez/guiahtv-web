import React, { useRef, useState, useEffect, Fragment } from 'react'
import { Switch, Route, useRouteMatch } from "react-router-dom"
import { LiveTvContextProvider } from '../../context/LiveTvContext'
import { VideoContextProvider } from '../../context/VideoContext'
import { GuideChannels } from './Components/Guide'
import { Video } from './Components/Video'
import { InfoChannel } from './Components/InfoChannel'
import './styles.css'

export function LiveTV() {
      const livetvRef = useRef()
      let { url } = useRouteMatch()

      useEffect(() => {
            document.querySelector('.navbar-top-menu').style.opacity = 1
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
                                          <div className="background-overlay" />
                                          <InfoChannel />
                                          <GuideChannels />
                                    </div>
                              </div>
                        </VideoContextProvider>
                  </LiveTvContextProvider>
            </Fragment>
      )
}