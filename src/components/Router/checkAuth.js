import React from 'react';
import {useAuth} from '../../hooks/useAuth'
import {Route, Redirect} from "react-router-dom";

export function CheckAuth({children}){
    const cookies = useAuth()
    console.log(cookies)

    return (
      <>
      {cookies.memclid ? children : <Redirect to='/login'/>}     
      </> 
    )
}