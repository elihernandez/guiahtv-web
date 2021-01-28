import React, { Fragment, useContext } from "react"
import { HashRouter, Switch, Route, Redirect } from "react-router-dom"
import UserContext from "../../context/UserContext"
import { TopMenu } from "../TopMenu/index"
import { Info } from "../../pages/Info/index"
import { Login } from "../../pages/Login/index"
import { Home } from "../../pages/Home/index"
import { LiveTV } from "../../pages/LiveTV/index"
import { Page404 } from "../../pages/404/index"
import { Music } from "../../pages/Music/index"
import { VideoOnDemand } from "../../pages/Vod/index"
import { Zonakids } from "../../pages/Zonakids/index"
import { ErrorAuth } from "../../pages/ErrorAuth/index"
import { useCookies } from 'react-cookie'
import { SnackbarAuth } from '../SnackbarAuth'

function CheckAuth({ children, credentials }) {
    return (
        <Fragment>
            {credentials.memclid
                ? <Fragment>
                    {children}
                    <SnackbarAuth />
                </Fragment>
                : <Redirect to='/login' />}
        </Fragment>
    )
}

export default function BaseRouter() {
    const [cookies, setCookie, removeCookie] = useCookies()
    const { stateUser } = useContext(UserContext)
    const { credentials, errorAuth } = stateUser

    if (errorAuth) {
        return <ErrorAuth message={errorAuth} />
    }

    if (credentials.length == 0) {
        return null
    }

    return (
        <>
            <HashRouter>
                <Switch>
                    <Route exact path="/">
                        {credentials.memclid
                            ? <CheckAuth credentials={credentials}>
                                <TopMenu />
                                <Home />
                            </CheckAuth>
                            : <Info />
                        }
                    </Route>

                    <Route path="/registro">
                        <CheckAuth credentials={credentials}>
                            <Home />
                        </CheckAuth>
                    </Route>

                    <Route path="/login">
                        {credentials.memclid ? <Redirect to="/" /> : <Login />}
                    </Route>

                    <Route path="/tv">
                        <CheckAuth credentials={credentials}>
                            <TopMenu />
                            <LiveTV />
                        </CheckAuth>
                    </Route>

                    <Route path="/alacarta">
                        <CheckAuth credentials={credentials}>
                            <TopMenu />
                            <VideoOnDemand />
                        </CheckAuth>
                    </Route>

                    <Route path="/zonakids">
                        <CheckAuth credentials={credentials}>
                            <TopMenu />
                            <Zonakids />
                        </CheckAuth>
                    </Route>

                    <Route path="/musica">
                        <CheckAuth credentials={credentials}>
                            <TopMenu />
                            <Music />
                        </CheckAuth>
                    </Route>

                    <Route exact path="/*">
                        <Page404 />
                    </Route>
                </Switch>
            </HashRouter>
        </>
    )
}
