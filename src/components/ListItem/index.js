import React, { Fragment, useState, useContext } from 'react'
import { NavLink, useRouteMatch, useHistory, useParams } from 'react-router-dom'
import VodContext from '../../context/VodContext'
import RadioContext from '../../context/RadioContext'
import AudioContext from '../../context/AudioContext'
import VideoContext from '../../context/VideoContext'
import LiveTvContext from '../../context/LiveTvContext'
import { getContactInfo } from '../../services/getContactInfo'
import { getProgressMovie, isLive, isEvent, getProgressTimeEvent, getEventTime } from '../../js/Time'
import {  limitString, isLimitString, isSerie, isEpisode, typeContent, replaceString, containsString, createUrlString } from '../../js/String'
import Tooltip from '@material-ui/core/Tooltip'
import LinearProgress from '@material-ui/core/LinearProgress'
import { imgSourceSetJpg } from '../../js/Image'
import { CSSTransition } from 'react-transition-group'
import { LazyImage } from '../Image'
import { AnimatedBars } from '../AnimatedBars'
import { LoaderSpinnerMUI } from '../Loader'
import imgRecoverErrorTV from '../../assets/images/backgrounds/onerror/error-tv.png'
import imgRecoverErrorPortrait from '../../assets/images/backgrounds/onerror/error-portrait.png'
import imgRecoverErrorLandscape from '../../assets/images/backgrounds/onerror/error-landscape.png'
import './styles.css'

export function Item({ data, posterType, listType, titleCategory, category }) {
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
	}

	return Item
}

function ItemCatalogue({ url, type, posterType, data, titleCategory }) {
	let urlNavLink
	const { Title, Registro, ContentType, HDPosterUrlPortrait, HDPosterUrlLandscape, ResumePos, Length, ShortDescriptionLine1 } = data
	const { dispatchVod } = useContext(VodContext)

	const handleClick = () => {
		if (isSerie(ContentType)) {
			dispatchVod({ type: 'setSerie', payload: data })
		} else {
			dispatchVod({ type: 'setMovie', payload: data })
		}

		// if (isEpisode(ShortDescriptionLine1)) {
		// 	dispatchVod({ type: 'setMovie', payload: data })
		// }
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

function Img({ title, posterType, imgPortrait, imgLandscape, imgError }) {
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
				<LazyImage img={imgLandscape} alt={altImg} type="webp" recoverType="jpg" imgError={imgError ? imgError : imgRecoverErrorLandscape} />
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