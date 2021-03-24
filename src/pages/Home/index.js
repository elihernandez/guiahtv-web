import React, { useEffect } from 'react'
import { Spotlight } from '../../components/Spotlight/index'
import { ButtonsMenu } from '../../components/ButtonsMenu/index'
import { hideTopMenuNavbar, showTopMenuNavbar } from '../../js/TopMenu'
import './styles.css'

export function Home() {

	useEffect(() => {
		hideTopMenuNavbar()

		return () => {
			showTopMenuNavbar()
		}
	}, [])

	return (
		<div className="wrapper-home top-header">
			<Spotlight />
			<ButtonsMenu />
		</div>
	)
}