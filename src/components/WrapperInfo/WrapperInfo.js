import React from 'react'
import './styles.css'

export default function WrapperInfo({children}){
    return (
      <div className="wrapper-home">
        <div className="wrapper-background"></div>
        <div className="gradient-overlay"></div>
        {children}
      </div>
    )
}