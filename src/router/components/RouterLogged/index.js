import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { isBrowser, isMobile } from 'react-device-detect'
import { Home } from '../../../pages/Home'
import { LiveTV } from '../../../pages/LiveTV'
import { VideoOnDemand } from '../../../pages/Vod'
import { Radio } from '../../../pages/Radio'
import { Music } from '../../../pages/Music'
import { Zonakids } from '../../../pages/Zonakids'
import { ProfilesPage } from '../../../pages/Profiles'
import { SearchPage } from '../../../pages/Search'
import { GetApp } from '../../../pages/GetApp'
import { Page404 } from '../../../pages/404'
import { Main } from '../../../components/Main'
import { CheckDevice } from '../CheckDevice'

export const RouterLogged = () => {
	return (
		<Switch>
			<Route exact path="/">
				<CheckDevice>
					<Main>
						<Home />
					</Main>
				</CheckDevice>
			</Route>

			<Route path="/login">
				<Redirect to="/" />
			</Route>

			<Route path="/tv">
				<CheckDevice>
					<Main>
						<LiveTV />
					</Main>
				</CheckDevice>
			</Route>

			<Route path="/alacarta">
				<CheckDevice>
					<Main>
						<VideoOnDemand />
					</Main>
				</CheckDevice>
			</Route>

			<Route path="/radio">
				<CheckDevice>
					<Main>
						<Radio />
					</Main>
				</CheckDevice>
			</Route>

			<Route path="/musica">
				<CheckDevice>
					<Main>
						<Music />
					</Main>
				</CheckDevice>
			</Route>

			<Route path="/zonakids">
				<CheckDevice>
					<Main>
						<Zonakids />
					</Main>
				</CheckDevice>
			</Route>

			<Route path="/perfiles">
				<CheckDevice>
					<ProfilesPage />
				</CheckDevice>
			</Route>

			<Route exact path="/busqueda">
				<CheckDevice>
					<Main>
						<SearchPage />
					</Main>
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