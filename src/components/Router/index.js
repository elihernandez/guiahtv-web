import React, {useState, useEffect, useContext} from 'react';
import {CheckAuth} from './checkAuth'
import Info from '../../pages/Info/index'
import {useAuth} from '../../hooks/useAuth'
import Login from '../../pages/Login/index'
import HomePage from '../../pages/HomePage/index'
import UserContext from '../../context/UserContext'
import {Switch, Route, Redirect} from "react-router-dom";
import {LoaderSpinnerBlue as Loader} from '../Loaders/Loaders'
import PageNotFound from '../../pages/404/index'

export default function BaseRouter(){
    const cookies = useAuth()
    const [userAuth, setUserAuth] = useState(null)
    const {user, setUser} = useContext(UserContext)
    
    useEffect(() => {
        setUserAuth(cookies)
        setUser(cookies)
    })

    return (
        <>
        { 
            userAuth 
            ?   <Switch>
                        <Route exact path="/">
                            {cookies.memclid ? <Redirect to='/inicio'/> : <Info/>}  
                        </Route>

                        <Route exact path="/inicio">
                            <CheckAuth>
                                <HomePage/>
                            </CheckAuth>
                        </Route>

                        <Route path="/login">
                            {cookies.memclid ? <Redirect to='/inicio'/> : <Login/>}   
                        </Route>

                        <Route path="/registro">
                            <CheckAuth>
                                <HomePage/>
                            </CheckAuth>  
                        </Route>
                        <Route path="*">
                            <PageNotFound/>
                        </Route>
                </Switch> 
            :   <Loader/>
        }
        </>
    )
}