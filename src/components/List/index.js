import React from 'react'
import { Item } from '../ListItem'
import { SlickSlider } from '../SlickCarousel'
import './styles.css'

export function List({ data, listType, wrap }) {
	let List = () => null

	switch (listType) {
	case 'catalogue':
		List = <ListCatalogue data={data} listType={listType} wrap={wrap} />
		break
	case 'season':
		List = <ListSeason data={data} listType={listType} wrap={wrap} />
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
	const { category, poster_type } = data
	const classes = poster_type == 0 ? 'list list-catalogue portrait' : 'list  list-catalogue landscape'

	let slidesToShow

	switch(poster_type){
	case '0':
		slidesToShow = 7
		break
	case '1':
		slidesToShow = 5
		break
	default:
		slidesToShow = 7
		break				
	}

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

export function ListRadio({ data, listType }) {
	const slidesToShow = 5
	const { category } = data
	const classes = 'list  list-card landscape'

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

export function ListChannel({ data, listType }) {
	const { category } = data
	const classes = 'list  list-card landscape'
	const slidesToShow = 5

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

export function TitleList({ title }) {
	return <h6 className="title-list">{title}</h6>
}

// function getPages(cmData, maxItems) {
// 	let pages = cmData.length / maxItems

// 	if (pages % 1 != 0) {
// 		pages = Math.ceil(pages)
// 	}

// 	return pages
// }

// function DirectionsPage({ totalPages, refList }) {
// 	const [page, setPage] = useState(1)

// 	const handleClickPrev = () => {
// 		let moveP = 100 * (page - 2)
// 		cssTransition(refList.current, {
// 			transform: `translate3d(-${moveP}%, 0, 0)`
// 		}, 500, function () {
// 			setPage(page - 1)
// 		})
// 	}

// 	const handleClickRight = () => {
// 		let moveP = 100 * (page)
// 		cssTransition(refList.current, {
// 			transform: `translate3d(-${moveP}%, 0, 0)`
// 		}, 500, function () {
// 			setPage(page + 1)
// 		})
// 	}

// 	return (
// 		<Fragment>
// 			{
// 				totalPages > 1 && page > 1 &&
//                         <div className="direction direction-prev" onClick={handleClickPrev}>
//                         	<i className="fas fa-chevron-left" />
//                         </div>
// 			}
// 			{
// 				(totalPages > 1) && (page < totalPages) &&
//                         <div className="direction direction-next" onClick={handleClickRight}>
//                         	<i className="fas fa-chevron-right" />
//                         </div>
// 			}
// 		</Fragment>
// 	)
// }

// export function ListCards({ data, listType, listStyle }) {
// 	let pages = 0
// 	const [page, setPage] = useState(1)
// 	const [totalPages, setTotalPages] = useState(0)
// 	const { category, poster_type, cmData } = data
// 	const classes = poster_type == 0 ? 'list-cards portrait' : 'list-cards landscape'
// 	const refList = useRef()

// 	const handleClickPrev = () => {
// 		let moveP = 100 * (page - 2)
// 		cssTransition(refList.current, {
// 			transform: `translate3d(-${moveP}%, 0, 0)`
// 		}, 500, function () {
// 			setPage(page - 1)
// 		})
// 	}

// 	const handleClickRight = () => {
// 		let moveP = 100 * (page)
// 		cssTransition(refList.current, {
// 			transform: `translate3d(-${moveP}%, 0, 0)`
// 		}, 500, function () {
// 			setPage(page + 1)
// 		})
// 	}

// 	useEffect(() => {
// 		if (poster_type == 0) {
// 			pages = cmData.length / 7
// 		} else {
// 			pages = cmData.length / 5
// 		}

// 		if (pages % 1 != 0) {
// 			pages = Math.ceil(pages)
// 		}

// 		if (pages > 1) {
// 			setTotalPages(pages)
// 		}
// 	}, [])

// 	return (
// 		<div className={classes}>
// 			<div className="list-content">
// 				<div className="list-items" ref={refList}>
// 					{
// 						cmData.map((data) => {
// 							return <Item key={data.Registro} data={data} posterType={poster_type} listType={listType} />
// 						})
// 					}
// 				</div>
// 				{
// 					totalPages > 1 && page > 1 && listType != 'season' &&
//                               <div className="direction direction-prev" onClick={handleClickPrev}>
//                               	<i className="fas fa-chevron-left" />
//                               </div>
// 				}
// 				{
// 					(totalPages > 1) && (page < totalPages) && listType != 'season' &&
//                               <div className="direction direction-next" onClick={handleClickRight}>
//                               	<i className="fas fa-chevron-right" />
//                               </div>
// 				}
// 			</div>
// 		</div>
// 	)
// }

// export function ListCatalogue({ data, listType }) {
// 	const { category, poster_type, cmData } = data
// 	const totalPages = poster_type == 0 ? getPages(cmData, 7) : getPages(cmData, 5)
// 	const classes = poster_type == 0 ? 'list list-catalogue portrait' : 'list  list-catalogue landscape'
// 	const refList = useRef()

// 	return (
// 		<div className={classes}>
// 			<TitleList title={category} />
// 			<div className="list-content">
// 				<div className="list-items" ref={refList}>
// 					{
// 						cmData.map((data) => {
// 							return <Item key={data.Registro} data={data} posterType={poster_type} listType={listType} titleCategory={category} />
// 						})
// 					}
// 				</div>
// 				<DirectionsPage totalPages={totalPages} refList={refList} />
// 			</div>
// 		</div>
// 	)
// }