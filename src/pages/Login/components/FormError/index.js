import React from 'react'
import './styles.css'

export function FormError({ error }) {

      if (error) {
            return (
                  <div className="group-form-error">
                        { error}
                  </div>
            )
      }

      return null
}