import React from 'react'
import TransitionApp from '../Transitions/index'

export default function MainInfo({state, onClickButtonRegister, onClickLoginRegister}){
    return (
        // <TransitionApp state={state}>
            <div className="main-info">
                <div className="content-info">
                    <img className="image-logo" src="src/assets/images/logos/guiahtv/guiahtv-logo-purple.png"></img>
                </div>
                <div className="content-info">
                    <h2>Disfruta en donde quieras, cancela cuando quieras</h2>
                </div>
                <div className="content-info">
                    <h3>Disfruta en donde quieras, cancela cuando quieras</h3>
                </div>
                <div className="content-info">
                    <h4>Disfruta en donde quieras, cancela cuando quieras</h4>
                </div>
                <div className="content-info">
                    <button onClick={onClickButtonRegister}>Registarme</button>
                    <button onClick={onClickLoginRegister}>Iniciar sesión</button>
                </div>
            </div>
        // </TransitionApp>
    )
}