import React, { useState } from 'react'
import { Button } from '../../../../components/Button/index'
import { Link } from '../../../../components/Link/index'

export function FormLogin({ onSubmit }) {
      const [username, setUsername] = useState('')
      const [password, setPassword] = useState('')
      const [check, setCheck] = useState(false)

      const handleSubmit = (e) => {
            e.preventDefault()
            onSubmit({ username, password, check })
      }

      return (
            <form className="login-form" onSubmit={handleSubmit}>
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
                  <Button type="submit" uppercase={true} color="gradient" size="full-width" classes="btn-submit-login body-2">Iniciar sesión</Button>
                  <div className="group-info">
                        <div className="group-rememberme row">
                        <input 
                              type="checkbox" 
                              id="checkbox-rememberme" 
                              className="input-checkbox" 
                              onChange={(e) => setCheck(e.nativeEvent.target.checked)} />
                        <label htmlFor="checkbox-rememberme">
                              <p className="body-3">Recuérdame</p>
                        </label>
                        </div>
                        <Link className="link-help body-3" href="https://guiah.tv/axs/ForgotPassword">¿Necesitas ayuda?</Link>
                  </div>
            </form>
      )
}