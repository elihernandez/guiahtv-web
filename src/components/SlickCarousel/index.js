import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './styles.css'

export function PrevArrowSlider(props) {
	const { className, onClick } = props

	return (
		<div className={className} onClick={onClick}>
			<button type="button" aria-label="angle-left">
				<i className="fas fa-chevron-left" />
			</button>
		</div>
	)
}

export function NextArrowSlider(props) {
	const { className, onClick } = props

	return (
		<div className={className} onClick={onClick}>
			<button type="button" aria-label="angle-right">
				<i className="fas fa-chevron-right" />
			</button>
		</div>
	)
}

export function SlickSlider({ children, 
	settings = {
		dots: true,
		infinite: false,
		speed: 500,
		autoplay: true,
		autoplaySpeed: 6000,
		slidesToShow: 1,
		slidesToScroll: 1,
		variableWidth: false,
		pauseOnHover: true,
		swipeToSlide: true,
	}
}){

	settings.prevArrow = <PrevArrowSlider />
	settings.nextArrow = <NextArrowSlider />
	
	return (	
		<Slider {...settings}>
			{ children }
		</Slider>
	)
}