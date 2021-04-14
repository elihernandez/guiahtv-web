import React from 'react'
import './styles.css'

export function Button({
	children, 
	uppercase=false,
	color='primary',
	size='width-auto',
	classes,
	type
}){
	const className = `button-ui 
            ${uppercase ? 'uppercase' : ''}
            ${color}
            ${size}
            ${classes}
      `
	return(
		<button type={type} className={className}>{children}</button>
	)
}

export function ButtonUI({type, className, text}){
	return(
		<button type={type} className={className}>{text}</button>
	)
}