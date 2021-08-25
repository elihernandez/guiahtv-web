import React, { Fragment, useEffect, useState } from 'react'
import { LazyImage } from '../Image'
import { ButtonResume } from '../ButtonResume'
import Imdb from '../../assets/images/clasifications-movies/imdb.png'
import PG13 from '../../assets/images/clasifications-movies/PG13.png'
import PG from '../../assets/images/clasifications-movies/PG.png'
import G from '../../assets/images/clasifications-movies/G.png'
import R from '../../assets/images/clasifications-movies/R.png'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import localforage from 'localforage'
import { useAxios } from '../../hooks/useAxios'
import './styles.css'
import { Button } from '../Button'

export function InfoMovie({ data }) {
	const { HdBackgroundImageUrl, Title, Description, Categories, Artist, Director, ReleaseDate, Length, Rating, StarRating, ResumePos } = data
	const { error } = useAxios('catalogue-vod')
	return (
		error ? (<div className="info-error">{error}</div>) : (
			<Fragment>
				<div className="background">
					<ImgBackground title={Title} img={HdBackgroundImageUrl} type="movie" />
					<div className="overlay bottom s-50" />
					<div className="overlay bottom s-40" />
					<div className="overlay bottom s-30" />
					<div className="overlay bottom s-20" />
					<div className="overlay left s-80" />
					<div className="overlay left s-70" />
					<div className="overlay left s-60" />
					<div className="overlay left s-50" />
					<div className="overlay left s-40" />
					<div className="overlay left s-30" />
					<div className="overlay left s-20" />
				</div>
				<div className="info-movie">
					<div className="group-title">
						<h2 className="title">{Title}</h2>
					</div>
					<div className="group info">
						{StarRating &&
							<Fragment>
								<img className="img-rating" src={Imdb} />
								<p className="rating">{StarRating}</p>
								<p className="rating">|</p>
							</Fragment>
						}
						{Rating.trim() == 'PG-13' &&
										<img className="img-clasification" src={PG13} />
						}
						{Rating.trim() == 'PG' &&
										<img className="img-clasification" src={PG} />
						}
						{Rating.trim() == 'G' &&
										<img className="img-clasification" src={G} />
						}
						{Rating.trim() == 'R' &&
										<img className="img-clasification" src={R} />
						}
						{ReleaseDate &&
										<p className="release-date">{ReleaseDate}</p>
						}
						{Length &&
										<p className="duration">{Length}</p>
						}
						{Categories &&
										<p className="genre">{Categories}</p>
						}
					</div>
					{Description &&
								<div className="group-description">
									<p className="description">{Description}</p>
								</div>
					}
					{Artist &&
								<div className="group-artist">
									<span className="group">
										<p className="text-group">Actores:</p>
										<p className="artist">{Artist}</p>
									</span>
								</div>
					}
					{Director &&
								<div className="group-director">
									<span className="group">
										<p className="text-group">Director:</p>
										<p className="director">{Director}</p>
									</span>
								</div>
					}
					<div className="group-actions">
						<ButtonResume data={data}/>
					</div>
				</div>
			</Fragment>

		)
	)
}

export function InfoSerie({ data }) {
	const { HdBackgroundImageUrl, Title, Description, Categories } = data
	const { error } = useAxios('catalogue-vod')
	const [ value, setValue ] = useState('')
	

	useEffect(() => {
		const getItem = async () => {
			const value = await localforage.getItem(`serie-${data.Registro}`)
			setValue(value)
		}

		getItem()
	}, [])

	return (
		error ? (<div className="info-error">{error}</div>) : (
			<Fragment>
				<div className="background">
					<ImgBackground title={Title} img={HdBackgroundImageUrl} type="serie" />
					<div className="overlay bottom s-50" />
					<div className="overlay bottom s-40" />
					<div className="overlay bottom s-30" />
					<div className="overlay bottom s-20" />
					<div className="overlay left s-80" />
					<div className="overlay left s-70" />
					<div className="overlay left s-60" />
					<div className="overlay left s-50" />
					<div className="overlay left s-40" />
					<div className="overlay left s-30" />
					<div className="overlay left s-20" />
				</div>

				<div className="info-movie">
					<div className="group-title">
						<h2 className="title">{Title}</h2>
					</div>
					<div className="group info">
						{Categories &&
							<p className="genre">{Categories}</p>
						}
					</div>
					{Description &&
						<div className="group-description">
							<p className="description">{Description}</p>
						</div>
					}
				</div>

				<div className="info-resume">
					{
						value ? (
							<div className="group-resume">
								<div className="resume-img">
									<img src={value.episode.image} />
								</div>
								<div className="resume">
									<h2 key="title">Continuar viendo: {value.episode.title}</h2>
									<div className="buttons">
										<ButtonResume data = {value.episode}/>
									</div>
								</div>
							</div>
							
						) : (<div></div>)
					
					
					}
				</div>
			</Fragment>
		)
	)
}

function ImgBackground({ title, img, type }) {
	const alt = `background-${title}`
	const {error} = useAxios('catalogue-vod')

	return (
		error ? (<div className="info-error">{error}</div>) : (
			<Fragment>
				{type == 'movie' &&
							<LazyImage img={img} alt={alt} type="webp" recoverType="jpg" />
				}
				{type == 'serie' &&
							
							<LazyImage img={img} alt={alt} type="webp" recoverType="jpg" />
				}
			</Fragment>
		)
		

	)
}

// <picture>
//       <source srcSet={img} type="image/png" />
//       <source srcSet={imgSourceSetJpg(img, 'png')} type="image/jpeg" />
//       <LazyImage img={img} alt={alt} />
// </picture>
// <picture>
//       <source srcSet={img} type="image/webp" />
//       <source srcSet={imgSourceSetJpg(img, 'webp')} type="image/jpeg" />
//       <MyImage />
// </picture>
// <img style={{opacity: show ? "1" : "0"}} onLoad={onLoad} ref={imgRef} src="build/assets/images/logos/guiahtv/error-tv-landscape.png" alt={`background-${title}`} />
