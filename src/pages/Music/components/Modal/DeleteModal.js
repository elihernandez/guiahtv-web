import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../../../context/UserContext'
import MusicContext from '../../../../context/MusicContext'
import GlobalContext from '../../../../context/GlobalContext'
import { deletePlaylist } from '../../../../services/deletePlaylist'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import './styles.css'

export const DeleteModal = ({ open, data }) => {
	const history = useHistory()
	const { stateUser } = useContext(UserContext)
	const { credentials } = stateUser
	const { stateMusic, dispatchMusic } = useContext(MusicContext)
	const { playlist, myPlaylists } = stateMusic
	const { globalDispatch } = useContext(GlobalContext)
	const [title] = useState(data.name)

	const handleClose = (_event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		  
		dispatchMusic({ type: 'setModal', payload: false })
	}

	const handleSubmit = async(e) => {
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
							<h2 className="title-modal">Eliminar playlist</h2>
							<button onClick={handleClose}>
								<i className="fal fa-times" />
							</button>
						</div>
						<form className="form-modal" onSubmit={handleSubmit}>
							<div className="group-form">
								<p className="label-delete-message">¿Quieres eliminar {title}? Esta acción no se puede deshacer.</p>
							</div>
							<div className="group-form button">
								<button type="button" className="cancel-button" onClick={handleClose}>Cancelar</button>
								<button type="submit" className="submit-button">Eliminar</button>
							</div>
						</form>
					</div>
				</Fade>
			</Modal>
		</div>
	)
}