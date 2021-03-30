import React, { useEffect } from 'react'
import { VodContextProvider } from '../../context/VodContext'
import { Content } from './components/Content'
import { hideTopMenuNavbar, showTopMenuNavbar } from '../../js/TopMenu'
import './styles.css'

export function VideoOnDemand() {

	useEffect(() => {
		showTopMenuNavbar()

		return () => {
			hideTopMenuNavbar()
		}
	})

	return (
		<div className="wrapper-alacarta">
			<VodContextProvider>
				<Content />
			</VodContextProvider>
		</div>
	)
}