import React from 'react'
import { Detector } from 'react-detect-offline'
import Snackbar from '@material-ui/core/Snackbar'
import './styles.css'

const Connection = () => {
	const [open, setOpen] = React.useState(false)

	const handleClose = (reason) => {
		if (reason === 'clickaway') {
			return
		}
    
		setOpen(false)
	}

	const handleChange = (online) => {
		setOpen(true)
		
		if(online){
			setTimeout(() => {
				window.location.reload()
			}, 2000)
		}
	}

	return (
		<div>
			<Detector
				onChange={(online) => handleChange(online)} 
				render={({ online }) => (
					<Message open={open} online={online} handleClose={handleClose} />
				)}	
			/>
		</div>
	)
}

const Message = ({open, online, handleClose}) => {

	const styles = {
		'font-size': '1.6rem',
		'text-align': 'center', 
		'margin': '8px 0',
		'display': 'flex',
		'color': 'whitesmoke'
	}

	return (
		<div className={online ? 'snackbar-success' : 'snackbar-warning'}>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
				open={open}
				classes={{}}
				message={<div style={styles}> {online ? 'Se estableció la conexión.' : 'No se pudo establecer conexión.'}</div>}
				key={'top' + 'right'}
				autoHideDuration={5000} 
				onClose={handleClose}
			/>
		</div>
	)
}

export default Connection