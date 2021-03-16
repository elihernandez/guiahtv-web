import React from 'react'
// import { getButtonsMenu } from '../../services/getButtonsMenu'
import { H6 } from '../Typography'
import { imgSourceSetPng } from '../../js/Image'
import { useHistory } from 'react-router-dom'
import { useAxios } from '../../hooks/useAxios'
import { Focusable } from 'react-js-spatial-navigation'
import './styles.css'

export function ButtonsMenu() {
	const history = useHistory()
	const { data } = useAxios('/cs/leon_home_bm')

	const handleClick = (contentType) => {
		console.log(contentType)
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

	// useEffect(() => {
	// 	SpatialNavigation.focus('.focusable')
	// }, [data])

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

// useEffect(() => {
//     const requestButtons = async () => {
//         try{
//             const response = await getButtonsMenu()
//             if(response.length == 1) throw new Error('No se pudo obtener la información.')
//             setButtons(response)
//         }catch(e){
//             console.log(e)
//         }
//     }

//     requestButtons()
// }, [])
