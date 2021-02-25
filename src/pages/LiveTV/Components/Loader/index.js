import React from "react"
import ContentLoader from "react-content-loader"
import { CSSTransition } from 'react-transition-group'
import './styles.css'

const Loader = (props) => (
  <ContentLoader
    speed={2}
    width={1920}
    height={465}
    viewBox="0 0 1920 465"
    backgroundColor="#424242"
    foregroundColor="#616161"
    {...props}
  >
    <rect x="65" y="0" rx="5" ry="5" width="200" height="15" />
    <rect x="285" y="0" rx="5" ry="5" width="200" height="15" />
    <rect x="500" y="0" rx="5" ry="5" width="200" height="15" />

    <rect x="55" y="35" rx="10" ry="10" width="340" height="425" />
    <rect x="410" y="35" rx="10" ry="10" width="340" height="425" />
    <rect x="765" y="35" rx="10" ry="10" width="340" height="425" />
    <rect x="1120" y="35" rx="10" ry="10" width="340" height="425" />
    <rect x="1475" y="35" rx="10" ry="10" width="340" height="425" />

  </ContentLoader>
)

export function GuideLoader({ loading }) {
  return (
   
      <div>
        <Loader />
      </div>
  )
}

// <rect x="380" y="45" rx="10" ry="10" width="360" height="420" />
// <rect x="750" y="45" rx="10" ry="10" width="360" height="420" />
// <rect x="1120" y="45" rx="10" ry="10" width="360" height="420" />
// <rect x="1490" y="45" rx="10" ry="10" width="360" height="420" />