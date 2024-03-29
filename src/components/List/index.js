import React, { useState, useEffect } from 'react'
import { Item } from '../ListItem'
import { SlickSlider } from '../SlickCarousel'
import { v4 as uuid } from 'uuid'
import { useAxios } from '../../hooks/useAxios'
import './styles.css'

export function List({ data, listType, wrap, indexList, tabValues }) {
	let List = () => null

	switch (listType) {
	case 'catalogue':
		List = <ListCatalogue data={data} listType={listType} wrap={wrap} />
		break
	case 'season':
		List = <ListSeason data={data} listType={listType} wrap={wrap} />
		break
	case 'radio':
		List = <ListRadio data={data} listType={listType} indexList={indexList} tabValues={tabValues} />
		break
	case 'channel':
		List = <ListChannel data={data} listType={listType} indexList={indexList} tabValues={tabValues} />
		break
	case 'tracks':
		List = <ListCollectionTracks data={data} listType={listType} indexList={indexList} tabValues={tabValues} />
		break
	case 'playlists':
		List = <ListPlaylists data={data} listType={listType} indexList={indexList} tabValues={tabValues} />
		break
	case 'myplaylists':
		List = <ListPlaylists data={data} listType={listType} indexList={indexList} tabValues={tabValues} />
		break
	case 'albums':
		List = <ListAlbums data={data} listType={listType} indexList={indexList} tabValues={tabValues} />
		break
	case 'tracksAlbum':
		List = <ListTracksAlbum data={data} listType='tracksAlbum' indexList={indexList} tabValues={tabValues} />
		break
	case 'tracksPlaylist':
		List = <ListTracksPlaylist data={data} listType='tracksPlaylist' indexList={indexList} tabValues={tabValues} />
		break
	case 'artists':
		List = <ListArtist data={data} listType='artist' indexList={indexList} tabValues={tabValues} />
		break
	}

	return List
}

export function ListCatalogue({ data, listType }) {
	const { category, poster_type } = data
	const slidesToShow = poster_type == 0 ? 7 : 5
	const classes = `list list-catalogue ${poster_type == 0 ? 'portrait' : 'landscape'}`

	const settings = {
		dots: false,
		infinite: false,
		slidesToShow: slidesToShow,
		slidesToScroll: slidesToShow,
		swipeToSlide: true,
		focusOnSelect: true,
		speed: 500
	}

	return (
		<div className={classes}>
			<TitleList title={category} />
			<SlickSlider settings={settings}>
				{data.cmData.map((dataItem) => {
					return (
						<Item key={dataItem.Registro} posterType={data.poster_type} data={dataItem} listType={listType} titleCategory={data.category} />
					)
				})}
			</SlickSlider>
		</div>
	)
}

