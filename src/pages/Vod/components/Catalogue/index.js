import React, { useState, useEffect } from 'react'
import { List } from '../../../../components/List'
import { CSSTransition } from 'react-transition-group'
import './styles.css'
import { useAxios } from '../../../../hooks/useAxios'

export function Catalogue({ data }) {
	const [show, setShow] = useState(false)
	const { error } = useAxios( 'catalogue-vod' )

	useEffect(() => {
		setShow(true)
	}, [])

	return (
		error ? (error) : (
			<CSSTransition in={show} timeout={100} classNames="fade" unmountOnExit>
				<div className="content-catalogue alacarta">
					{
						data.map((category) => {
							return <List key={category.category} data={category} listType="catalogue" wrap={false} />
						})
					}
				</div>
			</CSSTransition>
		)
		
	)
}