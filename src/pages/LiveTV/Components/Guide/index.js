import React, { useState, useContext, useEffect } from 'react'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import LiveTVContext from '../../../../context/LiveTvContext'
import VideoContext from '../../../../context/VideoContext'
import { useAxios } from '../../../../hooks/useAxios'
import { GuideLoader } from './components/Loader'
import { ButtonLoader } from './components/Button'
import { CustomTabs } from '../../../../components/Tabs'
import { findInitialValues, findFirstChannel, getDataArray } from './scripts'
import { isNotEmptyArray } from '../../../../js/Array'
import './styles.css'

export function Guide() {
	const history = useHistory()
	const { url } = useRouteMatch()
	const { channelId } = useParams() 
	const { state, dispatchTV } = useContext(LiveTVContext)
	const { guideOnce } = state
	// const { stateVideo } = useContext(VideoContext)
	// const { dataChannel } = stateVideo
	const [dataTabs, setDataTabs] = useState(null)
	const [showGuide, setShowGuide] = useState(false)
	const [sendRequest, setSendRequest] = useState(false)
	const [showGuideLoader, setShowGuideLoader] = useState(false)
	const [initialValues, setInitialValues] = useState({ initialSlide: 0, tabContent: 0})
	const { data, error, handleRequest } = useAxios('livetv', sendRequest)

	const handleSendRequest = () => {
		setSendRequest(true)
	}

	const handleData = (data) => {
		const findedValues = findInitialValues(data, channelId)
		setInitialValues(findedValues)
		const dataTabs = getDataArray(data, findedValues)
		setDataTabs(dataTabs)
		setTimeout(() => {
			setShowGuideLoader(false)
			setShowGuide(true)
			if(sendRequest === true){
				setSendRequest(false)
			}
		}, 500)
	}

	const loadChannel = (data) => {
		if(!channelId){
			const firstChannel = findFirstChannel(data)
			history.replace(`${url}/${firstChannel.Id}`)
		}
	}

	useEffect(() => {
		if(!guideOnce){
			setShowGuideLoader(true)
			setSendRequest(true)
			dispatchTV({ type: 'setGuideOnce', payload: true })
		}

		if(isNotEmptyArray(data)){
			dispatchTV({ type: 'updateData', payload: data })
			loadChannel(data)
			handleData(data)
		}
	}, [data])

	// useEffect(() => {
	// 	let id = undefined
	// 	if(dataChannel) id = dataChannel.Id ? dataChannel.Id : dataChannel.Registro
	// 	if(id != channelId) handleData(data)		
	// }, [channelId, dataChannel])

	useEffect(() =>{
		if(sendRequest){
			setShowGuideLoader(true)
		}
	}, [sendRequest])

	useEffect(() => {
		if(error){
			setShowGuide(false)
			setShowGuideLoader(false)
		}
	}, [error])

	return (
		error ? (
			<div className="guide-error">{error}</div>) : (
			<div className="guide">
				{	showGuideLoader && 
					<GuideLoader />
				}
				{	!showGuide && !showGuideLoader && guideOnce &&
					<ButtonLoader error={error} handleRequest={handleRequest} handleSendRequest={handleSendRequest} />
				}
				{	showGuide && !error &&
					<CSSTransition in={showGuide} timeout={300} classNames="fade" unmountOnExit>
						<div className="guide-wrapper">
							{dataTabs &&
								<CustomTabs data={dataTabs} initialTab={initialValues.tabContent} />
							}
						</div>
					</CSSTransition>
				}
			</div>
		)
	)
}