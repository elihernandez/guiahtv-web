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
                	},
                  	// { url: `${url}/recomendado`, icon: 'fas fa-headphones-alt', title: 'Recomendado'},
                  	// { url: `${url}/genero`, icon: 'fas fa-compact-disc', title: 'Género'},
                  	// { url: `${url}/buscar`, icon: 'fas fa-search', title: 'Buscar'}
                ]
		},
		// {
		// 	listTitle: 'Mi biblioteca',
		// 	data:
		//           [
		//           	{ url: `${url}/canciones`, icon: 'fas fa-guitar', title: 'Canciones'},
		//           	{ url: `${url}/artistas`, icon: 'fas fa-microphone-alt', title: 'Artistas'},
		//           	{ url: `${url}/albumes`, icon: 'fas fa-record-vinyl', title: 'Álbumes'},
		//           	{ url: `${url}/playlists`, icon: 'fas fa-list-ul', title: 'Playlists'}
		//           ]
		// }
	]

	return (
		<Sidebar classes="sidebar-music" links={links} />
	)
}