import React, { useState, useEffect } from 'react'
import './styles.css'

export function TitleChannel({ data, active }){
	const [name, setName] = useState('')

	useEffect(() => {
		if (active) setName(data.Name)
	}, [active])

	return (
		<div className="title-channel">
			<h3 className="text-info">Estás viendo:</h3>
			<h2 className="channel-name">{name}</h2>
		</div>
	)
}