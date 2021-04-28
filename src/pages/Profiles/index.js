import React from 'react'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'
import { Button } from '../../components/Button'
import { Title } from './components/Title'
import { ListProfiles } from './components/ListProfiles'
import { EditProfile } from './components/EditProfile'
import './styles.css'

export function ProfilesPage(){
	const history = useHistory()
	const { url } = useRouteMatch()

	const backToProfiles = () => {
		history.push(`${url}`)
	}
	
	const goToEditProfiles = () => {
		history.push(`${url}/editar`)
	}

	return (
		<div className="profiles-page-wrapper">
			<Switch>
				<Route exact path={`${url}`} >
					<div className="profiles-wrapper">
						<Title editProfiles={false}/>
						<ListProfiles editProfiles={false}/>
						<Button color="outline-white" classes="button-edit-profiles" uppercase={true} onClick={goToEditProfiles}>Administrar perfiles</Button>
					</div>
				</Route>
				<Route exact path={`${url}/editar`} >
					<div className="profiles-wrapper">
						<Title editProfiles={true}/>
						<ListProfiles editProfiles={true}/>
						<Button color="outline-white" classes="button-edit-profiles" uppercase={true} onClick={backToProfiles}>Listo</Button>
					</div>
				</Route>
				<Route exact path={`${url}/editar/:userID`} >
					<div className="profiles-wrapper">
						<EditProfile />
					</div>
				</Route>
			</Switch>
		</div>
	)
}