import React, { useState, useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import LiveTVContext from '../../../../context/LiveTvContext'
import VideoContext from '../../../../context/VideoContext'
import { useAxios } from '../../../../hooks/useAxios'
import { GuideLoader } from './components/Loader'
import { CustomTabs } from '../../../../components/Tabs'
import { List } from '../../../../components/List'
import { LoaderButton } from './components/LoaderButton'
import './styles.css'

function findInitialValues(data, contentId){
	let initialSlide = 0
	let tabContent = 0
	
	data.map((categories, indexC) => {
		categories.cmData.map((element, index) => {
			const channelId = element.Id ? element.Id : element.Registro
			if(channelId == contentId){
				initialSlide = index
				tabContent = indexC
			}
		})
	})
	return { initialSlide, tabContent }
}

function findFirstChannel(data){
	return data[0].cmData[0]
}

function getDataArray(data, findedValues){
	const dataTabs = []

	data.map((category, index) => {
		dataTabs.push(
			{
				title: category.category,
				content:  <List key={category.category} data={category} listType="channel" indexList={index} tabValues={findedValues} />
				
			}
		)
	})

	return dataTabs
}

export function Guide() {
	const { channelId } = useParams() 
	const history = useHistory()
	const { state, dispatchTV } = useContext(LiveTVContext)
	const { guideOnce } = state
	const { stateVideo } = useContext(VideoContext)
	const { dataChannel } = stateVideo
	const [showGuideLoader, setShowGuideLoader] = useState(false)
	const [showGuide, setShowGuide] = useState(false)
	const [dataTabs, setDataTabs] = useState(null)
	const [initialValues, setInitialValues] = useState({ initialSlide: 0, tabContent: 0})
	const [sendRequest, setSendRequest] = useState(false)
	const { data, error, onClickRequest } = useAxios('livetv', sendRequest)

	const handleClick = () => {
		setSendRequest(true)
	}

	const handleData = (response) => {
		const findedValues = findInitialValues(response, channelId)
		setInitialValues(findedValues)
		const data = getDataArray(response,findedValues)
		setDataTabs(data)
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
			history.replace(`/tv/${firstChannel.Id}`)
		}
		handleData(data)
	}

	useEffect(() => {
		if(!guideOnce){
			setShowGuideLoader(true)
			setSendRequest(true)
			dispatchTV({ type: 'setGuideOnce', payload: true })
		}
	}, [])

	useEffect(() => {
		if(data.length > 0){
			dispatchTV({ type: 'updateData', payload: data })
			loadChannel(data)
		}
	}, [data])

	useEffect(() => {
		let id = undefined
		if(dataChannel) id = dataChannel.Id ? dataChannel.Id : dataChannel.Registro
		if(id != channelId) handleData(data)		
	}, [channelId, dataChannel])

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
		<div className="guide">
			{	showGuideLoader && 
                <GuideLoader />
			}
			{	!showGuide && !showGuideLoader && guideOnce &&
				<LoaderButton error={error} onClickRequest={onClickRequest} handleClick={handleClick} />
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
}