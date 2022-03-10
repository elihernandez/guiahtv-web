import React, { Fragment, useContext, useState, useEffect } from 'react'
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom'
import VodContext from '../../context/VodContext'
import RadioContext from '../../context/RadioContext'
import { useRequest } from '../../hooks/useRequest'
import { LoaderSpinnerMUI } from '../Loader'
import { List } from '../List'
import { ContentMovie } from '../../pages/Movie'
import { ContentSerie } from '../../pages/Serie'
import { CSSTransition } from 'react-transition-group'
import { VideoVod } from '../../pages/Video'
import { isSerie, isMovie, isDynamic, isContinueWatching } from '../../js/String'
import { useAxios } from '../../hooks/useAxios'
import './styles.css'

export function searchSerie(data, contentId) {
	let content
	data.map(({ cmData }) => {
		cmData.map((serie) => {
			if (serie.Registro == contentId && isSerie(serie.ContentType) && !isDynamic(serie.ContentType) && !isContinueWatching(serie.ContentType)) {
				if (!content) {
					content = serie
				}
			}
		})
	})

	return content
}

export function searchMovie(data, contentId) {
	let content
	data.map(({ cmData }) => {
		cmData.map((movie) => {
			if (movie.Registro == contentId && isMovie(movie.ContentType)) {
				if (!content) {
					content = movie
				}
			}
		})
	})
	return content
}

export function InfoContent() {
	const { contentId, contentType } = useParams()
	const { stateVod, dispatchVod } = useContext(VodContext)
	const { dataVod, movieVod, seasonVod, serieVod } = stateVod
	const [loading, setLoading] = useState(true)
	const [content, setContent] = useState('')
	const { error } = useAxios('catalogue-zonakids')

	useEffect(() => {
		if (dataVod) {
			switch (contentType) {
			case 'pelicula':
				if (movieVod) {
					setLoading(false)
					setContent('movie')
				} else {
					dispatchVod({ type: 'setMovie', payload: searchMovie(dataVod, contentId) })
					setLoading(false)
					setContent('movie')
				}
				break
			case 'serie':
				if (serieVod) {
					setLoading(false)
					setContent('serie')
				} else {
					dispatchVod({ type: 'setSerie', payload: searchSerie(dataVod, contentId) })
					setLoading(false)
					setContent('serie')
				}
				break
			}
		}
	}, [dataVod])

	if (loading) {
		return <LoaderSpinnerMUI />
	}

	return (
		error ? ( <div className="content-error">{error}</div>) : (
			<Fragment>
				{content == 'movie' && movieVod &&
					<ContentMovie data={movieVod} />
				}
				{content == 'serie' && serieVod &&
					<ContentSerie data={serieVod} />
				}
			</Fragment>
		)
	)
}

export function CatalogueVod({ requestApi }) {
	const { url } = useRouteMatch()
	const { stateVod, dispatchVod } = useContext(VodContext)
	const { dataVod } = stateVod
	const { loading, data } = useRequest(requestApi, dispatchVod, dataVod)

	return (
		<Fragment>
			<CSSTransition in={loading} timeout={300} classNames="fade" unmountOnExit>
				<LoaderSpinnerMUI />
			</CSSTransition>
			<CSSTransition in={!loading} timeout={300} classNames="fade" unmountOnExit>
				<Switch>
					<Route exact path={`${url}`} >
						<div className={`content-catalogue ${requestApi}`}>
							{data && !loading &&
								data.map((category) => {
									return (
										<List key={category.category} data={category} listType="catalogue" />
									)
								})
							}
						</div>
					</Route>
					<Route exact path={`${url}/:contentType/:contentId`} >
						<InfoContent />
					</Route>
					<Route exact path={`${url}/:contentType/:contentId/video`} >
						<VideoVod state={stateVod} dispatchVod={dispatchVod} />
					</Route>
				</Switch>
			</CSSTransition>
		</Fragment>
	)
}

export function CatalogueRadio({ requestApi }) {
	const { stateRadio, dispatchRadio } = useContext(RadioContext)
	const { dataRadio } = stateRadio
	const { loading, data } = useRequest(requestApi, dispatchRadio, dataRadio)

	return (
		<Fragment>
			<CSSTransition in={loading} timeout={300} classNames="active" unmountOnExit>
				<LoaderSpinnerMUI />
			</CSSTransition>
			<CSSTransition in={!loading} timeout={300} classNames="active" unmountOnExit>

				<div className={`content-catalogue ${requestApi}`}>
					{data && !loading &&
						data.map((category, index) => {
							return <List key={`${category.category}-${index}`} data={category} listType="radio" />
						})
					}
				</div>

			</CSSTransition>
		</Fragment>
	)
}