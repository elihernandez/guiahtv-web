import React from 'react'
import { H6 } from '../Typography'
import { imgSourceSetPng } from '../../js/Image'
import { useHistory } from 'react-router-dom'
import { SlickSlider } from '../SlickCarousel'
import './styles.css'

export function ButtonsMenu({data}) {
	const history = useHistory()
	//const { data, error } = useAxios('buttons-menu')

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
		case 'leon_ppv':
			history.push('/tv')
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
			{
				<SlickSlider settings={settings}>
					{data.map(({ titulo, ContentType, PosterCardUrlLandscape }) => {
						if (ContentType !== 'leon_music' && ContentType !== 'leon_ppv' && ContentType !== null) {
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
			}
		</div>
	)
}

// export const ButtonsMenu = () => {
// 	const history = useHistory()
// 	const { data } = useAxios('buttons-menu')

// 	const handleClick = (contentType) => {
// 		switch (contentType) {
// 		case 'leon_livetv':
// 			history.push('/tv')
// 			break
// 		case 'leon_movies':
// 			history.push('/alacarta')
// 			break
// 		case 'leon_radio':
// 			history.push('/radio')
// 			break
// 		case 'leon_music':
// 			history.push('/musica')
// 			break
// 		case 'leon_kids':
// 			history.push('/zonakids')
// 			break
// 		default:
// 			break
// 		}
// 	}

// 	const settings = {
// 		dots: false,
// 		infinite: false,
// 		slidesToShow: 5,
// 		slidesToScroll: 5,
// 	}

// 	return (
// 		<div className="buttons-menu-wrapper">
// 			<div className="button">	
// 				<span>
// 					<i className="fal fa-tv" /> 
// 				</span>
// 				<h1>Tv en vivo</h1>
// 			</div>
// 			<div className="button">
// 				<span>
// 					<i className="fal fa-popcorn" /> 
// 				</span>
// 				<h1>A la carta</h1>
// 			</div>
// 			<div className="button">
// 				<span>
// 					<i className="fal fa-radio" /> 
// 				</span>
// 				<h1>Radio</h1>
// 			</div>
// 			<div className="button">
// 				<span>
// 					<i className="fal fa-headphones" /> 
// 				</span>
// 				<h1>Música</h1>
// 			</div>
// 			<div className="button">
// 				<span>
// 					<i className="fal fa-child" /> 
// 				</span>
// 				<h1>Zona kids</h1>
// 			</div>
// 		</div>
// 	)
// }

// export const ButtonsMenu = () => {
// 	const history = useHistory()
// 	const { data } = useAxios('buttons-menu')

// 	const handleClick = (contentType) => {
// 		switch (contentType) {
// 		case 'leon_livetv':
// 			history.push('/tv')
// 			break
// 		case 'leon_movies':
// 			history.push('/alacarta')
// 			break
// 		case 'leon_radio':
// 			history.push('/radio')
// 			break
// 		case 'leon_music':
// 			history.push('/musica')
// 			break
// 		case 'leon_kids':
// 			history.push('/zonakids')
// 			break
// 		default:
// 			break
// 		}
// 	}

// 	const settings = {
// 		dots: false,
// 		infinite: false,
// 		slidesToShow: 5,
// 		slidesToScroll: 5,
// 	}

// 	return (
// 		<div className="buttons-menu-wrapper">
// 			<div className="button">	
// 				<span>
// 					<img src={backgroundMovies} />
// 					<h1>A la carta</h1>
// 				</span>
// 			</div>
// 			<div className="button">
				
// 			</div>
// 			<div className="button">
			
// 			</div>
// 			<div className="button">
			
// 			</div>
// 			<div className="button">
				
// 			</div>
// 		</div>
// 	)
// }