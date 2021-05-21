import React, { Fragment, useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import MusicContext from '../../../../../../context/MusicContext'
import { useAxios } from '../../../../../../hooks/useAxios'
import { List } from '../../../../../../components/List'
import { LoaderSpinnerMUI } from '../../../../../../components/Loader'
import { PopperMenu } from '../../../../../../components/PopperMenu'
import { minutesToHoursString, getYearDate } from '../../../../../../js/Time'
import Tooltip from '@material-ui/core/Tooltip'
import './styles.css'

export function Playlist(){
	const { playlistID } = useParams()
	const params = { playlistID: playlistID }
	const { stateMusic, dispatchMusic } = useContext(MusicContext)
	const { playlist } = stateMusic
	const [dataPlaylist, setDataPlaylist] = useState([])
	const sendRequestPlaylist = playlist?.playlistID == playlistID ? false : true
	const { loading, data } = useAxios('music-playlist', sendRequestPlaylist, params)

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

	useEffect(() => {
		if(data.length){
			dispatchMusic({ type: 'setPlaylist', payload: data })
		}

		if(playlist?.playlistID == playlistID){
			setDataPlaylist(playlist)
		}else{
			if(data?.musicCollectionID){
				data.playlistID = parseInt(playlistID)
				data.id = uuid()
				dispatchMusic({ type: 'setPlaylist', payload: data })
				setDataPlaylist(data)
			}
		}
	}, [data])

	if(loading){
		return <LoaderSpinnerMUI />
	}

	const itemsMenu = [
		{ title: 'Editar', href: '#', func: handleOpenEditModal },
		{ title: 'Eliminar', href: '#', func: handleOpenDeleteModal },
	]

	return (
		<Fragment>
			<div className="album-info">
				<div className="album-info-wrapper">
					<div className="cover-album">
						<img className="cover-img" src={dataPlaylist.portadaURL} />
					</div>
					<div className="info-album">
						<h2 className="text-album">Playlist
							<Tooltip title="Opciones de playlist" placement="top-start" enterDelay={500} enterNextDelay={500}>
								<PopperMenu textButton={<i className="fas fa-ellipsis-h"/>} itemsMenu={itemsMenu} placement="bottom-start"/>
							</Tooltip>
						</h2>
						<h3 className="name-album">{dataPlaylist.title}</h3>
						<h3 className="description-album">{dataPlaylist.description}</h3>
						<div className="more-info-album">
							<p>{getYearDate(dataPlaylist.releaseDate)}&nbsp;&nbsp;-&nbsp;&nbsp;</p>
							{dataPlaylist?.tracks ? (
								<p>{dataPlaylist.totalItems}&nbsp;canciones</p>
							) : (
								<p>&nbsp;Sin canciones</p>
							)}
							{dataPlaylist?.tracks && (
								<p>&nbsp;,{minutesToHoursString(dataPlaylist.length)}</p>
							)}
						</div>
					</div>
				</div>
			</div>
			{dataPlaylist?.tracks && (
				<List data={dataPlaylist} listType='tracksPlaylist' indexList={0} tabValues={0}/>
			)}
		</Fragment>
	)
}

{/* <div className="edit-buttons">
<Tooltip title="Editar información de playlist" placement="top-start" enterDelay={1000} enterNextDelay={1000}>
	<button type="button" className="edit-button" onClick={handleOpenModal}>
		<i className="fas fa-pen"></i>
	</button>
</Tooltip>
</div> */}