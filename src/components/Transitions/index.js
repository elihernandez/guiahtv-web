import React from "react"
import '../../pages/Login/animates.scss'
import { Transition } from "react-transition-group"

const duration = 300;

export default function TransitionApp({ children, state }) {
    return (
      <Transition in={state} timeout={duration} appear>
          {(status) => (
            <div className={`page-transition page-${status}`}>
                {children}
            </div>
          )}
      </Transition>
    )
  }