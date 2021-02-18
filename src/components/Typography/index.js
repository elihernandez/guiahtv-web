import React from 'react'
import './styles.css'

export function H1({className, children}){
      let classes = `${className}`

      return (
            <h1 className={classes}>
                  {children}
            </h1>
      )
}

export function H2({className, children}){
      let classes = `${className}`

      return (
            <h2 className={classes}>
                  {children}
            </h2>
      )
}

export function H3({className, children}){
      let classes = `${className}`

      return (
            <h3 className={classes}>
                  {children}
            </h3>
      )
}

export function H4({className, children}){
      let classes = `${className}`

      return (
            <h4 className={classes}>
                  {children}
            </h4>
      )
}

export function H5({className, children}){
      let classes = `${className}`

      return (
            <h5 className={classes}>
                  {children}
            </h5>
      )
}

export function H6({className, children}){
      let classes = `${className}`

      return (
            <h6 className={classes}>
                  {children}
            </h6>
      )
}