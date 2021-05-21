import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../../../context/UserContext'
import MusicContext from '../../../../context/MusicContext'
import GlobalContext from '../../../../context/GlobalContext'
import { postPlaylist } from '../../../../services/postPlaylist'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import './styles.css'

export const CreateModal = ({ open, data }) => {
	const history = useHistory()
	const { stateUser } = useContext(UserContext)
	const { credentials } = stateUser
	const { stateMusic, dispatchMusic } = useContext(MusicContext)
	const { myPlaylists } = stateMusic
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

	const handleSubmit = async(e) => {
		e.preventDefault()
		
		try{
			const response = await postPlaylist(credentials.memclid, { title, description, isPublic })
			if(response.title === title && response.description === description && response.isPublic === isPublic){
				history.replace(`/musica/playlist/${response.regID}`)
				myPlaylists.push({ regID: response.regID, icon: '', title: response.title, type: 'link', url: `/musica/playlist/${response.regID} `})
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
							<h2 className="title-modal">Crear playlist</h2>
							<button onClick={handleClose}>
								<i className="fal fa-times" />
							</button>
						</div>
						<form className="form-modal" onSubmit={handleSubmit}>
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
								<button type="button" className="cancel-button" onClick={handleClose}>Cancelar</button>
								<button type="submit" className="submit-button">Crear</button>
							</div>
						</form>
					</div>
				</Fade>
			</Modal>
		</div>
	)
}