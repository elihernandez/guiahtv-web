import React, { useEffect } from 'react'
import { VodContextProvider } from '../../context/VodContext'
import { Catalogue } from './components/Catalogue'
import { exitFullScreen, isFullScreenElement } from '../../js/Screen'
import './styles.css'

export function VideoOnDemand() {

      useEffect(() => {
            document.querySelector('.navbar-top-menu').style.opacity = 1
            document.querySelector('.top-menu').classList.add('bggradient')

            return () => {
                  document.querySelector('.navbar-top-menu').style.opacity = 0
                  document.querySelector('.top-menu').classList.remove('bggradient')
                  if(isFullScreenElement()) exitFullScreen()
            }
      })

      return (
            <div className="wrapper-vod">
                  <VodContextProvider>
                        <div className="section-content w-padding-top">
                              <Catalogue />
                        </div>
                  </VodContextProvider>
            </div>
      )
}