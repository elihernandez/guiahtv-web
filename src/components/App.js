import React from 'react'
import { BaseRouter } from '../router/index'
import { CookiesProvider } from 'react-cookie' 
import { UserContextProvider } from '../context/UserContext'
import '../styles/app.css'

export const App = () => {
	return (
		<div className="app-content">
			<CookiesProvider>         
				<UserContextProvider>
					<BaseRouter/>
				</UserContextProvider>
			</CookiesProvider>
		</div>    
	)
}