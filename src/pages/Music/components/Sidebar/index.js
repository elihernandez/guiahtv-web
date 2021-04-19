import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Sidebar } from '../../../../components/Sidebar'
import './styles.css'

export function SidebarMusic(){
	let { url } = useRouteMatch()
	const links = [
		{
			listTitle: 'Música',
			data: 
                  [
                  	{ url: `${url}/inicio`, icon: 'fas fa-home', title: 'Inicio'},
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