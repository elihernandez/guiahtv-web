import React, { useEffect } from 'react'
import { VodContextProvider } from '../../context/VodContext'
import { Content } from './components/Content'
import { exitFullScreen, isFullScreenElement } from '../../js/Screen'
import { hideTopMenuNavbar, showTopMenuNavbar } from '../../js/TopMenu'
import './styles.css'

export function Zonakids() {

      useEffect(() => {
            showTopMenuNavbar()

            return () => {
                  hideTopMenuNavbar()
                  if(isFullScreenElement()) exitFullScreen()
            }
      })

      return (
            <div className="wrapper-zonakids">
                  <VodContextProvider>
                        <Content />
                  </VodContextProvider>
            </div>
      )
}