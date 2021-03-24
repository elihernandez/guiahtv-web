import React, { Fragment, useState, useEffect, useRef } from 'react'
import { Item } from '../ListItem'
const cssTransition = require('css-transition')
import './styles.css'

function getPages(cmData, maxItems) {
	let pages = cmData.length / maxItems

	if (pages % 1 != 0) {
		pages = Math.ceil(pages)
	}

	return pages
}

export function List({ data, listType }) {
	let List = () => null

	switch (listType) {
	case 'catalogue':
		List = <ListCatalogue data={data} listType={listType} />
		break
	case 'season':
		List = <ListSeason data={data} listType={listType} />
		break
	case 'radio':
		List = <ListRadio data={data} listType={listType} />
		break
	case 'channel':
		List = <ListChannel data={data} listType={listType} />
		break
	}

	return List
}

export function ListCatalogue({ data, listType }) {
	const { category, poster_type, cmData } = data
	const totalPages = poster_type == 0 ? getPages(cmData, 7) : getPages(cmData, 5)
	const classes = poster_type == 0 ? 'list list-catalogue portrait' : 'list  list-catalogue landscape'
	const refList = useRef()

	return (
		<div className={classes}>
			<TitleList title={category} />
			<div className="list-content">
				<div className="list-items" ref={refList}>
					{
						cmData.map((data) => {
							return <Item key={data.Registro} data={data} posterType={poster_type} listType={listType} titleCategory={category} />
						})
					}
				</div>
				<DirectionsPage totalPages={totalPages} refList={refList} />
			</div>
		</div>
	)
}

export function ListSeason({ data, listType }) {
	const { category, poster_type, cmData } = data
	const classes = poster_type == 0 ? 'list list-season wrap portrait' : 'list list-season wrap landscape'
	const refList = useRef()

	return (
		<div className={classes}>
			<TitleList title={category} />
			<div className="list-content">
				<div className="list-items" ref={refList}>
					{
						cmData.map((data) => {
							return <Item key={data.Registro} data={data} posterType={poster_type} listType={listType} />
						})
					}
				</div>
			</div>
		</div>
	)
}

export function ListCards({ data, listType, listStyle }) {
	let pages = 0
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const { category, poster_type, cmData } = data
	const classes = poster_type == 0 ? 'list-cards portrait' : 'list-cards landscape'
	const refList = useRef()

	const handleClickPrev = () => {
		let moveP = 100 * (page - 2)
		cssTransition(refList.current, {
			transform: `translate3d(-${moveP}%, 0, 0)`
		}, 500, function () {
			setPage(page - 1)
		})
	}

	const handleClickRight = () => {
		let moveP = 100 * (page)
		cssTransition(refList.current, {
			transform: `translate3d(-${moveP}%, 0, 0)`
		}, 500, function () {
			setPage(page + 1)
		})
	}

	useEffect(() => {
		if (poster_type == 0) {
			pages = cmData.length / 7
		} else {
			pages = cmData.length / 5
		}

		if (pages % 1 != 0) {
			pages = Math.ceil(pages)
		}

		if (pages > 1) {
			setTotalPages(pages)
		}
	}, [])

	return (
		<div className={classes}>
			<div className="list-content">
				<div className="list-items" ref={refList}>
					{
						cmData.map((data) => {
							return <Item key={data.Registro} data={data} posterType={poster_type} listType={listType} />
						})
					}
				</div>
				{
					totalPages > 1 && page > 1 && listType != 'season' &&
                              <div className="direction direction-prev" onClick={handleClickPrev}>
                              	<i className="fas fa-chevron-left" />
                              </div>
				}
				{
					(totalPages > 1) && (page < totalPages) && listType != 'season' &&
                              <div className="direction direction-next" onClick={handleClickRight}>
                              	<i className="fas fa-chevron-right" />
                              </div>
				}
			</div>
		</div>
	)
}

export function ListRadio({ data, listType }) {
	const { poster_type, cmData } = data
	const totalPages = poster_type == 0 ? getPages(cmData, 7) : getPages(cmData, 5)
	const classes = poster_type == 0 ? 'list list-card portrait' : 'list list-card landscape'
	const refList = useRef()

	return (
		<div className={classes}>
			<div className="list-content">
				<div className="list-items" ref={refList}>
					{
						cmData.map((data) => {
							return <Item key={data.Registro} data={data} posterType={poster_type} listType={listType} />
						})
					}
				</div>
				<DirectionsPage totalPages={totalPages} refList={refList} />
			</div>
		</div>
	)
}

export function ListChannel({ data, listType }) {
	const { poster_type, cmData, category } = data
	const totalPages = poster_type == 0 ? getPages(cmData, 7) : getPages(cmData, 5)
	const classes = poster_type == 0 ? 'list list-card portrait' : 'list list-card landscape'
	const refList = useRef()

	return (
		<div className={classes}>
			<div className="list-content">
				<div className="list-items" ref={refList}>
					{
						cmData.map((data) => {
							return <Item key={data.Registro} data={data} category={category} posterType={poster_type} listType={listType} />
						})
					}
				</div>
				<DirectionsPage totalPages={totalPages} refList={refList} />
			</div>
		</div>
	)
}

export function TitleList({ title }) {
	return <h6 className="title-list">{title}</h6>
}

function DirectionsPage({ totalPages, refList }) {
	const [page, setPage] = useState(1)

	const handleClickPrev = () => {
		let moveP = 100 * (page - 2)
		cssTransition(refList.current, {
			transform: `translate3d(-${moveP}%, 0, 0)`
		}, 500, function () {
			setPage(page - 1)
		})
	}

	const handleClickRight = () => {
		let moveP = 100 * (page)
		cssTransition(refList.current, {
			transform: `translate3d(-${moveP}%, 0, 0)`
		}, 500, function () {
			setPage(page + 1)
		})
	}

	return (
		<Fragment>
			{
				totalPages > 1 && page > 1 &&
                        <div className="direction direction-prev" onClick={handleClickPrev}>
                        	<i className="fas fa-chevron-left" />
                        </div>
			}
			{
				(totalPages > 1) && (page < totalPages) &&
                        <div className="direction direction-next" onClick={handleClickRight}>
                        	<i className="fas fa-chevron-right" />
                        </div>
			}
		</Fragment>
	)
}