export function ListSeason({ data, listType }) {
	const { category, poster_type, cmData } = data
	const classes = 'list list-season wrap landscape'

	return (
		<div className={classes}>
			<TitleList title={category} />
			<div className="list-content">
				<div className="list-items">
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

export function ListRadio({ data, listType, indexList, tabValues }) {
	const { category } = data
	const slidesToShow = 5
	const totalItems = data.cmData.length
	const initialSlide = getInitialSlide(totalItems, slidesToShow, indexList, tabValues)
	const classes = 'list list-card landscape'
	const [pageActive, setPageActive] = useState(null)
	
	const settings = {
		dots: false,
		infinite: false,
		slidesToShow: slidesToShow,
		slidesToScroll: slidesToShow,
		swipeToSlide: true,
		focusOnSelect: false,
		initialSlide: initialSlide,
		speed: 500,
		afterChange: current => setPageActive(current)
	}

	return (
		<div className={classes}>
			<TitleList title={category} />
			<TabsIndicators slidesToShow={slidesToShow} data={data.cmData} pageActive={pageActive} initialSlide={initialSlide} />
			<SlickSlider settings={settings}>
				{data.cmData.map((dataItem) => {
					return (
						<Item key={dataItem.Registro} posterType={data.poster_type} data={dataItem} listType={listType} titleCategory={data.category} />
					)
				})}
			</SlickSlider>
		</div>
	)
}

export function ListChannel({ data, listType, indexList, tabValues }) {
	const { category } = data
	const slidesToShow = 5
	const totalItems = data.cmData.length
	const initialSlide = getInitialSlide(totalItems, slidesToShow, indexList, tabValues)
	const classes = 'list list-card landscape'
	const [pageActive, setPageActive] = useState(null)
	
	const settings = {
		dots: false,
		infinite: false,
		slidesToShow: slidesToShow,
		slidesToScroll: slidesToShow,
		swipeToSlide: true,
		focusOnSelect: false,
		initialSlide: initialSlide,
		speed: 500,
		afterChange: current => setPageActive(current)
	}

	return (
		<div className={classes}>
			<TitleList title={category} />
			<TabsIndicators slidesToShow={slidesToShow} data={data.cmData} pageActive={pageActive} initialSlide={initialSlide} />
			<SlickSlider settings={settings}>
				{data.cmData.map((dataItem) => {
					return (
						<Item key={dataItem.Id ? dataItem.Id : dataItem.Registro} posterType={1} data={dataItem} listType={listType} titleCategory={data.category} />
					)
				})}
			</SlickSlider>
		</div>
	)
}

export function ListCollectionTracks({ data, listType, indexList, tabValues }) {
	const posterType = 2
	const slidesToShow = 7
	const classes = 'list list-tracks square'
	const { title, description } = data
	data.id = uuid()

	const settings = {
		dots: false,
		infinite: false,
		slidesToShow: slidesToShow,
		slidesToScroll: slidesToShow,
		swipeToSlide: true,
		focusOnSelect: true,
		speed: 500
	}

	return (
		<div className={classes}>
			<TitleList title={title} />
			{description && (
				<DescriptionList description={description} />
			)}
			<SlickSlider settings={settings}>
				{data.tracks.map((track) => {
					return (
						<Item key={track.regID} posterType={posterType} data={track} listType={listType} titleCategory={data.title} listTracks={data.tracks} collection={data} />
					)
				})}
			</SlickSlider>
		</div>
	)
}

export function ListPlaylists({ data, listType, indexList, tabValues }) {
	const posterType = 2
	const slidesToShow = 7
	const classes = 'list list-tracks square'
	const { title, description } = data

	const settings = {
		dots: false,
		infinite: false,
		slidesToShow: slidesToShow,
		slidesToScroll: slidesToShow,
		swipeToSlide: true,
		focusOnSelect: true,
		speed: 500
	}

	return (
		<div className={classes}>
			<TitleList title={title} />
			{description && (
				<DescriptionList description={description} />
			)}
			<SlickSlider settings={settings}>
				{data.playLists.map((playlist) => {
					return (
						<Item key={playlist.regID} posterType={posterType} data={playlist} listType={listType} titleCategory={data.title} listTracks={data.tracks} />
					)
				})}
			</SlickSlider>
		</div>
	)
}

export function ListAlbums({ data, listType, indexList, tabValues }) {
	const posterType = 2
	const slidesToShow = 7
	const classes = 'list list-tracks square'

	const settings = {
		dots: false,
		infinite: false,
		slidesToShow: slidesToShow,
		slidesToScroll: slidesToShow,
		swipeToSlide: true,
		focusOnSelect: true,
		speed: 500
	}

	return (
		<div className={classes}>
			<TitleList title='Álbumes' />
			<SlickSlider settings={settings}>
				{data.albums.map((album) => {
					return (
						<Item key={album.albumID} posterType={posterType} data={album} listType={listType} />
					)
				})}
			</SlickSlider>
		</div>
	)
}

export function ListTracksAlbum({ data, listType, indexList, tabValues }) {
	const posterType = 0
	const classes = 'list-tracks-album'

	return (
		<div className={classes}>
			<div className="header-table-tracks">
				<ul className="header">
					<li className="number-item">#</li>
					<li className="title-item">Título</li>
					<li className="time-item"><i className="fal fa-clock"></i></li>
					<li className="like-item"></li>
					<li className="menu-item"></li>
				</ul>
			</div>
			{data.tracks.map((track) => {
				return (
					<Item key={track.regID} posterType={posterType} data={track} listType={listType} />
				)
			})}
		</div>
	)
}

export function ListTracksPlaylist({ data, listType, indexList, tabValues }) {
	const posterType = 0
	const classes = 'list-tracks-album'

	return (
		<div className={classes}>
			<div className="header-table-tracks">
				<ul className="header">
					<li className="number-item">#</li>
					<li className="title-item">Título</li>
					<li className="album-item">Álbum</li>
					<li className="time-item"><i className="fal fa-clock"></i></li>
					<li className="like-item"></li>
					<li className="menu-item"></li>
				</ul>
			</div>
			{data.tracks.map((track, index) => {
				return (
					<Item key={track.regID} index={index} posterType={posterType} data={track} listType={listType} />
				)
			})}
		</div>
	)
}

export function ListArtist({ data, listType, indexList, tabValues }) {
	const posterType = 2
	const slidesToShow = 7
	const classes = 'list list-tracks square'
	const { title, description } = data
	
	const settings = {
		dots: false,
		infinite: false,
		slidesToShow: slidesToShow,
		slidesToScroll: slidesToShow,
		swipeToSlide: true,
		focusOnSelect: true,
		speed: 500
	}

	return (
		<div className={classes}>
			<TitleList title={title} />
			{description && (
				<DescriptionList description={description} />
			)}
			<SlickSlider settings={settings}>
				{data.artists.map((playlist) => {
					return (
						<Item key={playlist.regID} posterType={posterType} data={playlist} listType={listType} titleCategory={data.title} listTracks={data.tracks} />
					)
				})}
			</SlickSlider>
		</div>
	)
}

export function TitleList({ title }) {
	return <h6 className="title-list">{title}</h6>
}

export function DescriptionList({ description }) {
	return <h6 className="description-list">{description}</h6>
}

const getInitialSlide = (totalItems, slidesToShow, indexList, tabValues) => {
	let initialSlide = 0
	if(totalItems > slidesToShow){
		if(indexList === tabValues.tabContent){
			const slides = tabValues.initialSlide / slidesToShow
			initialSlide = slidesToShow * Math.trunc(slides)
		}
	}

	return initialSlide
}

const TabsIndicators = ({slidesToShow, data, initialSlide, pageActive}) => {
	const length = data.length
	const pages = Math.ceil(length / slidesToShow)
	const items = []
	for (let index = 0; index < pages; index++) {
		items.push(index)
	}

	const [start, setStart] = useState(false)
	const [indicatorActive, setIndicatorActive] = useState(null)

	useEffect(() => {
		const indicatorActive =  Math.ceil(initialSlide / slidesToShow)
		setIndicatorActive(indicatorActive)
		setStart(true)
	}, [initialSlide])

	useEffect(() => {
		if(start){
			const indicatorActive =  Math.ceil(pageActive / slidesToShow)
			setIndicatorActive(indicatorActive)
		}
	}, [pageActive])

	return (
		<div className="tabs-indicators">
			<ul className="list-indicators">
				{
					items.map((element) => {
						return <li 
							key={element} 
							className={`item-indicator ${element === indicatorActive ? 'active' : ''}`}>
						</li>
					})
				}
			</ul>
		</div>
	)
}