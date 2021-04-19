import React, { useEffect } from 'react'
// import { Sidebar } from '../../components/Sidebar/index'
// import { List } from './components/List/index'
// import { Artist } from './components/Artist/index'
// import { Album } from './components/Album/index'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { AudioContextProvider } from '../../context/AudioContext'
import { Player } from './components/Player/index'
import { Sections } from './components/Sections'
import { exitFullScreen } from '../../js/Screen'
import { exitPip } from '../../js/PictureInPicture'
import { SidebarMusic } from './components/Sidebar'
import './styles.css'
import './artist.css'

// function AllSongsArtist() {
// 	return (
// 		<div className="content-section">
// 			<Album />
// 			<Album />
// 			<Album />
// 		</div>
// 	)
// }

// function AlbumArtist(){
// 	return (
// 		<div className="content-section">
// 			<Album />
// 			<div className="more-of-artist">
// 				<div className="header-section">
// 					<h2 className="title-section">Más de Wendy Montilla</h2>
// 					<hr/>
// 				</div>
// 				<div className="albums-artist">
// 					<ul className="list-albums">
// 						<li className="item-album active">
// 							<div className="image-album">
// 								<img src="build/assets/images/backgrounds/wendy_montilla2.jpeg" />
// 								<div className="info-album">
// 									<NavLink exact to={'/musica/wendymontilla/vivoparati'}>
// 										<h2 className="title-album">Vivo para ti</h2>
// 									</NavLink>
// 									<h3 className="year-album">2016</h3>
// 								</div>
// 							</div>
// 						</li>
// 						<li className="item-album active">
// 							<div className="image-album">
// 								<img src="build/assets/images/backgrounds/wendy_montilla2.jpeg" />
// 								<div className="info-album">
// 									<h2 className="title-album">En ti permanezco</h2>
// 									<h3 className="year-album">2017</h3>
// 								</div>
// 							</div>
// 						</li>
// 						<li className="item-album active">
// 							<div className="image-album">
// 								<img src="build/assets/images/backgrounds/wendy_montilla2.jpeg" />
// 								<div className="info-album">
// 									<h2 className="title-album">Tú amor</h2>
// 									<h3 className="year-album">2017</h3>
// 								</div>
// 							</div>
// 						</li>
// 						<li className="item-album active">
// 							<div className="image-album">
// 								<img src="build/assets/images/backgrounds/wendy_montilla2.jpeg" />
// 								<div className="info-album">
// 									<h2 className="title-album">Nadie como tú</h2>
// 									<h3 className="year-album">2018</h3>
// 								</div>
// 							</div>
// 						</li>
// 						<li className="item-album active">
// 							<div className="image-album">
// 								<img src="build/assets/images/backgrounds/wendy_montilla2.jpeg" />
// 								<div className="info-album">
// 									<h2 className="title-album">En ti confio</h2>
// 									<h3 className="year-album">2019</h3>
// 								</div>
// 							</div>
// 						</li>
// 						<li className="item-album active">
// 							<div className="image-album">
// 								<img src="build/assets/images/backgrounds/wendy_montilla2.jpeg" />
// 								<div className="info-album">
// 									<h2 className="title-album">Libertad</h2>
// 									<h3 className="year-album">2020</h3>
// 								</div>
// 							</div>
// 						</li>
// 					</ul>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// function Content({ children }) {
// 	return (
// 		<div className="content-section">
// 			{ children }
// 		</div>
// 	)
// }

const initialState = {
	audioRef: null,
	hlsRef: null,
	data: [],
	track: [],
	loading: false,
	playing: false,
	muted: false,
	volume: 50,
	error: false
}

const reducer = (state, action) => {
	switch (action.type) {
	case 'setAudioRef': {
		return {
			...state,
			audioRef: action.payload,
		}
	}
	case 'setHls': {
		return {
			...state,
			hlsRef: action.payload,
		}
	}
	case 'setData': {
		return {
			...state,
			data: action.payload,
		}
	}
	case 'setTrack': {
		return {
			...state,
			track: action.payload,
		}
	}
	case 'setLoading': {
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
	case 'setMuted': {
		return {
			...state,
			muted: action.payload,
		}
	}
	case 'setVolume': {
		return {
			...state,
			muted: action.payload,
		}
	}
	case 'setError': {
		return {
			...state,
			error: action.payload,
		}
	}
	default: return state
	}
}

export function Music() {
	let { url } = useRouteMatch()

	useEffect(() => {

		return () => {
			exitFullScreen()
			exitPip(document.querySelector('video'))
		}
	}, [])
	
	return (
		<AudioContextProvider state={initialState} reducer={reducer}>
			<div className="wrapper-music">
				<div className="music-content">
					<SidebarMusic/>
					<Sections />
					<Switch>
						<Route path={`${url}/:section/:trackId?`} >
							<Player />
						</Route>
					</Switch>
				</div>
			</div>
		</AudioContextProvider>
	)
}
// <Route exact path={`${url}/artistas`} >
						
// <Content>
// 	<List titleContent="Artistas" />
// </Content>

// </Route>
// <Route exact path={`${url}/:artista`} >

// <Artist />

// </Route>
// <Route exact path={`${url}/:artista/canciones`} >

// <AllSongsArtist />

// </Route>
// <Route exact path={`${url}/:artista/:album`} >

// <AlbumArtist />

// </Route>
// <div className="player-content">
// <Player />
// </div>