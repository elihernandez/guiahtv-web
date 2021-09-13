import React, { useEffect } from 'react'
import { Detector } from 'react-detect-offline'
import { useHistory } from 'react-router-dom'
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

	const handleChange = () => {
		setOpen(true)
	}

	return (
		<div>
			<Detector
				onChange={handleChange} 
				render={({ online }) => (
					<Message open={open} online={online} handleClose={handleClose} />
				)}	
			/>
		</div>
	)
}

const Message = ({open, online, handleClose}) => {
	const history = useHistory()
	const { location } = history
	const { pathname } = location

	useEffect(() => {
		// if(online){
		// 	console.log('Se estableció la conexión')
		// 	history.replace(pathname)
		// }
	}, [online])

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