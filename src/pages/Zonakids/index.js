import React from 'react'
import { VodContextProvider } from '../../context/VodContext'
import { Content } from './components/Content'
import { exitFullScreen, isFullScreenElement } from '../../js/Screen'
import { useAxios } from '../../hooks/useAxios'
import './styles.css'

export function Zonakids() {
	const { error } = useAxios('catalogue-zonakids')
	return (
		error ? (<div className="content-error">{error}</div>) : (
			<div className="wrapper-zonakids">
				<VodContextProvider>
					<Content />
				</VodContextProvider>
			</div>
		)
	)
}