import React, { Fragment } from 'react'
import './styles.css'

export function Title({ editProfiles }){

	return(
		<Fragment>
			{   editProfiles
				?   <h1 className="title large-title-1">Editar perfiles</h1>
				:   <h1 className="title large-title-1">¿Quién eres?</h1>
			}
			{   editProfiles &&
                <h2 className="subtitle title-2">Selecciona un perfil para editar</h2>
			}
		</Fragment>
	)
}