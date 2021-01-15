import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1920}
    height={440}
    viewBox="0 0 1920 440"
    backgroundColor="#424242"
    foregroundColor="#616161"
    {...props}
  >
    <rect x="90" y="16" rx="10" ry="5" width="200" height="15" /> 
    <rect x="10" y="45" rx="10" ry="10" width="360" height="390" />

    <rect x="465" y="16" rx="10" ry="5" width="200" height="15" /> 
    <rect x="380" y="45" rx="10" ry="10" width="360" height="390" />

    <rect x="835" y="16" rx="10" ry="5" width="200" height="15" /> 
    <rect x="750" y="45" rx="10" ry="10" width="360" height="390" />

    <rect x="1205" y="16" rx="10" ry="5" width="200" height="15" /> 
    <rect x="1120" y="45" rx="10" ry="10" width="360" height="390" />

    <rect x="1575" y="16" rx="10" ry="5" width="200" height="15" /> 
    <rect x="1490" y="45" rx="10" ry="10" width="360" height="390" />
  </ContentLoader>
)

export default MyLoader