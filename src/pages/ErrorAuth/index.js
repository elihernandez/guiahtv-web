import React from 'react'
import { ButtonUI } from '../../components/Button'
import './styles.css'

export function ErrorAuth({ message }) {
      return (
            <div className="error-wrapper">
                  <div className="content">
                        <h1 className="error-message">{message}</h1>
                        <ButtonUI type="button" className="uppercase transparent white">Iniciar sesión</ButtonUI>
                  </div>
            </div>
      )
}