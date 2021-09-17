import React, { useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { ErrorAuth } from '../pages/ErrorAuth'
import { RouterLogged } from './components/RouterLogged'
import { RouterLoggedOut } from './components/RouterLoggedOut'
import Connection from '../components/Connection'
import { devBasenameRouter, prodBasenameRouter } from '../../config'
const basename = process.env.NODE_ENV !== 'production' ? devBasenameRouter : prodBasenameRouter

export function BaseRouter() {
	const { stateUser } = useContext(UserContext)
	const { credentials, errorAuth } = stateUser

	if (errorAuth) return <ErrorAuth message={errorAuth} />

	return (
		<BrowserRouter basename={basename}>
			<>
				<Connection/>
				{credentials.memclem && credentials.memclid ? (
					<RouterLogged />
				) : (
					<RouterLoggedOut />
				)}
			</>
		</BrowserRouter>
	)
}