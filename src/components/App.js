import React from 'react';
import BaseRouter from './Router/index'
import { CookiesProvider } from 'react-cookie'; 
import { UserContextProvider } from '../context/UserContext'
// require('spatial-navigation-js')
import '../scss/app.css'

export default function App() {
    return (
        <div className="app-content">
            <CookiesProvider>         
                <UserContextProvider>
                    <BaseRouter/>
                </UserContextProvider>
            </CookiesProvider>
        </div>    
    )
}

