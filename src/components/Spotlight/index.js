import React from 'react'
import { LazyImage } from '../Image'
import { SlickSlider } from '../SlickCarousel'
import './styles.css'

export function Spotlight({data}) {
	//const { data, error } = useAxios('spotlight')

	//console.log(data)
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		autoplay: true,
		autoplaySpeed: 6000,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: true,
		swipeToSlide: true,
	}

	return (
		<div className="spotlight-wrapper">
			<SlickSlider settings={settings}>
				{data.map(({ Registro, ImgLandscape }) => {
					return (
						<div key={Registro} style={{ width: '100%' }}>
							<LazyImage
								img={ImgLandscape}
								alt={`spotlight-image-${Registro}`}
								type="webp"
								recoverType="png"
							/>
						</div>
					)
				})}
			</SlickSlider>
		</div>
	)
}