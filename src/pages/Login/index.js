import React, { Fragment, useState, useContext, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import Logo from '../../components/Logo/index'
import { getLogin } from '../../services/getLogin'
import encryptString from '../../js/Encrypt/encrypt'
import { LoaderSpinnerMUI } from '../../components/Loader/index'
import { Link } from '../../components/Link/index'
import { ButtonUI } from '../../components/Button/index'
import { H1 } from '../../components/Typography/index'
import UserContext from '../../context/UserContext'
import { CSSTransition } from 'react-transition-group'
import './styles.css'

function GroupFormError({ error }) {

    if (error.default) {
        return (
            <div className="group-form-error">
                <p className="text-error">
                    Ocurrió un problema inesperado. Vuelve a intentarlo.
            </p>
            </div>
        )
    }

    if (error.email) {
        return (
            <div className="group-form-error">
                <p className="text-error">
                    No podemos encontrar una cuenta con esta dirección de email.
            Reinténtalo o <Link className="link-error" href="https://guiah.tv/axs/registro">crea una cuenta nueva.</Link>
                </p>
            </div>
        )
    }

    if (error.password) {
        return (
            <div className="group-form-error">
                <p className="text-error">
                    <strong>Contraseña incorrecta.</strong>
                &nbsp;Reinténtalo o <Link className="link-error" href="https://guiah.tv/axs/ForgotPassword">restablece la contraseña.</Link>
                </p>
            </div>
        )
    }

    if (error.limit) {
        return (
            <div className="group-form-error">
                <p className="text-error">
                    Excedes el límite de dispositivos permitidos. <Link className="link-error" href="https://guiah.tv/axs/Login">Revisa tu cuenta.</Link>
                </p>
            </div>
        )
    }

    return null
}

function expirationSession(check) {
    if (check) {
        return 60 * 60 * 24 * 365
    }

    return 60 * 60 * 24
}

export function Login() {
    const [show, setShow] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [check, setCheck] = useState(false)
    const [cookies, setCookie] = useCookies()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({ default: false, email: false, password: false, limit: false })
    const { stateUser } = useContext(UserContext)
    const { credentials } = stateUser

    const validateResponse = ({ ResponseCode, SuscriberID = "error" }) => {
        switch (ResponseCode) {
            case 0: // Usuario no encontrado
                setLoading(false)
                setError({
                    email: true,
                    password: false,
                    limit: false,
                    default: false,
                })
                break;
            case 2: // Usuario suscrito
                setCookie('memclem', username, { path: '/', maxAge: expirationSession(check) })
                setCookie('memclid', SuscriberID, { path: '/', maxAge: expirationSession(check) })
                location.reload()
                break
            case 3: // Password incorrecta
                setLoading(false)
                setError({
                    email: false,
                    password: true,
                    limit: false,
                    default: false
                })
                break
            case 6: // Excede límite de dispositivos permitidos
                setLoading(false)
                setError({
                    email: false,
                    password: false,
                    limit: true,
                    default: false
                })
                break
            default: // Error desconocido
                setLoading(false)
                setError({
                    email: false,
                    password: false,
                    limit: false,
                    default: true
                })
                break
        }
    }

    const requestLogin = async () => {
        try {
            const hashPassword = await encryptString(password, 10)
            const response = await getLogin(username, btoa(hashPassword), credentials)
            validateResponse(response)
        } catch (e) {
            console.log(e)
            setLoading(false)
            setError({
                email: false,
                password: false,
                limit: false,
                default: true
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        requestLogin()
    }

    const handleChange = (e) => {
        setCheck(e.nativeEvent.target.checked)
    }

    useEffect(() => {
        setShow(true)
    }, [])

    return (
        <CSSTransition in={show} timeout={50} classNames="fade-50" unmountOnExit>
            <div className="wrapper-login">
                {
                    loading
                        ? <LoaderSpinnerMUI />
                        : <Fragment>
                            <div className="background-svg" />
                            <div className="background-image" />
                            <div className="content-form">
                                <Logo color="blue" size="md" />
                                <form className="login-form" onSubmit={handleSubmit}>
                                    <H1 className="title-form title-1">Inicia sesión</H1>
                                    <GroupFormError error={error} />
                                    <div className="group-form">
                                        <label htmlFor="username" />
                                        <input
                                            type="text"
                                            className="username body-2"
                                            name="username"
                                            id="username"
                                            placeholder="Correo electrónico"
                                            value={username}
                                            autoComplete="on"
                                            required
                                            autoFocus
                                            data-uia="login-field"
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="group-form">
                                        <label htmlFor="password" />
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="password body-2"
                                            placeholder="Contraseña"
                                            autoComplete="on"
                                            required
                                            data-uia="login-field"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <ButtonUI type="submit" className="gradient-background uppercase btn-submit-login body-2" text="Iniciar sesión" />
                                </form>
                                <div className="group-info">
                                    <div className="group-rememberme row">
                                        <input type="checkbox" id="checkbox-rememberme" className="input-checkbox" onChange={handleChange} />
                                        <label htmlFor="checkbox-rememberme">
                                            <p className="body-3">Recuérdame</p>
                                        </label>
                                    </div>
                                    <Link className="link-help body-3" href="https://guiah.tv/axs/ForgotPassword">¿Necesitas ayuda?</Link>
                                </div>
                                <div className="bottom-info">
                                    <p className="body-3">¿Primera vez en Guíah TV?
                                        <Link className="link-register body-2" href="https://guiah.tv/axs/registro">Registrarme</Link>
                                    </p>
                                </div>
                            </div>
                        </Fragment>
                }
            </div>
        </CSSTransition>
    )
}