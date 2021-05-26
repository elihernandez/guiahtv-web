import React, { Fragment } from 'react'
import { Header } from '../Header'
import { SnackbarAuth } from '../SnackbarAuth'

export const Main = ({ children }) => {
	return (
		<Fragment>
			<Header />
			<main className="section-content">
				{children}
			</main>
			<SnackbarAuth />
		</Fragment>
	)
}