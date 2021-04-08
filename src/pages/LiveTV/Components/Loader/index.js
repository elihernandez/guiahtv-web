import React from 'react'
import ContentLoader from 'react-content-loader'
import './styles.css'

const Loader = (props) => (

	<ContentLoader
		speed={2}
		width={100}
		height={100}
  
		backgroundColor="#424242"
		foregroundColor="#616161"
		style={{
			width: '100%',
			height: '27vw'
		}}
		{...props}
	>
		<rect x="6.2vw" y="0" rx="0.4vw" ry="0.4vw" width="12vw" height="1vw" />
		<rect x="20vw" y="0" rx="0.4vw" ry="0.4vw" width="12vw" height="1vw" />
		<rect x="33.5vw" y="0" rx="0.4vw" ry="0.4vw" width="12vw" height="1vw" />

		<rect x="5.2vw" y="2.8vw" rx="0.4vw" ry="0.4vw" width="17.3vw" height="22.9vw" />
		<rect x="23.3vw" y="2.8vw" rx="0.4vw" ry="0.4vw" width="17.3vw" height="22.9vw" />
		<rect x="41.4vw" y="2.8vw" rx="0.4vw" ry="0.4vw" width="17.3vw" height="22.9vw" />
		<rect x="59.5vw" y="2.8vw" rx="0.4vw" ry="0.4vw" width="17.3vw" height="22.9vw" />
		<rect x="77.6vw" y="2.8vw" rx="0.4vw" ry="0.4vw" width="17.3vw" height="22.9vw" />


	</ContentLoader>
)

export function GuideLoader() {
	return (

		<Loader />
  
	)
}
// <div className="content-guide-loader">
// </div>
// <rect x="22.1vw" y="2.6vw" rx="0.4vw" ry="0.4vw" width="17.9vw" height="22.9vw" />
// <rect x="41vw" y="2.6vw" rx="0.4vw" ry="0.4vw" width="17.9vw" height="22.9vw" />
// <rect x="59.9vw" y="2.6vw" rx="0.4vw" ry="0.4vw" width="17.9vw" height="22.9vw" />
// <rect x="78.8vw" y="2.6vw" rx="0.4vw" ry="0.4vw" width="17.9vw" height="22.9vw" />

// <rect x="380" y="45" rx="10" ry="10" width="360" height="420" />
// <rect x="750" y="45" rx="10" ry="10" width="360" height="420" />
// <rect x="1120" y="45" rx="10" ry="10" width="360" height="420" />
// <rect x="1490" y="45" rx="10" ry="10" width="360" height="420" />