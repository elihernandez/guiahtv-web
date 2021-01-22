import React, { Fragment, useContext, useEffect } from "react"
import { HashRouter, Switch, Route, Redirect } from "react-router-dom"
import UserContext from "../../context/UserContext"
import { TopMenu } from "../TopMenu/index"
import { Info } from "../../pages/Info/index"
import { Login } from "../../pages/Login/index"
import { Home } from "../../pages/Home/index"
import { LiveTV } from "../../pages/LiveTV/index"
import { Page404 } from "../../pages/404/index"
import { Music } from "../../pages/Music/index"
import { useCookies } from 'react-cookie'

function CheckAuth({ children, userAuth }) {
    return (
        <Fragment>
            {userAuth.memclid ? children : <Redirect to='/login' />}
        </Fragment>
    )
}

export default function BaseRouter() {
    const [cookies, setCookie] = useCookies()
    const { userAuth } = useContext(UserContext)

    useEffect(() => {
        
    }, [userAuth])

    return (
        <>
            <HashRouter>
                <Switch>
                    <Route exact path="/">
                        {userAuth.memclid
                            ? <CheckAuth userAuth={cookies}>
                                <TopMenu />
                                <Home />
                            </CheckAuth>
                            : <Info />
                        }
                    </Route>

                    <Route path="/registro">
                        <CheckAuth userAuth={cookies}>
                            <Home />
                        </CheckAuth>
                    </Route>

                    <Route path="/login">
                        {cookies.memclid ? <Redirect to="/" /> : <Login />}
                    </Route>

                    <Route path="/tv">
                        <CheckAuth userAuth={cookies}>
                            <TopMenu />
                            <LiveTV />
                        </CheckAuth>
                    </Route>

                    <Route path="/musica">
                        <CheckAuth userAuth={cookies}>
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
