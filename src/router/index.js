import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { isBrowser, isMobile } from 'react-device-detect'
import UserContext from '../context/UserContext'
import { Info } from '../pages/Info'
import { Login } from '../pages/Login'
import { Home } from '../pages/Home'
import { LiveTV } from '../pages/LiveTV'
import { VideoOnDemand } from '../pages/Vod'
import { Radio } from '../pages/Radio'
import { Music } from '../pages/Music'
import { Zonakids } from '../pages/Zonakids'
import { ProfilesPage } from '../pages/Profiles'
import { SearchPage } from '../pages/Search'
import { ErrorAuth } from '../pages/ErrorAuth'
import { GetApp } from '../pages/GetApp'
import { Page404 } from '../pages/404'
import { isAuth } from '../js/Auth'
import { CheckAuth } from './components/CheckAuth'
import { CheckDevice } from './components/CheckDevice'
import { devBasenameRouter, prodBasenameRouter } from '../../config'
const basename = process.env.NODE_ENV !== 'production' ? devBasenameRouter : prodBasenameRouter

export function BaseRouter() {
	const { stateUser } = useContext(UserContext)
	const { credentials, errorAuth } = stateUser

	if (errorAuth) return <ErrorAuth message={errorAuth} />

	return (
		<BrowserRouter basename={basename}>
			<Switch>
				<Route exact path="/">
					{isAuth(credentials)
						? <CheckAuth credentials={credentials}>
							<Home />
						</CheckAuth>
						: <CheckDevice>
							<Info />
						</CheckDevice>
					}
				</Route>

				<Route path="/login">
					{credentials.memclid ? <Redirect to="/" /> : <Login />}
				</Route>

				<Route path="/tv">
					<CheckAuth credentials={credentials}>
						<LiveTV />
					</CheckAuth>
				</Route>

				<Route path="/alacarta">
					<CheckAuth credentials={credentials}>
						<VideoOnDemand />
					</CheckAuth>
				</Route>

				<Route path="/radio">
					<CheckAuth credentials={credentials}>
						<Radio />
					</CheckAuth>
				</Route>

				<Route path="/musica">
					<CheckAuth credentials={credentials}>
						<Music />
					</CheckAuth>
				</Route>

				<Route path="/zonakids">
					<CheckAuth credentials={credentials}>
						<Zonakids />
					</CheckAuth>
				</Route>

				<Route path="/perfiles">
					<CheckAuth credentials={credentials}>
						<ProfilesPage />
					</CheckAuth>
				</Route>

				<Route exact path="/busqueda">
					<CheckAuth credentials={credentials}>
						<SearchPage />
					</CheckAuth>
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
		</BrowserRouter>
	)
}