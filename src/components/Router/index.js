import React, { Fragment,  useEffect, useContext } from "react"
import { HashRouter, Switch, Route, Redirect, useRouteMatch, useParams } from "react-router-dom"
import UserContext from "../../context/UserContext"
import { TopMenu } from "../TopMenu/index"
import { useAuth } from "../../hooks/useAuth"
import { Info } from "../../pages/Info/index"
import { Login } from "../../pages/Login/index"
import { Home } from "../../pages/Home/index"
import { LiveTV } from "../../pages/LiveTV/index"
import { Page404 } from "../../pages/404/index"
import { Music } from "../../pages/Music/index"

function CheckAuth({children}){
    const cookies = useAuth();
    return (
        <Fragment>
            {cookies.memclid ? children : <Redirect to='/login'/>}      
        </Fragment>
    )
}

export default function BaseRouter() {
    const cookies = useAuth();
    const { setUserAuth } = useContext(UserContext);

    useEffect(() => {
        setUserAuth(cookies)
    })

    return (
        <>
            <HashRouter>
                <Switch>
                    <Route exact path="/">
                        {cookies.memclid ? <Redirect to="/inicio" /> : <Info />}
                    </Route>

                    <Route path="/registro">
                        <CheckAuth>
                            <Home />
                        </CheckAuth>
                    </Route>

                    <Route path="/login">
                        {cookies.memclid ? <Redirect to="/inicio" /> : <Login />}
                    </Route>

                    <Route exact path="/inicio">
                        <CheckAuth>
                            <TopMenu /> 
                            <Home />
                        </CheckAuth>
                    </Route>

                    <Route path="/tvenvivo">
                        <CheckAuth>
                            <TopMenu /> 
                            <LiveTV />
                        </CheckAuth>
                    </Route>

                    <Route path="/musica">
                        <CheckAuth>
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
