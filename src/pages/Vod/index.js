import React, { useEffect } from 'react'
import { hideTopMenuNavbar, showTopMenuNavbar } from '../../js/TopMenu'
import { Content } from './components/Content'
import { VodContextProvider } from '../../context/VodContext'
import { exitFullScreen, isFullScreenElement } from '../../js/Screen'
import './styles.css'

export function VideoOnDemand() {

      useEffect(() => {
            showTopMenuNavbar()

            return () => {
                  hideTopMenuNavbar()
                  if (isFullScreenElement()) exitFullScreen()
            }
      })

      return (
            <div className="wrapper-alacarta">
                  <VodContextProvider>
                        <Content />
                  </VodContextProvider>
            </div>
      )
}