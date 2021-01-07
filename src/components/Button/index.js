import React from 'react'
import './styles.css'

export function ButtonUI({type, className, text}){
      return(
            <button type={type} className={className}>{text}</button>
      )
}