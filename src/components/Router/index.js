import React, { useEffect, useContext } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { CheckAuth } from "./checkAuth";
import { useAuth } from "../../hooks/useAuth";
import Info from "../../pages/Info/index";
import Login from "../../pages/Login/index";
import HomePage from "../../pages/HomePage/index";
import PageNotFound from "../../pages/404/index";

export default function BaseRouter() {
    const cookies = useAuth();
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        setUser(cookies);
    });

    return (
        <HashRouter>
            <Switch>
                <Route exact path="/">
                    {cookies.memclid ? <Redirect to="/inicio" /> : <Info />}
                </Route>

                <Route exact path="/inicio">
                    <CheckAuth>
                        <HomePage />
                    </CheckAuth>
                </Route>

                <Route path="/login">
                    {cookies.memclid ? <Redirect to="/inicio" /> : <Login />}
                </Route>

                <Route path="/registro">
                    <CheckAuth>
                        <HomePage />
                    </CheckAuth>
                </Route>
                <Route path="*">
                    <PageNotFound />
                </Route>
            </Switch>
        </HashRouter>
    );
}
