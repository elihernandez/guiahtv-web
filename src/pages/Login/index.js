import React, { Fragment, useState, useContext, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { CSSTransition } from 'react-transition-group'
import Logo from '../../components/Logo/index'
import { FormLogin } from './components/Form'
import { FormError } from './components/FormError'
import { Link } from '../../components/Link/index'
import { H1 } from '../../components/Typography/index'
import { LoaderSpinnerMUI } from '../../components/Loader/index'
import UserContext from '../../context/UserContext'
import { getLogin } from '../../services/getLogin'
import encryptString from '../../js/Encrypt/encrypt'
import './styles.css'

export function Login() {
    const [show, setShow] = useState(false)
    const [cookies, setCookie] = useCookies()
    const [loading, setLoading] = useState(false)
    const { stateUser } = useContext(UserContext)
    const { credentials } = stateUser
    const [error, setError] = useState(null)

    const validateResponse = ({ ResponseCode, SuscriberID = "error" }, username, check) => {
        switch (ResponseCode) {
            case 0: // Usuario no encontrado
                setLoading(false)
                // Se muestra mensaje de error
                setError(<p className="text-error">
                    No podemos encontrar una cuenta con esta dirección de email.
                    Reinténtalo o <Link className="link-error" href="https://guiah.tv/axs/registro">crea una cuenta nueva.</Link>
                </p>)

                break;
            case 2: // Usuario suscrito
                // Se guardan cookies de credenciales
                setCookie('memclem', username, { path: '/', maxAge: `${check ? 60 * 60 * 24 * 365 : 60 * 60 * 24}` })
                setCookie('memclid', SuscriberID, { path: '/', maxAge: `${check ? 60 * 60 * 24 * 365 : 60 * 60 * 24}` })
                location.reload()
                break
            case 3: // Password incorrecta
                setLoading(false)
                // Se muestra mensaje de error
                setError(<p className="text-error">
                    <strong>Contraseña incorrecta.</strong>
                    &nbsp;Reinténtalo o <Link className="link-error" href="https://guiah.tv/axs/ForgotPassword">restablece la contraseña.</Link>
                </p>)
                break
            case 6: // Excede límite de dispositivos permitidos
                setLoading(false)
                // Se muestra mensaje de error
                setError(<p className="text-error">
                    Excedes el límite de dispositivos permitidos. <Link className="link-error" href="https://guiah.tv/axs/Login">Revisa tu cuenta.</Link>
                </p>)
                break
            default: // Error desconocido
                setLoading(false)
                // Se muestra mensaje de error
                setError(<p className="text-error">Ocurrió un problema inesperado. Vuelve a intentarlo.</p>)
                break
        }
    }

    const requestLogin = async (username, password, check) => {
        try {
            setLoading(true)
            // Encriptación de password
            const hashPassword = await encryptString(password, 10)
            // Petición a Endpoint para validar credenciales
            const response = await getLogin(username, btoa(hashPassword), credentials)
            // Validación de respuesta el server
            validateResponse(response, username, check)
        } catch (e) {
            setLoading(false)
            // Se muestra mensaje de error
            setError(<p className="text-error">Ocurrió un problema inesperado. Vuelve a intentarlo.</p>)
        }
    }

    const handleSubmit = ({ username, password, check }) => {
        requestLogin(username, password, check)
    }

    useEffect(() => {
        setShow(true)
    }, [])

    return (
        <CSSTransition in={show} timeout={50} classNames="fade-50" unmountOnExit>
            <div className="wrapper-login">
                {loading
                    ? <LoaderSpinnerMUI />
                    : <Fragment>
                        <div className="content-login">
                            <Logo color="blue" size="md" />
                            <H1 className="title-form title-1">Inicia sesión</H1>
                            <FormError error={error} />
                            <FormLogin onSubmit={handleSubmit} />
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