import React from 'react';
import BaseRouter from './Router/index'
import {UserContextProvider} from '../context/UserContext'
import '../scss/app.css'
import '../scss/style-base.css'
import '../scss/fonts/HurmeGeometricSans/styles.css'
import '../scss/fonts/Roboto/styles.css'
import '../scss/fonts/Poppins/styles.css'

export default function App() {

    return (
        <div className="app">
            <div className="gradient-overlay"></div>
            <section className="section-content">
                <UserContextProvider>
                    <BaseRouter></BaseRouter>
                </UserContextProvider>
            </section>
        </div>
    )
}

