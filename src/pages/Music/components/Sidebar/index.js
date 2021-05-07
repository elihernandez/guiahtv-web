import React from 'react'
import { useRouteMatch, useLocation } from 'react-router-dom'
import { Sidebar } from '../../../../components/Sidebar'
import './styles.css'

export function SidebarMusic(){
	const { url } = useRouteMatch()
	const location = useLocation()

	const links = [
		{
			listTitle: 'Música',
			data: 
                [
                  	{ 
                		url: location.pathname.includes(`${url}/inicio`) ? location.pathname : `${url}/inicio`,
                		icon: 'fas fa-home',
                		title: 'Inicio'
                	}
                ]
		}
	]

	return (
		<Sidebar classes="sidebar-music" links={links} />
	)
}