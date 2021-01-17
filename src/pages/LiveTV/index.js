import React, { Fragment } from 'react'
import { LiveTvContextProvider } from '../../context/LiveTvContext'
import { VideoContextProvider } from '../../context/VideoContext'
import { Guide } from './Components/Guide/index2'
import { Video } from './Components/Video/index'
import './styles.css'

export function LiveTV() {
      return (   
            <Fragment>
                  <LiveTvContextProvider>  
                        <VideoContextProvider> 
                              <div className="live-tv-section">
                                    <div className="video-wrapper">
                                          <Video />
                                    </div>
                                    <div className="live-tv-wrapper">
                                          <div className="section-content w-padding-top">
                                                <Guide />
                                          </div>
                                    </div>
                              </div>
                        </VideoContextProvider>                
                  </LiveTvContextProvider>
            </Fragment>        
      )
}