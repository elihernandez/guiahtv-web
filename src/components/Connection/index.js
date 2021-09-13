import React from 'react'
import { Detector } from 'react-detect-offline'
import { useHistory, useLocation } from 'react-router-dom'
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
					<div className={online ? 'snackbar-success' : 'snackbar-warning'}>
						<Snackbar
							anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
							open={open}
							classes={{}}
							message={<p> {online ? 'Conexión estable' : 'Conexión inestable.'}</p>}
							key={'top' + 'right'}
							autoHideDuration={5000} 
							onClose={handleClose}
						/>
					</div>
				)}/>
		</div>
	)
}

export default Connection