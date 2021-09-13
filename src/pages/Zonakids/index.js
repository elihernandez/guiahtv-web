import React from 'react'
import { VodContextProvider } from '../../context/VodContext'
import { Content } from './components/Content'
import './styles.css'

export function Zonakids() {
	return (
		<div className="wrapper-zonakids">
			<VodContextProvider>
				<Content />
			</VodContextProvider>
		</div>
	)
}