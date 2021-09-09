import React, { useContext } from "react"
import VideoContext from "../../context/VideoContext"

export function PipBackground() {
  const { stateVideo } = useContext(VideoContext)
  const { isPipActive } = stateVideo

  if (isPipActive) {
    return <div className="pip-bg">
      <p>Reproduciendo en segundo plano</p>
    </div>
  } else {
    return null
  }
}
