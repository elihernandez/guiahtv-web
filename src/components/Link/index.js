import React from 'react'

export function Link({ className, href, children }) {
      const dataUia = `${className}-label`

      return (
            <a className={className} data-uia={dataUia} href={href} target="_blank">
                  {children}
            </a>
      )
}
