import React, { Fragment } from 'react'
import { LiveTvContextProvider } from '../../context/LiveTvContext'
import { Guide } from './Components/Guide/index'
import './styles.css'

export function LiveTV() {
      return (   
            <Fragment>
                  <LiveTvContextProvider>                  
                        <div className="live-tv-section">
                              <div className="video-wrapper">
                              </div>
                              <div className="live-tv-wrapper">
                                    <div className="section-content w-padding-top">
                                          <Guide />
                                    </div>
                              </div>
                        </div>
                  </LiveTvContextProvider>
            </Fragment>        
      )
}