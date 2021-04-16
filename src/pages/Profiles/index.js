import React, { useState } from 'react'
import { ListProfiles } from './components/ListProfiles'
import { Title } from './components/Title'
import { Button } from '../../components/Button'
import './styles.css'

export function ProfilesPage(){
	const [editProfiles, setEditProfiles] = useState(false)

	const onClick = () => {
		setEditProfiles(true)
	}

	return (
		<div className="profiles-page-wrapper">
			<div className="profiles-wrapper">
				<Title editProfiles={editProfiles}/>
				<ListProfiles editProfiles={editProfiles}/>
				<Button color="outline-white" classes="button-edit-profiles" uppercase={true} onClick={onClick}>Editar perfiles</Button>
			</div>
		</div>
	)
}