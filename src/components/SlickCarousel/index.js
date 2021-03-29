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
				<i className="fas fa-angle-left" />
			</button>
		</div>
	)
}

export function NextArrowSlider(props) {
	const { className, onClick } = props

	return (
		<div className={className} onClick={onClick}>
			<button type="button" aria-label="angle-right">
				<i className="fas fa-angle-right" />
			</button>
		</div>
	)
}

export function SlickSlider({ children, settings = {
	dots: true,
	infinite: true,
	speed: 500,
	autoplay: true,
	autoplaySpeed: 6000,
	slidesToShow: 1,
	slidesToScroll: 1,
	variableWidth: false,
	pauseOnHover: true,
	swipeToSlide: true,
	prevArrow: <PrevArrowSlider />,
	nextArrow: <NextArrowSlider />,
} 
}){

	return (	
		<Slider {...settings}>
			{ children }
		</Slider>
	)
}