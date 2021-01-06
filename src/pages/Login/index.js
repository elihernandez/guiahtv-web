import React, { useState, useContext } from 'react'
import { useCookies } from 'react-cookie';
import Logo from '../../components/Logo/index'
import getLogin from '../../services/getLogin'
import { useHistory } from "react-router-dom"
import encryptString from '../../js/Encrypt/encrypt'
import { LoaderSpinnerBlue as Loader } from '../../components/Loaders/Loaders'
import UserContext from '../../context/UserContext'
import './styles.css'

export default function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cookies, setCookie] = useCookies()
    const [loading, setLoading] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorDefault, setErrorDefault] = useState(false)
    const {user, setUser} = useContext(UserContext)
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        encryptString(password, 10).then(hashPassword => {
            console.log(hashPassword)
            return getLogin(username, btoa(hashPassword), user)
        }).then(data => {
            switch (data.ResponseCode) {
                case 0: // Usuario no encontrado
                    setLoading(false)
                    setErrorDefault(false)
                    setErrorPassword(false)
                    setErrorEmail(true)
                    break;
                case 2: // Usuario suscrito
                    setCookie('memclem', username, {path: '/'})
                    setCookie('memclid', data.SuscriberID, {path: '/'})
                    setUser(cookies)
                    history.push("/inicio");
                    break
                case 3: // Password incorrecta
                    setLoading(false)
                    setErrorDefault(false)
                    setErrorEmail(false)
                    setErrorPassword(true)
                    break
                default: // Error desconocido
                    setLoading(false)
                    setErrorPassword(false)
                    setErrorEmail(true)
                    setErrorDefault(false)
                    break
            }
        }).catch(err => { // Error en la petición del API
            console.log(err)
            setLoading(false)
            setErrorPassword(false)
            setErrorEmail(false)
            setErrorDefault(true)
        })
    }

    return (
        <>
        {
            loading 
            ?   <Loader/>
            :   <div className="login">
                    <div className="background-svg"></div>
                    <div className="background-image"></div>
                    <div className="content-form">
                        <Logo />
                        <h3>Inicia sesión</h3>
                        <form onSubmit={handleSubmit}>
                            {
                                errorDefault &&
                                <div className="group-form-error">
                                    <p>
                                    Ocurrió un problema inesperado. Vuelve a intentarlo.
                                    </p>
                                </div>
                            }
                            {
                                errorEmail &&
                                <div className="group-form-error">
                                    <p>
                                    No podemos encontrar una cuenta con esta dirección de email.
                                    Reinténtalo o <a href="https://guiah.tv/axs/registro">crea una cuenta nueva.</a>
                                    </p>
                                </div>
                            }
                            {
                                errorPassword &&
                                <div className="group-form-error">
                                    <p>
                                        <strong>Contraseña incorrecta.</strong> 
                                        &nbsp;Reinténtalo o <a href="https://guiah.tv/axs/ForgotPassword">restablece la contraseña.</a>
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
                            <button type="submit">Iniciar sesión</button>
                        </form>
                        <div className="group-info">
                            <div className="group-rememberme">
                                <input type="checkbox"></input>
                                <p>Recuérdame</p>
                            </div>
                            <a href="https://guiah.tv/axs/ForgotPassword">¿Necesitas ayuda?</a>
                        </div>
                        <p className="first-time">
                            ¿Primera vez en Guíah TV?{" "}
                            <a href="https://guiah.tv/axs/registro">Registrarme</a>
                        </p>
                    </div>
                </div>
        }
        </>
    )
}