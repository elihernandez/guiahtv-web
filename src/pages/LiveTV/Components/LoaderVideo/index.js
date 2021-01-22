import React, { useContext } from 'react'
import { LoaderSpinner } from '../../../../components/Loader/index'
import VideoContext from '../../../../context/VideoContext'
import { CSSTransition } from 'react-transition-group'

export function LoaderVideo() {
      const { stateVideo } = useContext(VideoContext)
      const { loadingChannel } = stateVideo

      return (
            <CSSTransition in={loadingChannel} timeout={100} classNames="active">
                  <div className="loader-video">
                        <LoaderSpinner color="blue" />
                  </div>
            </CSSTransition>
      )
}