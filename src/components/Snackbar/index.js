import React, { useContext } from 'react'
import * as ReactDOM from 'react-dom'
import GlobalContext from '../../context/GlobalContext'
import Snackbar from '@material-ui/core/Snackbar'
import './styles.css'

export function TopSnackbar() {
	const { globalState, globalDispatch } = useContext(GlobalContext)
	const { open, type, message } = globalState.snackbarOptions

	const handleClose = () => {
		globalDispatch({ type: 'setSnackbarOptions', payload: { open: false, type: null, message: '' }})
	}
	
	if(!open){
		return null
	}

	const snackbarDefaultClass = 'snackbar-default'

	const snackbarClass = {
		info: 'snackbar-info',
		success: 'snackbar-success',
		warning: 'snackbar-warning',
		danger: 'snackbar-danger'
	}
	
	return ReactDOM.createPortal(
		<div className={`snackbar-message ${snackbarClass[type] || snackbarDefaultClass}`}>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
				open={open}
				classes={{}}
				onClose={handleClose}
				message={message}
				key={'top' + 'right'}
				autoHideDuration={100000}
			/>	
		</div>
		,document.body) 

}