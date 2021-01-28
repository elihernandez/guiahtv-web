import React, { useEffect, useState } from 'react'
import { VodContextProvider } from '../../context/VodContext'
import { CatalogueVod } from '../../components/Catalogue'
import { exitFullScreen, isFullScreenElement } from '../../js/Screen'
import { hideTopMenuNavbar, showTopMenuNavbar } from '../../components/TopMenu'
import './styles.css'

export function Zonakids() {
     const [isCancelled, setIsCancelled] = useState(false)

      useEffect(() => {
            setIsCancelled(false)
            showTopMenuNavbar()

            return () => {
                  setIsCancelled(true)
                  hideTopMenuNavbar()
                  if(isFullScreenElement()) exitFullScreen()
            }
      })

      return (
            <div className="wrapper-vod">
                  {!isCancelled &&
                        <VodContextProvider>
                              <div className="section-content">
                                    <CatalogueVod requestApi="zonakids"/>
                              </div>
                        </VodContextProvider>
                  }
            </div>
      )
}