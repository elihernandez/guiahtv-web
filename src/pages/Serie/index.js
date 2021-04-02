import React, { useState, useEffect } from 'react'
import { InfoSerie } from '../../components/InfoContent'
import { TabsContent } from './components/Tabs'
import { CSSTransition } from 'react-transition-group'
import { showTopMenu } from '../../js/TopMenu'

export function ContentSerie({data}){
	const [show, setShow] = useState(false)
	const { ContentTypeOrder, ContactID } = data

	useEffect(() => {
		setShow(true)
		showTopMenu()
	}, [])

	return (
		<CSSTransition in={show} timeout={300} classNames="fade" unmountOnExit>
			<div className="serie-info info-wrapper">
				<InfoSerie data={data}/>
				<TabsContent serieId={ContentTypeOrder} contactId={ContactID} />
			</div>
		</CSSTransition>
	)
}