import React, { useContext } from 'react'
import MusicContext from '../../../../context/MusicContext'
import { PopperMenu } from '../../../../components/PopperMenu'
import Tooltip from '@material-ui/core/Tooltip'

export const PlaylistMenu = ({ dataPlaylist }) => {
	const { dispatchMusic } = useContext(MusicContext)

	const handleOpenEditModal = (e) => {
		e.preventDefault()

		const modal = {
			isModalActive: true,
			data: { name: dataPlaylist.title, description: dataPlaylist.description, isPublic: false },
			type: 'edit'
		}

		dispatchMusic({ type: 'setModal', payload: modal })
	}

	const handleOpenDeleteModal = (e) => {
		e.preventDefault()

		const modal = {
			isModalActive: true,
			data: { name: dataPlaylist.title, description: dataPlaylist.description, isPublic: false },
			type: 'delete'
		}

		dispatchMusic({ type: 'setModal', payload: modal })
	}

	const itemsMenu = [
		{ title: 'Editar', href: '#', func: handleOpenEditModal },
		{ title: 'Eliminar', href: '#', func: handleOpenDeleteModal },
	]

	return (
		<Tooltip title="Opciones de playlist" placement="top-start" enterDelay={500} enterNextDelay={500}>
			<PopperMenu textButton={<i className="fas fa-ellipsis-h"/>} itemsMenu={itemsMenu} placement="bottom-start"/>
		</Tooltip>
	)
}