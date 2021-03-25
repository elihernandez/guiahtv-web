import React from 'react'
import ReactHlsPlayer from 'react-hls-player'
import videojs from 'video.js'

// export function Player({ url }){
// 	return (
// 		<ReactHlsPlayer
// 			src={url}
// 			autoPlay={true}
// 			hlsConfig={{
// 				maxLoadingDelay: 4,
// 				minAutoBitrate: 0,
// 				lowLatencyMode: true,
// 			}}
// 		/>
// 	)
// }

export default class VideoPlayer extends React.Component {
	componentDidMount() {
		// instantiate Video.js
		this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
			console.log('onPlayerReady', this)
		})
	}
  
	// destroy player on unmount
	componentWillUnmount() {
		if (this.player) {
			this.player.dispose()
		}
	}
  
	// wrap the player in a div with a `data-vjs-player` attribute
	// so videojs won't create additional wrapper in the DOM
	// see https://github.com/videojs/video.js/pull/3856
	render() {
		return (
			<div>	
				<div data-vjs-player>
					<video ref={ node => this.videoNode = node }></video>
				</div>
			</div>
		)
	}
}

export function Player({ url }){
	const videoJsOptions = {
		autoplay: true,
		// controls: true,
		sources: [{
			src: url,
			type: 'application/x-mpegURL'
		}]
	}
      
	return <VideoPlayer { ...videoJsOptions } />
}