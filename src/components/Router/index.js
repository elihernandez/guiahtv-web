import React, { Fragment, useContext } from "react"
import { BrowserRouter , HashRouter, Switch, Route, Redirect } from "react-router-dom"
import UserContext from "../../context/UserContext"
import { Header } from "../Header/index"
import { Info } from "../../pages/Info/index2"
import { Login } from "../../pages/Login/index"
import { Home } from "../../pages/Home/index"
import { LiveTV } from "../../pages/LiveTV/index"
import { VideoOnDemand } from "../../pages/Vod/index"
import { Radio } from "../../pages/Radio/index"
import { Music } from "../../pages/Music/index"
import { Zonakids } from "../../pages/Zonakids/index"
import { Page404 } from "../../pages/404/index"
import { ErrorAuth } from "../../pages/ErrorAuth/index"
import { SnackbarAuth } from '../SnackbarAuth'
import { GetApp } from '../../pages/GetApp'
import { isBrowser, isMobile } from "react-device-detect"
import { isAuth } from '../../js/Auth'

function CheckAuth({ children, credentials }) {
    return (
        <CheckDevice>
            <Fragment>
                {credentials.memclid
                    ? <Fragment>
                        <Header />
                        <main className="section-content">
                            {children}
                        </main>
                        <SnackbarAuth />
                    </Fragment>
                    : <Redirect to='/login' />
                }
            </Fragment>
        </CheckDevice>
    )
}

function CheckDevice({ children }) {
    return (
        <Fragment>
            {isBrowser &&
                children
            }
            {isMobile &&
                <Redirect to="/obtener-app" />
            }
        </Fragment>
    )
}

export default function BaseRouter() {
    const { stateUser } = useContext(UserContext)
    const { credentials, errorAuth } = stateUser

    if (errorAuth) return <ErrorAuth message={errorAuth} />

    return (
        <BrowserRouter basename="/GuiahTv-1.1.0">
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

                <Route path="/zonakids">
                    <CheckAuth credentials={credentials}>
                        <Zonakids />
                    </CheckAuth>
                </Route>

                <Route path="/musica">
                    <CheckAuth credentials={credentials}>
                        <Music />
                    </CheckAuth>
                </Route>

                <Route path="/radio">
                    <CheckAuth credentials={credentials}>
                        <Radio />
                    </CheckAuth>
                </Route>

                <Route path="/obtener-app">
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