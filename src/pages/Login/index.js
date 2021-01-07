import React, { useState, useContext } from 'react'
import { useCookies } from 'react-cookie';
import Logo from '../../components/Logo/index'
import {getLogin} from '../../services/getLogin'
import { useHistory } from "react-router-dom"
import encryptString from '../../js/Encrypt/encrypt'
import { LoaderSpinnerBlue as Loader } from '../../components/Loaders/Loaders'
import UserContext from '../../context/UserContext'
import './styles.css'

export function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cookies, setCookie] = useCookies()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({ default: false, email: false, password: false })
    const {user, setUser} = useContext(UserContext)
    const history = useHistory()

    const validateResponse = (data) => {
        switch (data.ResponseCode) {
            case 0: // Usuario no encontrado
                setLoading(false)
                setError({
                    email: true, 
                    password: false, 
                    default: false, 
                })
                break;
            case 2: // Usuario suscrito
                setCookie('memclem', username, {path: '/'})
                setCookie('memclid', data.SuscriberID, {path: '/'})
                setUser(cookies)
                history.push("/inicio");
                break
            case 3: // Password incorrecta
                setLoading(false)
                setError({
                    email: false, 
                    password: true, 
                    default: false
                })
                break
            default: // Error desconocido
                setLoading(false)
                setError({
                    email: false, 
                    password: false, 
                    default: true
                })
                break
        }
    }

    const requestLogin = async () => {
        try {
            const hashPassword = await encryptString(password, 10)
            const response = await getLogin(username, btoa(hashPassword), user)
            validateResponse(response)
        } catch (e) {
            console.log(e)
            setLoading(false)
            setErrorPassword(false)
            setErrorEmail(false)
            setErrorDefault(true)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        requestLogin()
    }

    return (
        <>
        {
            loading 
            ?   <Loader/>
            :   <div className="login">
                    <div className="background-svg" />
                    <div className="background-image" />
                    <div className="content-form">
                        <Logo />
                        <form onSubmit={handleSubmit}>
                            <h3 className="title-form">Inicia sesión</h3>
                            {
                                error.default &&
                                <div className="group-form-error">
                                    <p className="text-error">
                                    Ocurrió un problema inesperado. Vuelve a intentarlo.
                                    </p>
                                </div>
                            }
                            {
                                error.email &&
                                <div className="group-form-error">
                                    <p className="text-error">
                                    No podemos encontrar una cuenta con esta dirección de email.
                                    Reinténtalo o <a className="link-error" data-uia="link-error-label" href="https://guiah.tv/axs/registro">crea una cuenta nueva.</a>
                                    </p>
                                </div>
                            }
                            {
                                error.password &&
                                <div className="group-form-error">
                                    <p className="text-error">
                                        <strong>Contraseña incorrecta.</strong> 
                                        &nbsp;Reinténtalo o <a className="link-error" data-uia="link-error-label" href="https://guiah.tv/axs/ForgotPassword">restablece la contraseña.</a>
                                    </p>
                                </div>
                            }
                            <div className="group-form">
                                <input
                                    type="text"
                                    className="username"
                                    placeholder="Correo electrónico"
                                    value={username}
                                    autoComplete="username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="group-form">
                                <input 
                                    type="password"
                                    className="password"
                                    placeholder="Contraseña"
                                    autoComplete="current-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn-submit-login">Iniciar sesión</button>
                        </form>
                        <div className="group-info">
                            <div className="group-rememberme row">
                                <input type="checkbox" className="input-checkbox"></input>
                                <p>Recuérdame</p>
                            </div>
                            <a className="link-help" data-uia="link-help-label" href="https://guiah.tv/axs/ForgotPassword">¿Necesitas ayuda?</a>
                        </div>
                        <div className="bottom-info">
                            <p>
                                ¿Primera vez en Guíah TV?
                                <a className="link-register" data-uia="link-register-label" href="https://guiah.tv/axs/registro">Registrarme</a>
                            </p>
                        </div>
                    </div>
                </div>
        }
        </>
    )
}