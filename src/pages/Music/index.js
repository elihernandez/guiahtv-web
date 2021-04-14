import React, { Fragment, useState, useEffect } from 'react'
import { useRequest } from '../../hooks/useRequest'
import { Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Sidebar } from '../../components/Sidebar/index'
import { List } from './components/List/index'
import { Artist } from './components/Artist/index'
import { Album } from './components/Album/index'
import { Player } from './components/Player/index'
import { exitFullScreen } from '../../js/Screen'
import './styles.css'
import './artist.css'

function CheckAuth({ children }) {
	const cookies = useAuth()
	return (
		<Fragment>
			{cookies.memclid ? children : <Redirect to='/login' />}
		</Fragment>
	)
}

function AllSongsArtist() {
	return (
		<div className="content-section">
			<Album />
			<Album />
			<Album />
		</div>
	)
}

function AlbumArtist(){
	return (
		<div className="content-section">
			<Album />
			<div className="more-of-artist">
				<div className="header-section">
					<h2 className="title-section">Más de Wendy Montilla</h2>
					<hr/>
				</div>
				<div className="albums-artist">
					<ul className="list-albums">
						<li className="item-album active">
							<div className="image-album">
								<img src="build/assets/images/backgrounds/wendy_montilla2.jpeg" />
								<div className="info-album">
									<NavLink exact to={'/musica/wendymontilla/vivoparati'}>
										<h2 className="title-album">Vivo para ti</h2>
									</NavLink>
									<h3 className="year-album">2016</h3>
								</div>
							</div>
						</li>
						<li className="item-album active">
							<div className="image-album">
								<img src="build/assets/images/backgrounds/wendy_montilla2.jpeg" />
								<div className="info-album">
									<h2 className="title-album">En ti permanezco</h2>
									<h3 className="year-album">2017</h3>
								</div>
							</div>
						</li>
						<li className="item-album active">
							<div className="image-album">
								<img src="build/assets/images/backgrounds/wendy_montilla2.jpeg" />
								<div className="info-album">
									<h2 className="title-album">Tú amor</h2>
									<h3 className="year-album">2017</h3>
								</div>
							</div>
						</li>
						<li className="item-album active">
							<div className="image-album">
								<img src="build/assets/images/backgrounds/wendy_montilla2.jpeg" />
								<div className="info-album">
									<h2 className="title-album">Nadie como tú</h2>
									<h3 className="year-album">2018</h3>
								</div>
							</div>
						</li>
						<li className="item-album active">
							<div className="image-album">
								<img src="build/assets/images/backgrounds/wendy_montilla2.jpeg" />
								<div className="info-album">
									<h2 className="title-album">En ti confio</h2>
									<h3 className="year-album">2019</h3>
								</div>
							</div>
						</li>
						<li className="item-album active">
							<div className="image-album">
								<img src="build/assets/images/backgrounds/wendy_montilla2.jpeg" />
								<div className="info-album">
									<h2 className="title-album">Libertad</h2>
									<h3 className="year-album">2020</h3>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

function Content({ children }) {
	return (
		<div className="content-section">
			{ children }
		</div>
	)
}

function SidebarMusic(){
	let { url } = useRouteMatch()
      
	const links = [
		{
			listTitle: 'Música',
			data: 
                  [
                  	{ url: `${url}`, icon: 'fas fa-home', title: 'Inicio'},
                  	{ url: `${url}/recomendado`, icon: 'fas fa-headphones-alt', title: 'Recomendado'},
                  	{ url: `${url}/genero`, icon: 'fas fa-compact-disc', title: 'Género'},
                  	{ url: `${url}/buscar`, icon: 'fas fa-search', title: 'Buscar'}
                  ]
		},
		{
			listTitle: 'Mi biblioteca',
			data:
                  [
                  	{ url: `${url}/canciones`, icon: 'fas fa-guitar', title: 'Canciones'},
                  	{ url: `${url}/artistas`, icon: 'fas fa-microphone-alt', title: 'Artistas'},
                  	{ url: `${url}/albumes`, icon: 'fas fa-record-vinyl', title: 'Álbumes'},
                  	{ url: `${url}/playlists`, icon: 'fas fa-list-ul', title: 'Playlists'}
                  ]
		}
	]

	return (
		<Sidebar classes="sidebar-music" links={links} />
	)
}

export function Music() {
	const { loading, data } = useRequest()
	let { url } = useRouteMatch()

	useEffect(() => {

		return () => {
			exitFullScreen()
		}
	}, [])

	return (
		<div  className="section-content w-padding-top">
			<div className="wrapper-music">
				<div className="music-content">
					<SidebarMusic/>
					<Switch>
						<Route exact path={`${url}`} >
                                          
						</Route>
						<Route exact path={`${url}/artistas`} >
							<CheckAuth>
								<Content>
									<List titleContent="Artistas" />
								</Content>
							</CheckAuth>
						</Route>
						<Route exact path={`${url}/:artista`} >
							<CheckAuth>
								<Artist />
							</CheckAuth>
						</Route>
						<Route exact path={`${url}/:artista/canciones`} >
							<CheckAuth>
								<AllSongsArtist />
							</CheckAuth>
						</Route>
						<Route exact path={`${url}/:artista/:album`} >
							<CheckAuth>
								<AlbumArtist />
							</CheckAuth>
						</Route>
					</Switch>
				</div>
			</div>
			<div className="player-content">
				<Player />
			</div>
		</div>
	)
}