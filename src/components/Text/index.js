import React from 'react'

export function H1({className, children}){
      if(className){
            var classes = `${className} title-text`
      }else{
            var classes = `title-text`
      }

      return (
            <h1 className={classes}>
                  {children}
            </h1>
      )
}

export function H2({className, children}){
      if(className){
            var classes = `${className} subtitle-text`
      }else{
            var classes = `subtitle-text`
      }

      return (
            <h2 className={classes}>
                  {children}
            </h2>
      )
}