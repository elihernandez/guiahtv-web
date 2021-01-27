import React from 'react'
import './styles.css'
import { useCookies } from 'react-cookie'

export function ErrorAuth({ message }) {
      const [cookies, setCookie, removeCookie] = useCookies(['memclem', 'memclid'])

      const handleClick = () => {
            removeCookie('memclem', { path: '/' })
            removeCookie('memclid', { path: '/' })
            location.reload()
      }

      return (
            <div className="error-wrapper">
                  <div className="content">
                        <h1 className="error-message">{message}</h1>
                        <button type="button" className="uppercase transparent white" onClick={handleClick}>Iniciar sesión </button>
                  </div>
            </div>
      )
}