import React from "react"
import ContentLoader from "react-content-loader"

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
    <rect x="50" y="0" rx="5" ry="5" width="200" height="15" /> 
    <rect x="275" y="0" rx="5" ry="5" width="200" height="15" /> 
    <rect x="500" y="0" rx="5" ry="5" width="200" height="15" /> 
    
    <rect x="10" y="45" rx="10" ry="10" width="360" height="420" />
    <rect x="380" y="45" rx="10" ry="10" width="360" height="420" />
    <rect x="750" y="45" rx="10" ry="10" width="360" height="420" />
    <rect x="1120" y="45" rx="10" ry="10" width="360" height="420" />
    <rect x="1490" y="45" rx="10" ry="10" width="360" height="420" />
  </ContentLoader>
)

export default Loader