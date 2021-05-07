import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { Home } from './components/Home'
import { Artist } from './components/Artist'
import { Album } from './components/Album'
import { Playlist } from './components/Playlist'
import './styles.css'

export function Sections(){
	let { url } = useRouteMatch()

	return (
		<div className="content-section">
			<Switch>
				<Route path={`${url}/inicio`} >
					<Home />                
				</Route>

				<Route exact path={`${url}/artista/:artistID`} >
					<Artist />             
				</Route>
				
				<Route exact path={`${url}/album/:albumID`} >
					<Album />             
				</Route>

				<Route exact path={`${url}/playlist/:playlistID`} >
					<Playlist />           
				</Route>
			</Switch>
		</div>
	)
}