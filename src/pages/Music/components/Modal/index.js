import React, { Fragment, useState, useContext } from 'react'
import * as ReactDOM from 'react-dom'
import { useHistory } from 'react-router-dom'
import UserContext from '../../../../context/UserContext'
import MusicContext from '../../../../context/MusicContext'
import GlobalContext from '../../../../context/GlobalContext'
import { postPlaylist } from '../../../../services/postPlaylist'
import { putPlaylist } from '../../../../services/putPlaylist'
import { deletePlaylist } from '../../../../services/deletePlaylist'
import { CreateModal } from './CreateModal'
import { EditModal } from './EditModal'
import { DeleteModal } from './DeleteModal'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import './styles.css'

const ContentModal = ({ open, data, type }) => {
	const history = useHistory()
	const { stateUser } = useContext(UserContext)
	const { credentials } = stateUser
	const { stateMusic, dispatchMusic } = useContext(MusicContext)
	const { playlist, myPlaylists } = stateMusic
	const { globalDispatch } = useContext(GlobalContext)
	const [title, setTitle] = useState(data.name)
	const [description, setDescription] = useState(data.description)
	const [isPublic, setIsPublic] = useState(data.isPublic)

	const handleClose = (_event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		  
		dispatchMusic({ type: 'setModal', payload: false })
	}

	const handleSubmitCreate = async(e) => {
		e.preventDefault()
		
		try{
			const response = await postPlaylist(stateUser.credentials.memclid, { title, description, isPublic })
			console.log(title, description, isPublic)
			console.log(response.title, response.description, response.isPublic)
			if(response.title === title && response.description === description && response.isPublic === isPublic){
				history.replace(`/musica/playlist/${response.regID}`)
				myPlaylists.push({ icon: '', title: response.title, type: 'link', url: `/musica/playlist/${response.regID} `})
				dispatchMusic({ type: 'setMyPlaylists', payload: myPlaylists })
				globalDispatch({ type: 'setSnackbarOptions', payload: { open: true, type: 'default', message: <p>La playlist se creó correctamente. <i className="fad fa-check-circle"></i></p> }})
				handleClose()
			}else{
				throw Error()
			}
		}catch(e){
			globalDispatch({ type: 'setSnackbarOptions', payload: { open: true, type: 'default', message: <p>No se pudo crear la playlist. <i className="fad fa-times-circle"></i></p> }})
			handleClose()
			console.log('Error')
		}
	}

	const handleSubmitEdit = async(e) => {
		e.preventDefault()
		
		try{
			const response = await putPlaylist(credentials.memclid, { title, description, isPublic }, playlist.musicCollectionID)
			if(response.title === title && response.description === description && response.isPublic === isPublic){
				playlist.title = response.title
				playlist.description = response.description
				myPlaylists.map((playlist) => {
					if(playlist.regID === response.regID){
						playlist.title = response.title
					}
				})
				dispatchMusic({ type: 'setPlaylist', payload: playlist })
				dispatchMusic({ type: 'setMyPlaylist', payload: myPlaylists })
				globalDispatch({ type: 'setSnackbarOptions', payload: { open: true, type: 'default', message: <p>La playlist se modificó correctamente. <i className="fad fa-check-circle"></i></p> }})
				handleClose()
			}else{
				throw Error()
			}
		}catch(e){
			globalDispatch({ type: 'setSnackbarOptions', payload: { open: true, type: 'default', message: <p>No se pudo modificar la playlist. <i className="fad fa-times-circle"></i></p> }})
			handleClose()
			console.log('Error')
		}
	}

	const handleSubmitDelete = async(e) => {
		e.preventDefault()

		try{
			const response = await deletePlaylist(credentials.memclid, playlist.musicCollectionID)
			if(!response.includes('Error')){
				myPlaylists.map((myPlaylist, index) => {
					if(myPlaylist.regID === playlist.musicCollectionID){
						myPlaylists.splice(index, 1)
					}
				})
				history.replace('/musica/inicio')
				dispatchMusic({ type: 'setMyPlaylist', payload: myPlaylists })
				dispatchMusic({ type: 'setPlaylist', payload: {} })
				globalDispatch({ type: 'setSnackbarOptions', payload: { open: true, type: 'default', message: <p>La playlist se eliminó correctamente. <i className="fad fa-check-circle"></i></p> }})
				handleClose()
			}else{
				throw Error()
			}
		}catch(e){
			globalDispatch({ type: 'setSnackbarOptions', payload: { open: true, type: 'default', message: <p>No se pudo eliminar la playlist. <i className="fad fa-times-circle"></i></p> }})
			handleClose()
			console.log('Error')
		}
	}
  
	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className='modal-playlist'
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className="modal-paper">
						<div className="header-modal">
							<h2 className="title-modal">{type === 'create' ? 'Crear' : 'Editar'} playlist</h2>
							<button onClick={handleClose}>
								<i className="fal fa-times" />
							</button>
						</div>
						<form className="form-modal" onSubmit={type === 'create' ? handleSubmitCreate : handleSubmitEdit}>
							<div className="group-form">
								<label htmlFor="name-playlist" className="label-name-playlist">Nombre de playlist</label>
								<input type="text" className="name-playlist" autoFocus required value={title} onChange={(e) => setTitle(e.target.value)} />
							</div>
							<div className="group-form">
								<label htmlFor="description-playlist" className="label-description-playlist">Descripción de playlist</label>
								<textarea type="text" className="description-playlist" rows="7" required value={description} onChange={(e) => setDescription(e.target.value)}/>
							</div>
							<div className="group-form checkbox">
								<input type="checkbox" className="public-playlist" defaultChecked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
								<label htmlFor="public-playlist" className="label-public-playlist">Playlist pública</label>
							</div>
							<div className="group-form button">
								{type !== 'create' && (
									<button type="button" className="delete-button" onClick={handleSubmitDelete}>Eliminar</button>
								)}
								<button type="submit" className="create-button">{type === 'create' ? 'Crear' : 'Guardar'}</button>
							</div>
						</form>
					</div>
				</Fade>
			</Modal>
		</div>
	)
}

export const PlaylistModal = () => {
	const { stateMusic } = useContext(MusicContext)
	const { modal } = stateMusic

	if(!modal.isModalActive){
		return null
	}
	
	return ReactDOM.createPortal(
		<Fragment>
			{modal.type === 'create' && (
				<CreateModal open={modal.isModalActive} data={modal.data} type={modal.type} />
			)}
			{modal.type === 'edit' && (
				<EditModal open={modal.isModalActive} data={modal.data} type={modal.type} />
			)}
			{modal.type === 'delete' && (
				<DeleteModal open={modal.isModalActive} data={modal.data} type={modal.type} />
			)}
		</Fragment>
		,document.body) 
}