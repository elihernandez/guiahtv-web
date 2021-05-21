import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'

export function TopSnackbar({ options, handleClose }) {
	const { open, message } = options

	return (
		<div>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
				open={open}
				onClose={handleClose}
				message={message}
				key={'top' + 'right'}
				autoHideDuration={5000}
			/>		
		</div>
	)
}