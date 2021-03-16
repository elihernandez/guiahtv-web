import React from 'react'
import { imgSourceSetJpg } from '../../../../js/Image'
import './styles.css'

function Title({ data }) {
	const { Title } = data
	return <h3 className="title-audio">{Title}</h3>
}

function Img({ data }) {
	const { Title, HDPosterUrlLandscape } = data

     
	return (
	// <img className="thumbnail-radio" alt={`thumbnail-${Title}`} src={HDPosterUrlLandscape} />
		<picture>
			<source srcSet={HDPosterUrlLandscape} type="image/webp" />
			<source srcSet={imgSourceSetJpg(HDPosterUrlLandscape, 'webp')} type="image/jpeg" />
			<img className="thumbnail-radio" src="build/assets/images/logos/guiahtv/vod-error-portrait.png" alt={`img-${Title}`} />
		</picture>
	)
}

export function InfoAudio({ active, data, error }) {

	return (
		<div className="info-audio-wrapper">
			<div>
				{error &&
                              <p>{error}</p>
				}
				{active &&
                              <p>Estás escuchando:</p>
				}
				{!active && !error && data &&
                              <p>Cargando radio</p>
				}
				{data &&
                              <Title data={data} />
				}
			</div>
			<div className="thumbnail-content">
				{data &&
                              <Img data={data} />
				}
			</div>
		</div>
	)
}