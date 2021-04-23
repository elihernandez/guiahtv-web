import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { Home } from './components/Home'
import './styles.css'

export function Sections(){
	let { url } = useRouteMatch()

	return (
		<div className="content-section">
			<Switch>
				<Route path={`${url}/inicio`} >
					<Home />                
				</Route>

				<Route path={`${url}/estrenos`} >
					<h1>Mostrar estrenos</h1>             
				</Route>
			</Switch>
		</div>
	)
}