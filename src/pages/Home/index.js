import React from 'react'
import { Spotlight } from '../../components/Spotlight/index'
import { ButtonsMenu } from '../../components/ButtonsMenu/index'
import './styles.css'

export function Home() {
	return (
		<div className="wrapper-home top-header">
			<Spotlight />
			<ButtonsMenu />
		</div>
	)
}