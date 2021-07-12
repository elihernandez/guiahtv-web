import React, { Fragment, useEffect, useContext } from 'react'
import { useRouteMatch, useLocation } from 'react-router-dom'
import UserContext from '../../../../context/UserContext'
import MusicContext from '../../../../context/MusicContext'
import { getMyPlaylists } from '../../../../services/getMyPlaylists'
import { Sidebar } from '../../../../components/Sidebar'
import { limitString } from '../../../../js/String'
import './styles.css'

export function SidebarMusic(){
	const location = useLocation()
	const { url } = useRouteMatch()
	const { stateUser } = useContext(UserContext)
	const { stateMusic, dispatchMusic } = useContext(MusicContext)
	const { myPlaylists } = stateMusic

	const handleOpenModal = () => {
		const modal = {
			isModalActive: true,
			data: {
				name: '',
				description: '',
				isPublic: false
			},
			type: 'create'
		}
		dispatchMusic({ type: 'setModal', payload: modal })
	}

	useEffect(() => {
		const request = async() => {
			try{
				const response = await getMyPlaylists(stateUser)
				const data = [{ 
					handleClick: handleOpenModal,
					icon: 'far fa-plus-circle',
					title: 'Crear playlist',
					type: 'button'
				}]

				if(response?.playLists){
					response.playLists.map((playlist) => {
						data.push({
							regID: playlist.regID,
							url: `${url}/playlist/${playlist.regID}`,
							icon: null,
							title: limitString(playlist.title, 25),
							type: 'link'
						})
					})
				}
				dispatchMusic({ type: 'setMyPlaylists', payload: data })
			}catch(e){
				console.log(e)
			}
		}

		request()
	}, [])

	const links = [
		{
			listTitle: 'Música',
			data: 
                [
                  	{ 
                		url: location.pathname.includes(`${url}/inicio`) ? location.pathname : `${url}/inicio`,
                		icon: 'fas fa-home',
                		title: 'Inicio',
                		type: 'link'
                	}
                ]
		},
		{
			listTitle: 'Playlists',
			data: myPlaylists,  
		}
	]

	return (
		<Fragment>
			<Sidebar classes="sidebar-music" links={links} />
		</Fragment>
	)
}