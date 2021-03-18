import React from 'react'
// import { getButtonsMenu } from '../../services/getButtonsMenu'
import { H6 } from '../Typography'
import { imgSourceSetPng } from '../../js/Image'
import { useHistory } from 'react-router-dom'
import { useAxios } from '../../hooks/useAxios'
import backgroundButton from '../../assets/images/backgrounds/background-button.jpg'
import RadioIcon from '@material-ui/icons/Radio'
import './styles.css'

export function ButtonsMenu() {
	const history = useHistory()
	const { data } = useAxios('/cs/leon_home_bm')

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

	// return (
		
	// 	<div className="buttons-menu-wrapper">
	// 		<div className="item-button" onClick={() => handleClick('leon_livetv')}>
	// 			<picture>
	// 				<source
	// 					srcSet={backgroundButton}
	// 					type="image/webp"
	// 				/>
	// 				<source
	// 					srcSet={imgSourceSetPng(
	// 						backgroundButton,
	// 						'png'
	// 					)}
	// 					type="image/png"
	// 				/>
	// 				<img
	// 					src="build/assets/images/logos/guiahtv/error-tv-landscape.png"
	// 					alt=""
	// 					className="image-button"
	// 				/>
	// 			</picture>
	// 			<div className="content-button">
	// 				<i className="fas fa-tv"></i>
	// 				<H6 className="title-button title-2">
	// 						Tv en vivo
	// 				</H6>
	// 			</div>
	// 		</div>
	// 		<div className="item-button" onClick={() => handleClick('leon_movies')}>
	// 			<picture>
	// 				<source
	// 					srcSet={backgroundButton}
	// 					type="image/webp"
	// 				/>
	// 				<source
	// 					srcSet={imgSourceSetPng(
	// 						backgroundButton,
	// 						'png'
	// 					)}
	// 					type="image/png"
	// 				/>
	// 				<img
	// 					src="build/assets/images/logos/guiahtv/error-tv-landscape.png"
	// 					alt=""
	// 					className="image-button"
	// 				/>
	// 			</picture>
	// 			<div className="content-button">
	// 				<i className="fas fa-film"></i>
	// 				<H6 className="title-button title-2">
	// 						A la carta
	// 				</H6>
	// 			</div>
	// 		</div>
	// 		<div className="item-button" onClick={() => handleClick('leon_radio')}>
	// 			<picture>
	// 				<source
	// 					srcSet={backgroundButton}
	// 					type="image/webp"
	// 				/>
	// 				<source
	// 					srcSet={imgSourceSetPng(
	// 						backgroundButton,
	// 						'png'
	// 					)}
	// 					type="image/png"
	// 				/>
	// 				<img
	// 					src="build/assets/images/logos/guiahtv/error-tv-landscape.png"
	// 					alt=""
	// 					className="image-button"
	// 				/>
	// 			</picture>
	// 			<div className="content-button">
	// 				<RadioIcon />
	// 				<H6 className="title-button title-2">
	// 						Radio
	// 				</H6>
	// 			</div>
	// 		</div>
	// 		<div className="item-button" onClick={() => handleClick('leon_music')}>
	// 			<picture>
	// 				<source
	// 					srcSet={backgroundButton}
	// 					type="image/webp"
	// 				/>
	// 				<source
	// 					srcSet={imgSourceSetPng(
	// 						backgroundButton,
	// 						'png'
	// 					)}
	// 					type="image/png"
	// 				/>
	// 				<img
	// 					src="build/assets/images/logos/guiahtv/error-tv-landscape.png"
	// 					alt=""
	// 					className="image-button"
	// 				/>
	// 			</picture>
	// 			<div className="content-button">
	// 				<i className="fas fa-music"></i>
	// 				<H6 className="title-button title-2">
	// 						Música
	// 				</H6>
	// 			</div>
	// 		</div>
	// 		<div className="item-button" onClick={() => handleClick('leon_kids')}>
	// 			<picture>
	// 				<source
	// 					srcSet={backgroundButton}
	// 					type="image/webp"
	// 				/>
	// 				<source
	// 					srcSet={imgSourceSetPng(
	// 						backgroundButton,
	// 						'png'
	// 					)}
	// 					type="image/png"
	// 				/>
	// 				<img
	// 					src="build/assets/images/logos/guiahtv/error-tv-landscape.png"
	// 					alt=""
	// 					className="image-button"
	// 				/>
	// 			</picture>
				
	// 			<div className="content-button">
	// 				<i className="fas fa-child"></i>
	// 				<H6 className="title-button title-2">
	// 					Zona kids
	// 				</H6>
	// 			</div>
	// 		</div>
	// 	</div>
	// )
	return (
		
		<div className="buttons-menu-wrapper">
			{data.map(({ titulo, ContentType, PosterCardUrlLandscape }, index) => {
				if (ContentType !== 'leon_music') {
					return (
						<div
							key={ContentType}
							className={`item-button ${index === 0 ? 'active' : ''}`}
							onClick={() => handleClick(ContentType)}
						>
							<picture>
								<source
									srcSet={PosterCardUrlLandscape}
									type="image/webp"
								/>
								<source
									srcSet={imgSourceSetPng(
										PosterCardUrlLandscape,
										'png'
									)}
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
		</div>
	)
}