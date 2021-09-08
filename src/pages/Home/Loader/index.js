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
			height: '52vw'
		}}
		{...props}
	>
		<rect x="3vw" y="0" rx="0.4vw" ry="0.4vw" width="100%" height="30vw" />

		<rect x="10vw" y="31vw" rx="0.4vw" ry="0.4vw" width="17vw" height="10vw" />
		<rect x="29vw" y="31vw" rx="0.4vw" ry="0.4vw" width="17vw" height="10vw" />
		<rect x="48vw" y="31vw" rx="0.4vw" ry="0.4vw" width="17vw" height="10vw" />
        <rect x="67vw" y="31vw" rx="0.4vw" ry="0.4vw" width="17vw" height="10vw" />

	</ContentLoader>
)

export function HomeLoader() {
	return (

		<Loader />
  
	)
}