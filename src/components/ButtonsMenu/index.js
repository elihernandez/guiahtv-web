import React from 'react'
import { H6 } from '../Typography'
import { imgSourceSetPng } from '../../js/Image'
import { useHistory } from 'react-router-dom'
import { useAxios } from '../../hooks/useAxios'
import { SlickSlider } from '../SlickCarousel'
import './styles.css'

export function ButtonsMenu() {
	const history = useHistory()
	const { data } = useAxios('buttons-menu')

	const handleClick = (contentType) => {
		switch (contentType) {
		case 'leon_livetv':
			history.push('/tv')
			break
		case 'leon_movies':
			history.push('/alacarta')
			break
		case 'leon_radio':
			history.push('/radio')
			break
		case 'leon_music':
			history.push('/musica')
			break
		case 'leon_kids':
			history.push('/zonakids')
			break
		default:
			break
		}
	}

	const settings = {
		dots: false,
		infinite: false,
		slidesToShow: 5,
		slidesToScroll: 5,
	}

	return (
		<div className="buttons-menu-wrapper">
			<SlickSlider settings={settings}>
				{data.map(({ titulo, ContentType, PosterCardUrlLandscape }) => {
					if (ContentType !== 'leon_music') {
						return (
							<div
								key={ContentType}
								className="item-button"
								onClick={() => handleClick(ContentType)}
							>
								<picture>
									<source
										srcSet={PosterCardUrlLandscape}
										type="image/webp"
									/>
									<source
										srcSet={imgSourceSetPng(PosterCardUrlLandscape,'png')}
										type="image/png"
									/>
									<img
										src="build/assets/images/logos/guiahtv/error-tv-landscape.png"
										alt={`${ContentType}-image`}
										className="image-button"
									/>
								</picture>
								<H6 className="title-button title-2">{titulo}</H6>
							</div>
						)
					}
				})}
			</SlickSlider>
		</div>
	)
}