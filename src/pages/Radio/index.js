import React, { useEffect, useState } from 'react'
import { RadioContextProvider } from '../../context/RadioContext'
import { AudioContextProvider } from '../../context/AudioContext'
import { Switch, Route, useRouteMatch } from "react-router-dom"
import { CatalogueRadio } from '../../components/Catalogue'
import { Player } from './components/Player'
import { exitFullScreen, isFullScreenElement } from '../../js/Screen'
import { hideTopMenuNavbar, showTopMenuNavbar } from '../../components/TopMenu'
import './styles.css'

const initialState = {
      hls: null,
      audioRef: null,
      data: null,
      active: false,
      loading: false,
      playing: false,
      muteVolume: false
}

const reducer = (state, action) => {
      switch (action.type) {
            case 'setHls': {
                  return {
                        ...state,
                        hls: action.payload,
                  }
            }
            case 'setAudioRef': {
                  return {
                        ...state,
                        audioRef: action.payload,
                  }
            }
            case 'updateData': {
                  return {
                        ...state,
                        data: action.payload,
                  }
            }
            case 'updateActive': {
                  return {
                        ...state,
                        active: action.payload,
                  }
            }
            case 'updateLoading': {
                  return {
                        ...state,
                        loading: action.payload,
                  }
            }
            case 'setPlaying': {
                  return {
                        ...state,
                        playing: action.payload,
                  }
            }
            case 'setMuteVolume': {
                  return {
                        ...state,
                        muteVolume: action.payload,
                  }
            }
            default: return state;
      }
}

export function Radio(){
      const { url } = useRouteMatch()
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
            <div className="wrapper-radio">
                  {!isCancelled && 
                        <RadioContextProvider>
                              <div className="section-content">
                                    <Switch>
                                          <Route exact path={`${url}/:contentId?`} >
                                                <CatalogueRadio requestApi="radio"/>
                                                <AudioContextProvider state={initialState} reducer={reducer}>
                                                      <Player />
                                                </AudioContextProvider>
                                          </Route>
                                    </Switch>
                              </div>
                        </RadioContextProvider>
                  }
            </div>
      )
}