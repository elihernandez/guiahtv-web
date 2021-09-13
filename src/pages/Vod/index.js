import React from 'react'
import { VodContextProvider } from '../../context/VodContext'
import { Content } from './components/Content'
import './styles.css'

export function VideoOnDemand() {
	return (
		<div className="wrapper-alacarta">
			<VodContextProvider>
				<Content />
			</VodContextProvider>
		</div>
	)
}