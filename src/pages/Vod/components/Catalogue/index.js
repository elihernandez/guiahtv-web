import React, { Fragment, useState, useEffect } from 'react'
import { List } from '../../../../components/List'
import { Item } from '../../../../components/ListItem'
import { CSSTransition } from 'react-transition-group'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './styles.css'

// function ListMovies({ data }){
// 	console.log(data)
// 	const { category, poster_type, cmData } = data
// 	const settings = {
// 		dots: true,
// 		infinite: false,
// 		speed: 500,
// 		autoplay: false,
// 		autoplaySpeed: 6000,
// 		slidesToShow: 8,
// 		slidesToScroll: 8,
// 		// variableWidth: false,
// 		swipeToSlide: true,
// 	}

// 	return (
// 		<Slider key {...settings}>
// 			{
// 				cmData.map((data) => {
// 					return (
// 						<div key={data.Registro} style={{ width: '100%' }}>
// 							<Item data={data} posterType={poster_type} listType="catalogue" titleCategor={category}/>
// 						</div>
// 					)
// 				})
// 			}
// 		</Slider>
// 	)
// }

export function Catalogue({ data }) {
	const [show, setShow] = useState(false)

	useEffect(() => {
		setShow(true)
	}, [])



	return (
		<CSSTransition in={show} timeout={100} classNames="fade" unmountOnExit>
			<div className="content-catalogue alacarta">
				{
					data.map((category) => {
						return <List key={category.category} data={category} listType="catalogue" />
					})
				}
			</div>
		</CSSTransition>
	)
}

// {
//       data.map((category) => {
//             return <ListMovies key={category.category} data={category} />
         
//       })
// }

