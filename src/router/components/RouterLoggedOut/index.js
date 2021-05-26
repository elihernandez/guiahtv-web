import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { isBrowser, isMobile } from 'react-device-detect'
import { Info } from '../../../pages/Info'
import { Login } from '../../../pages/Login'
import { GetApp } from '../../../pages/GetApp'
import { Page404 } from '../../../pages/404'
import { CheckDevice } from '../CheckDevice'

export const RouterLoggedOut = () => {
	return (
		<Switch>
			<Route exact path="/">
				<CheckDevice>
					<Info />
				</CheckDevice>
			</Route>

			<Route path="/login">
				<CheckDevice>
					<Login />
				</CheckDevice>
			</Route>

			<Route exact path="/obtener-app">
				{isBrowser &&
					<Redirect to="/" />
				}
				{isMobile &&
					<GetApp />
				}
			</Route>

			<Route path="*">
				<Page404 />
			</Route>
		</Switch>
	)
}