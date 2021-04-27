import React from 'react'
import './styles.css'

export function ButtonLoader({error, handleRequest, handleSendRequest}){

	const handleClick = () => {
		if(error){
			handleRequest()
		}else{
			handleSendRequest()
		}
	}

	return (
		<div className="content-button-guide">
			<button type="button" className="button-guide" onClick={handleClick}>
				{ error === 1 || !error &&
					<i className="far fa-angle-up" />
				}
				{	!error &&
					<p>Mostrar guía</p>
				}
				{	error === 1 &&
					<p>Volver a cargar guía</p>
				}
				{	error === 2 &&
					<p>No se pudo cargar el contenido</p>
				}
			</button>
		</div>
	)
}