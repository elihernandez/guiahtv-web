import React from 'react'
import './styles.css'

export default function WrapperInfo({children}){
    return (
      <div className="wrapper-home">
        {children}
      </div>
    )
}