import React, { Fragment, useState, useContext, useEffect } from 'react'
import { NavLink, Link, useRouteMatch, useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import VodContext from '../../context/VodContext'
import RadioContext from '../../context/RadioContext'
import AudioContext from '../../context/AudioContext'
import VideoContext from '../../context/VideoContext'
import MusicContext from '../../context/MusicContext'
import { useAxios } from '../../hooks/useAxios'
import { getContactInfo } from '../../services/getContactInfo'
import { getProgressMovie, isLive, isEvent, getProgressTimeEvent, getEventTime, secondsToString } from '../../js/Time'
import {  limitString, isLimitString, isSerie, typeContent, replaceString, containsString, createUrlString } from '../../js/String'
import Tooltip from '@material-ui/core/Tooltip'
import LinearProgress from '@material-ui/core/LinearProgress'
import { CSSTransition } from 'react-transition-group'
import { LazyImage } from '../Image'
import { AnimatedBars } from '../AnimatedBars'
import { LoaderSpinnerMUI } from '../Loader'
import imgRecoverErrorTV from '../../assets/images/backgrounds/onerror/error-tv.png'
import imgRecoverErrorPortrait from '../../assets/images/backgrounds/onerror/error-portrait.png'
import imgRecoverErrorLandscape from '../../assets/images/backgrounds/onerror/error-landscape.png'
import './styles.css'

export function Item({ data, posterType, listType, titleCategory, category, listTracks, collection }) {
	let Item = () => null
	const { url } = useRouteMatch()
	const { ContentType } = data
	const type = typeContent(ContentType)

	switch (listType) {
	case 'catalogue':
		Item = <ItemCatalogue url={url} type={type} posterType={posterType} data={data} titleCategory={titleCategory} />
		break
	case 'season':
		Item = <ItemSeason url={url} posterType={posterType} data={data} />
		break
	case 'radio':
		Item = <ItemCard posterType={posterType} data={data} />
		break
	case 'channel':
		Item = <ItemCardChannel posterType={posterType} data={data} category={category} />
		break
	case 'catalogue-slide':
		Item = <ItemCatalogue posterType={posterType} data={data} />
		break
	case 'tracks':
		Item = <ItemCollectionTrack posterType={posterType} titleCategory={titleCategory} data={data} listTracks={listTracks} collection={collection} />
		break
	case 'playlists':
		Item = <ItemPlaylist posterType={posterType} titleCategory={titleCategory} data={data} listTracks={listTracks} />
		break
	case 'albums':
		Item = <ItemAlbum posterType={posterType} data={data} />
		break
	case 'tracksAlbum':
		Item = <ItemTrackAlbum posterType={posterType} titleCategory={titleCategory} data={data} />
		break
	case 'tracksPlaylist':
		Item = <ItemTrackPlaylist posterType={posterType} titleCategory={titleCategory} data={data} />
		break
	}

	return Item
}

function ItemCatalogue({ type, posterType, data, titleCategory }) {
	let urlNavLink
	const { Title, Registro, ContentType, HDPosterUrlPortrait, HDPosterUrlLandscape, ResumePos, Length } = data
	const { dispatchVod } = useContext(VodContext)

	const handleClick = () => {
		if (isSerie(ContentType)) {
			dispatchVod({ type: 'setSerie', payload: data })
		} else {
			dispatchVod({ type: 'setMovie', payload: data })
		}
	}

	if (titleCategory == 'Continuar Viendo') {
		if(containsString(ContentType, 'kids')){
			urlNavLink = `zonakids/${type}/${Registro}/video`
		}else{
			urlNavLink = `alacarta/${type}/${Registro}/video`
		}
	} else {
		if(containsString(ContentType, 'kids')){
			urlNavLink = `zonakids/${type}/${Registro}`
			
		}else{
			urlNavLink = `alacarta/${type}/${Registro}`
		}
	}

	return (
		<NavLink to={urlNavLink} className="item-link">
			<div className="item" onClick={handleClick}>
				<div className="background-item">
					<Img title={Title} posterType={posterType} imgPortrait={HDPosterUrlPortrait} imgLandscape={HDPosterUrlLandscape} />
					{ResumePos &&
						<div className="progress-bar-content">
							<LinearProgress variant="determinate" value={getProgressMovie(ResumePos, Length)} />
						</div>
					}
				</div>
			</div>
		</NavLink>
	)
}

function ItemSeason({ url, posterType, data }) {
	const { Title, Description, ContentType, HDPosterUrlPortrait, HDPosterUrlLandscape, ResumePos, Length } = data
	const { dispatchVod } = useContext(VodContext)

	const handleClick = () => {
		if (isSerie(ContentType)) {
			dispatchVod({ type: 'setSerie', payload: data })
		} else {
			dispatchVod({ type: 'setMovie', payload: data })
		}
	}

	return (
		<NavLink to={`${url}/video`} className="item-link">
			<div className="item" onClick={handleClick}>
				<div className="background-item">
					<Img title={Title} posterType={posterType} imgPortrait={HDPosterUrlPortrait} imgLandscape={HDPosterUrlLandscape} />
					<ProgressBar resumePos={ResumePos} length={Length} />
				</div>
				<Info title={Title} description={Description} />
			</div>
		</NavLink>
	)
}

function ItemCard({ posterType, data }) {
	const { Title, ContactID, Description, Registro, HDPosterUrlPortrait, HDPosterUrlLandscape, ResumePos, Length } = data
	const urlNavLink = `/radio/${Registro}`
	const { dispatchRadio } = useContext(RadioContext)
	const { dispatchAudio } = useContext(AudioContext)
	const [contactInfo, setContactInfo] = useState([])
	const [moreInfoActive, setMoreInfoActive] = useState(false)
	const [readMoreActive, setReadMoreActive] = useState(false)

	const handleClick = () => {
		if(dispatchRadio && dispatchAudio){
			dispatchRadio({ type: 'setCurrentStation', payload: data })
			dispatchAudio({ type: 'setData', payload: data })
		}
	}

	return (
		<NavLink to={urlNavLink} className="item-link" activeClassName="active" onClick={handleClick}>
			<div className="item">
				<TitleItem title={Title} />
				<div className="background-item">
					<Img title={Title} posterType={posterType} imgPortrait={HDPosterUrlPortrait} imgLandscape={HDPosterUrlLandscape} />
					<div className="icon-active"><i className="far fa-pause-circle"></i></div>
					<AnimatedBars />
					{ResumePos &&
						<div className="progress-bar-content">
							<LinearProgress variant="determinate" value={getProgressMovie(ResumePos, Length)} />
						</div>
					}
				</div>
				<DescriptionItem description={Description} />
				<ContactInfo moreInfoActive={moreInfoActive} contactInfo={contactInfo} setMoreInfoActive={setMoreInfoActive} />
				<ReadMore readMoreActive={readMoreActive} Name={Title} Description={Description} setReadMoreActive={setReadMoreActive} />
				<Buttons contactId={ContactID} description={Description} setContactInfo={setContactInfo} setMoreInfoActive={setMoreInfoActive} setReadMoreActive={setReadMoreActive} />
			</div>
		</NavLink>
	)
}

function ItemCardChannel({ posterType, data }) {
	const { channelId } = useParams()
	const { stateVideo = [] } = useContext(VideoContext)
	const { loadingChannel = false, activeChannel = false} = stateVideo
	const { Id, Title, Name, Inicio, Fin, ContactID, Description, Registro, Poster, HDPosterUrlLandscape, ResumePos, Length, ContentType } = data
	const image = Poster ? Poster : HDPosterUrlLandscape
	const urlId = Id ? Id : Registro
	const urlNavLink = `/tv/${createUrlString(urlId)}`
	const [contactInfo, setContactInfo] = useState([])
	const [moreInfoActive, setMoreInfoActive] = useState(false)
	const [readMoreActive, setReadMoreActive] = useState(false)

	return (
		<NavLink to={urlNavLink} className="item-link" activeClassName="active">
			<div className="item">
				<TitleItem title={Name} />
				<div className="background-item">
					<Img title={Title} posterType={posterType} imgPortrait={image} imgLandscape={image} imgError={imgRecoverErrorTV} />
					{	urlId == channelId &&
						<StatusItem loading={loadingChannel} active={activeChannel}/>
					}
					{ResumePos &&
						<div className="progress-bar-content">
							<LinearProgress variant="determinate" value={getProgressMovie(ResumePos, Length)} />
						</div>
					}
				</div>
				<ProgressTime type={ContentType} startTime={Inicio} EndTime={Fin} />
				<EventTimeContent type={ContentType} startTime={Inicio} EndTime={Fin} />
				<DescriptionItem description={Description} />
				<ContactInfo moreInfoActive={moreInfoActive} contactInfo={contactInfo} setMoreInfoActive={setMoreInfoActive} />
				<ReadMore readMoreActive={readMoreActive} Name={Title} Description={Description} setReadMoreActive={setReadMoreActive} />
				<Buttons contactId={ContactID} description={Description} setContactInfo={setContactInfo} setMoreInfoActive={setMoreInfoActive} setReadMoreActive={setReadMoreActive} />
			</div>
		</NavLink>
	)
}

function ItemCollectionTrack({ posterType, data, collection }) {
	const { title, albumID, artists, portadaURL, portadaLandscapeURL } = data
	const [ matchTrack, setMatchTrack ] = useState(false)
	const { stateAudio, dispatchAudio } = useContext(AudioContext)
	const { audioRef, playing, pauseList } = stateAudio
	const { stateMusic, dispatchMusic } = useContext(MusicContext)
	const { track, collection: list } = stateMusic
	// data.id = collection.id
	data.type = 'playlist'

	const handleClick = (e) => {
		e.preventDefault()
		if(matchTrack){
			if(playing){
				audioRef.current.pause()
			}else{
				audioRef.current.play()
			}
		}

		if(pauseList){
			dispatchAudio({ type: 'setPauseList', payload: false })
		}

		dispatchAudio({ type: 'setListRandomTracks', payload: [] })
	}

	const handlePlay = (e) => {
		e.preventDefault()
		// dispatchMusic({ type: 'setTrack', payload: data })
		// dispatchMusic({ type: 'setCollection', payload: collection })
		// dispatchMusic({ type: 'setListTracks', payload: listTracks })

		collection.playlistID = collection.musicCollectionID
		data.id = collection.id
		console.log(collection)
		console.log(collection.id)
		console.log(data.id)
		dispatchAudio({ type: 'setPlaying', payload: true })
		dispatchAudio({ type: 'setPause', payload: false })
		dispatchMusic({ type: 'setPlaylist', payload: collection })
		dispatchMusic({ type: 'setListTracks', payload: collection.tracks })
		dispatchMusic({ type: 'setCollection', payload: collection })
		dispatchMusic({ type: 'setTrack', payload: collection.tracks[0] })
	}

	return (
		<div className="item-link">
			<div className="item">
				<NavLink
					to={{
						pathname: `/musica/album/${albumID}`
					}}
					className="background-item"
					activeClassName="active"
					isActive={() => {
						setTimeout(() => {
							if(	(data.regID == track.regID) && (data.id == list.id)){
								setMatchTrack(true)
								return true
							}else{
								setMatchTrack(false)
								return false
							}
						}, 100)
					}}>
					<Img title={title} posterType={posterType} imgSquare={portadaURL} imgLandscape={portadaLandscapeURL} />
					<MatchTrack matchTrack={matchTrack} playing={playing} handleClick={handleClick} handlePlay={handlePlay}/>
				</NavLink>
				<InfoTrack title={title} artists={artists} />
			</div>
		</div>
	)
}

function ItemAlbum({ posterType, data }) {	
	const [params, setParams] = useState(false)
	const [sendRequestAlbum, setSendRequestAlbum] = useState(false)
	const { data: dataAlbum } = useAxios('music-album', sendRequestAlbum, params)
	const { albumID, title, portadaURL } = data
	const [matchTrack, setMatchTrack] = useState(false)
	const { stateAudio, dispatchAudio } = useContext(AudioContext)
	const { audioRef, playing, pauseList } = stateAudio
	const { stateMusic, dispatchMusic } = useContext(MusicContext)
	const { album, collection } = stateMusic

	const handleClick = (e) => {
		e.preventDefault()
		if(matchTrack){
			if(playing){
				audioRef.current.pause()
			}else{
				audioRef.current.play()
			}
		}

		if(pauseList){
			dispatchAudio({ type: 'setPauseList', payload: false })
		}

		dispatchAudio({ type: 'setListRandomTracks', payload: [] })
	}

	const handlePlay = (e) => {
		e.preventDefault()
		setParams({ albumID: data.albumID })
		setSendRequestAlbum(true)
	}

	useEffect(() => {
		if(dataAlbum.length > 0){
			dataAlbum.albumID = data.albumID
			dataAlbum.id = uuid()
			dispatchAudio({ type: 'setPlaying', payload: true })
			dispatchAudio({ type: 'setPause', payload: false })
			dispatchMusic({ type: 'setAlbum', payload: dataAlbum })
			dispatchMusic({ type: 'setListTracks', payload: dataAlbum.tracks })
			dispatchMusic({ type: 'setCollection', payload: dataAlbum })
			dataAlbum.tracks[0].id = dataAlbum.id
			dispatchMusic({ type: 'setTrack', payload: dataAlbum.tracks[0] })
		}
	}, [dataAlbum])

	return (
		<div className="item-link">
			<div className="item">
				<NavLink
					to={`/musica/album/${albumID}`}
					className="background-item"
					activeClassName="active"
					isActive={() => {
						setTimeout(() => {
							if((album?.albumID == albumID) && (album.id == collection.id)){
								setMatchTrack(true)
								return true
							}else{
								setMatchTrack(false)
								return false
							}
						}, 100)
					}}>
					<Img title={title} posterType={posterType} imgSquare={portadaURL} imgLandscape={portadaURL} />
					<MatchTrack matchTrack={matchTrack} playing={playing} handleClick={handleClick} handlePlay={handlePlay}/>
				</NavLink>
				<InfoAlbum title={title} />
			</div>
		</div>
	)
}

function ItemTrackAlbum({ data }) {
	const { title, length, artists, trackNumber } = data
	const { stateAudio, dispatchAudio } = useContext(AudioContext)
	const { audioRef, playing, pauseList } = stateAudio
	const { stateMusic, dispatchMusic } = useContext(MusicContext)
	const { album, track, collection } = stateMusic
	data.type = 'album'
	
	const handlePlay = (e) => {
		e.preventDefault()
		if(e.nativeEvent.target.nodeName != 'P' && e.nativeEvent.target.nodeName != 'A'){
			data.id = album.id
			dispatchMusic({ type: 'setTrack', payload: data})
			dispatchMusic({ type: 'setListTracks', payload: album.tracks})
			dispatchMusic({ type: 'setCollection', payload: album})
		}
	}

	const handleClick = (e) => {
		e.preventDefault()
		if(playing){
			audioRef.current.pause()
		}else{
			audioRef.current.play()
		}

		if(pauseList){
			dispatchAudio({ type: 'setPauseList', payload: false })
		}

		dispatchAudio({ type: 'setListRandomTracks', payload: [] })
	}

	return (
		<div className="item-link">
			<div className="item" onClick={handlePlay}>
				<div className="number-track">
					{ (data.regID == track.regID) && (track.id == collection.id) && (track.type == 'album') ? (
						<span onClick={handleClick}>
							{playing ? (
								<i className="fas fa-pause" />
							) : (
								<i className="fas fa-play" />
							)}
						</span>
					) : (
						trackNumber
					) }
				</div>
				<div className="info-track">
					<h3 className="title-track">{title}</h3>
					<h4 className="artists-track">
						<ArtistsTrack artists={artists} />
					</h4>
				</div>
				<div className="time-track">
					{secondsToString(length)}
				</div>
				<div className="like-track">
					<span><i className="fal fa-heart"></i></span>
				</div>
				
				<div className="menu-track">
					<span><i className="far fa-ellipsis-h"></i></span>
				</div>
			</div>
		</div>
	)
}

function ItemPlaylist({ posterType, data }) {
	const [params, setParams] = useState(false)
	const [sendRequestPlaylist, setSendRequestPlaylist] = useState(false)
	const { data: dataPlaylist } = useAxios('music-playlist', sendRequestPlaylist, params)
	const { regID, title, portadaURL } = data
	const [matchTrack, setMatchTrack] = useState(false)
	const { stateAudio, dispatchAudio } = useContext(AudioContext)
	const { audioRef, playing, pauseList } = stateAudio
	const { stateMusic, dispatchMusic } = useContext(MusicContext)
	const { playlist, collection } = stateMusic

	const handleClick = (e) => {
		e.preventDefault()
		if(matchTrack){
			if(playing){
				audioRef.current.pause()
			}else{
				audioRef.current.play()
			}
		}

		if(pauseList){
			dispatchAudio({ type: 'setPauseList', payload: false })
		}

		dispatchAudio({ type: 'setListRandomTracks', payload: [] })
	}

	const handlePlay = (e) => {
		e.preventDefault()
		setParams({ playlistID: data.regID })
		setSendRequestPlaylist(true)
	}

	useEffect(() => {
		if(dataPlaylist.length > 0){
			dataPlaylist.playlistID = data.regID
			dataPlaylist.id = uuid()
			dispatchAudio({ type: 'setPlaying', payload: true })
			dispatchAudio({ type: 'setPause', payload: false })
			dispatchMusic({ type: 'setPlaylist', payload: dataPlaylist })
			dispatchMusic({ type: 'setListTracks', payload: dataPlaylist.tracks })
			dispatchMusic({ type: 'setCollection', payload: dataPlaylist })
			dataPlaylist.tracks[0].id = dataPlaylist.id
			dispatchMusic({ type: 'setTrack', payload: dataPlaylist.tracks[0] })
		}
	}, [dataPlaylist])

	return (
		<div className="item-link">
			<div className="item">
				<NavLink
					to={`/musica/playlist/${regID}`}
					className="background-item"
					activeClassName="active"
					isActive={() => {
						setTimeout(() => {
							if((playlist?.playlistID == regID) && (playlist.id == collection.id)){
								setMatchTrack(true)
								return true
							}else{
								setMatchTrack(false)
								return false
							}
						}, 100)
					}}>
					<Img title={title} posterType={posterType} imgSquare={portadaURL} imgLandscape={portadaURL} />
					<MatchTrack matchTrack={matchTrack} playing={playing} handleClick={handleClick} handlePlay={handlePlay}/>
				</NavLink>
				<InfoAlbum title={title} />
			</div>
		</div>
	)
}

function ItemTrackPlaylist({ data }) {
	const { title, length, artists, trackNumber, albumTitle, albumID } = data
	const { stateAudio, dispatchAudio } = useContext(AudioContext)
	const { audioRef, playing, pauseList } = stateAudio
	const { stateMusic, dispatchMusic } = useContext(MusicContext)
	const { playlist, track, collection } = stateMusic
	data.type = 'playlist'

	const handlePlay = (e) => {
		e.preventDefault()
		if(e.nativeEvent.target.nodeName != 'P' && e.nativeEvent.target.nodeName != 'A'){
			data.id = playlist.id
			dispatchMusic({ type: 'setTrack', payload: data})
			dispatchMusic({ type: 'setListTracks', payload: playlist.tracks})
			dispatchMusic({ type: 'setCollection', payload: playlist })
		}
	}

	const handleClick = (e) => {
		e.preventDefault()
		if(playing){
			audioRef.current.pause()
		}else{
			audioRef.current.play()
		}

		if(pauseList){
			dispatchAudio({ type: 'setPauseList', payload: false })
		}

		dispatchAudio({ type: 'setListRandomTracks', payload: [] })
	}

	return (
		<div className="item-link">
			<div className="item" onClick={handlePlay}>
				<div className="number-track">
					{ (track?.regID == data.regID) && (track.id == collection.id) && (track.type == 'playlist') ? (
						<span onClick={handleClick}>
							{playing ? (
								<i className="fas fa-pause" />
							) : (
								<i className="fas fa-play" />
							)}
						</span>
					) : (
						trackNumber
					) }
				</div>
				<div className="info-track">
					<h3 className="title-track">{title}</h3>
					<h4 className="artists-track">
						<ArtistsTrack artists={artists} />
					</h4>
				</div>
				<div className="album-track">
					<Link to={{
						pathname: `/musica/album/${albumID}`
					}}>
						{ albumTitle }
					</Link>
				</div>
				<div className="time-track">
					{secondsToString(length)}
				</div>
				<div className="like-track">
					<span><i className="fal fa-heart"></i></span>
				</div>
				
				<div className="menu-track">
					<span><i className="far fa-ellipsis-h"></i></span>
				</div>
			</div>
		</div>
	)
}

function ProgressTime({ type, startTime, EndTime }){
	if(!isEvent(type)){
		return null
	}

	return (
		<div className="progress-time-content" style={{ opacity: isLive(startTime, EndTime) ? '1' : '0'}}>
			<div className="progress-time-current" style={{ width: getProgressTimeEvent(startTime, EndTime) }}></div>
		</div>
	)
}

function EventTimeContent({ type, startTime, EndTime }){
	if(!isEvent(type)){
		return null
	}

	return (
		<div className="event-time-content">
			<p className="event-time-channel">
				<i className="far fa-clock"></i>{getEventTime(startTime, EndTime)}
			</p>
			{isLive(startTime, EndTime) &&
				<div className="button-live">EN VIVO</div>
			}
		</div>
	)
}

function StatusItem({ loading, active}){
	return (
		<div className="status-content">
			{	loading &&
				<LoaderSpinnerMUI />	
			}
			{	active &&
				<span className="icon-play-active">
					<i className="fad fa-pause-circle"></i>
				</span>	
			}
		</div>
	)
}

function TitleItem({ title }) {
	return (
		<div className="title-content">
			<h6 className="title-item">{title}</h6>
		</div>
	)
}

function DescriptionItem({ description }) {
	return (
		<div className="description-content">
			<h3 className="description-item">{limitString(description, 100)}</h3>
		</div>
	)
}

function Img({ title, posterType, imgPortrait, imgLandscape, imgSquare, imgError }) {
	const altImg = `img-${title}`

	return (
		<Fragment>
			{posterType == 0 &&
                <LazyImage img={imgPortrait} alt={altImg} type="webp" recoverType="jpg" imgError={imgError ? imgError : imgRecoverErrorPortrait} />
			}
			{posterType == 1 &&
                <LazyImage img={imgLandscape} alt={altImg} type="webp" recoverType="jpg" imgError={imgError ? imgError : imgRecoverErrorLandscape} />
			}
			{posterType == 2 &&
				<LazyImage img={imgSquare} alt={altImg} type="webp" recoverType="jpg" imgError={imgError ? imgError : imgRecoverErrorLandscape} />
			}
		</Fragment>
	)
}

function ProgressBar({ resumePos, length }) {

	return (
		<Fragment>
			{resumePos &&
				<div className="progress-bar-content">
					<LinearProgress variant="determinate" value={getProgressMovie(resumePos, length)} />
				</div>
			}
		</Fragment>
	)
}

function Info({ title, description }) {
	return (
		<div className="info-item">
			<div className="group-name-item">
				<h6 className="name-item">{title}</h6>
			</div>
			<div className="group-description-item">
				<p className="description-item">{limitString(description, 80)}</p>
			</div>
		</div>
	)
}

function InfoTrack({ title, artists }) {

	return (
		<div className="info-item">
			<div className="group-name-item">
				<h6 className="name-item">{	limitString(title, 40)}</h6>
			</div>
			{artists && (
				<div className="group-description-item">
					<ArtistsTrack artists={artists} />
				</div>
			)}
		</div>
	)
	// <p className="description-item">{limitString(artists, 80)}</p>
}

function InfoAlbum({ title }) {

	return (
		<div className="info-item">
			<div className="group-name-item">
				<h6 className="name-item">{title}</h6>
			</div>
			<div className="group-description-item">
				
			</div>
		</div>
	)
	// <p className="description-item">{limitString(artists, 80)}</p>
}

function MatchTrack({matchTrack, playing, handleClick, handlePlay}){
	return (
		<Fragment>
			<div className="hover-play" onClick={handlePlay}>
				<span><i className="fas fa-play"/></span>
			</div>
			{	matchTrack && playing &&
			<div className="active-play" onClick={handleClick}>
				<span><i className="fas fa-pause pause-icon"/></span>
			</div>
			}
			{	matchTrack && !playing &&
			<div className="active-play" onClick={handleClick}>
				<span><i className="fas fa-play play-icon"/></span>
			</div>
			}
		</Fragment>
	)
}

function Buttons({ contactId, description, setContactInfo, setMoreInfoActive, setReadMoreActive }) {
	const handleClickShowMoreInfo = (e) => {
		e.preventDefault()
		const getInfoContact = async () => {
			try {
				const data = await getContactInfo(contactId)
				setContactInfo(data)
				setMoreInfoActive(true)
			} catch (e) {

			}
		}

		getInfoContact()
	}

	const handleClickShowReadMore = (e) => {
		e.preventDefault()
		setReadMoreActive(true)
	}

	return (
		<div className="buttons-content">
			<Tooltip title="Más info" placement="top-start">
				<span tabIndex="0" onClick={handleClickShowMoreInfo}>
					<i className="fas fa-info" tabIndex="0" />
				</span>
			</Tooltip>

			{	isLimitString(description, 80) &&
				<Tooltip title="Leer más" placement="top-start">
					<span tabIndex="0" onClick={handleClickShowReadMore}>
						<i className="fas fa-ellipsis-h" tabIndex="0" />
					</span>
				</Tooltip>
			}
		</div>
	)
}

function ReadMore({ readMoreActive, Name, Description, setReadMoreActive }) {

	const handleClickHideReadMore = (e) => {
		e.preventDefault()
		setReadMoreActive(false)
	}

	return (
		<Fragment>
			{   readMoreActive
				? 	<CSSTransition in={readMoreActive} timeout={100} classNames="fade" unmountOnExit>
					<div className="contact-info-item" tabIndex="0">
						<div className="content-button-close" tabIndex="0">
							<span className="button-close" onClick={handleClickHideReadMore} tabIndex="0">
								<i className="fas fa-times" tabIndex="0" />
							</span>
						</div>
						<h2 className="title" tabIndex="0">{Name}</h2>
						<h3 className="description" tabIndex="0">{Description}</h3>
					</div>
				</CSSTransition>
				: 	null
			}
		</Fragment>
	)
}

function ContactInfo({ moreInfoActive, contactInfo, setMoreInfoActive }) {

	const handleClickHideMoreInfo = (e) => {
		e.preventDefault()
		setMoreInfoActive(false)
	}

     
	const handleClickWeb = () => {
		window.open(`https://${replaceString(contactInfo.ContactWeb, 'https://', '')}`, '_blank')
	}

	const handleClickFb = () => {
		window.open(`https://www.facebook.com/${contactInfo.ContactFb}`, '_blank')
	}

	const handleClickIg = () => {
		window.open(`https://www.instagram.com/${contactInfo.ContactIG}`, '_blank')
	}

	const handleClickTw = () => {
		window.open(`https://www.twitter.com/${contactInfo.ContactTw}`, '_blank')
	}

	const handleClickGm = () => {
		window.open(`https://www.google.com/maps/place/${replaceString(contactInfo.ContactLoc, ',', '+')}`, '_blank')
		// window.location = `https://www.google.com/maps/place/${replaceString(contactInfo.ContactLoc, ",", "+")}`
	}

	return (
		<Fragment>
			{     moreInfoActive
				? <CSSTransition in={moreInfoActive} timeout={100} classNames="fade" unmountOnExit>
					<div className="contact-info-item" tabIndex="0">
						<div className="content-button-close" tabIndex="0">
							<span className="button-close" onClick={handleClickHideMoreInfo} tabIndex="0">
								<i className="fas fa-times" tabIndex="0" />
							</span>
						</div>
						<h2 className="title" tabIndex="0">Información de {contactInfo.ContactTitle}</h2>
						<h3 className="description" tabIndex="0">{contactInfo.ContactDescription}</h3>
						{contactInfo.ContactFon &&
                                          <div className="content-phone" tabIndex="0">
                                          	<i className="fas fa-phone-alt" tabIndex="0"></i>
                                          	<p tabIndex="0">{contactInfo.ContactFon}</p>
                                          </div>
						}
						{contactInfo.ContactWeb &&
                                          <div className="content-web" tabIndex="0" onClick={handleClickWeb}>
                                          	<i className="fas fa-globe" tabIndex="0"></i>
                                          	<p tabIndex="0">{contactInfo.ContactWeb}</p>
                                          </div>
						}
						<div className="content-social-media" tabIndex="0">
							{contactInfo.ContactFb &&
                                                <span className="span-icon" tabIndex="0" onClick={handleClickFb}>
                                                	<i className="fab fa-facebook-square" tabIndex="0" />
                                                </span>
							}
							{contactInfo.ContactIG &&
                                                <span className="span-icon" tabIndex="0" onClick={handleClickIg}>
                                                	<i className="fab fa-instagram" tabIndex="0" />
                                                </span>
							}
							{contactInfo.ContactTw &&
                                                <span className="span-icon" tabIndex="0" onClick={handleClickTw}>
                                                	<i className="fab fa-twitter-square" tabIndex="0" />
                                                </span>
							}
							{contactInfo.ContactLoc &&
                                                <span className="span-icon" tabIndex="0" onClick={handleClickGm}>
                                                	<i className="fas fa-map-marker-alt" tabIndex="0" />
                                                </span>
							}
						</div>
					</div>
				</CSSTransition>
				: null
			}
		</Fragment>
	)
}

function ArtistsTrack({artists}){
	return (
		<div className="artists">		
			{artists.length > 0 ? (
				artists.map((artist, index) => {
					// const nameParam = createStringParam(artist.title)
					if(artists.length - 1 === index){
						return (
							<Link key={artist.artistID} to={{
								pathname: `/musica/artista/${artist.artistID}`,
								state: { artistID: artist.artistID, nameArtist: artist.title }
							}}>
								<p className="artist-item">{artist.title}</p>
							</Link>
						)
					}else{
						return (
							<Link key={artist.artistID} to={{
								pathname: `/musica/artista/${artist.artistID}`,
								state: { artistID: artist.artistID }
							}}>
								<p className="artist-item">{artist.title + ', '}</p>
							</Link>
						)
					}
				})
			):(
				<Link to={{
					pathname: `/musica/artista/${artists.artistID}`,
					state: { artistID: artists.artistID }
				}}>
					<p className="artist-item">{artists.title}</p>
				</Link>
			)}
		</div>
	)
}

export {
	ArtistsTrack
}