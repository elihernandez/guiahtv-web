import React, { useState, useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import LiveTVContext from '../../../../context/LiveTvContext'
import VideoContext from '../../../../context/VideoContext'
import UserContext from '../../../../context/UserContext'
import { GuideLoader } from './components/Loader'
import { CustomTabs } from '../../../../components/Tabs'
import { List } from '../../../../components/List'
import { getLiveTV } from '../../../../services/getLiveTV'
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
	const { stateUser } = useContext(UserContext)
	const { credentials } = stateUser
	const { state, dispatchTV } = useContext(LiveTVContext)
	const { dataTV, guideOnce } = state
	const { stateVideo } = useContext(VideoContext)
	const { dataChannel } = stateVideo
	const [loading, setLoading] = useState(false)
	const [showGuide, setShowGuide] = useState(false)
	const [showButtonGuide, setShowButtonGuide] = useState(false)
	const [dataTabs, setDataTabs] = useState(null)
	const [initialValues, setInitialValues] = useState({ initialSlide: 0, tabContent: 0})

	const handleClick = async() => {
		const response = await requestData()
		handleDataTV(response)
	}

	const handleDataTV = (response) => {
		const findedValues = findInitialValues(response, channelId)
		setInitialValues(findedValues)
		const data = getDataArray(response,findedValues)
		setDataTabs(data)
		setTimeout(() => {
			setLoading(false)
			setShowGuide(true)
		}, 500)
	}

	const requestData = async () => {
		try {
			setLoading(true)
			setShowButtonGuide(true)
			const response = await getLiveTV(credentials)
			if (!response.length) throw new Error('No se pudo obtener la información.')
			dispatchTV({ type: 'updateData', payload: response })
			return response
		} catch (e) {
			console.log(e)
		}
	}

	const initLoading = async() => {
		const response = await requestData()
		const firstChannel = findFirstChannel(response)
		if(!channelId){
			history.replace(`/tv/${firstChannel.Id}`)
		}else{
			history.replace('/tv/')
			history.replace(`/tv/${channelId}`)
		}
		dispatchTV({ type: 'setGuideOnce', payload: true })
		handleDataTV(response)
	}

	useEffect(() => {
		if (!guideOnce) {
			initLoading()
		}
	}, [])

	useEffect(() => {
		let id = undefined
		if(dataChannel) id = dataChannel.Id ? dataChannel.Id : dataChannel.Registro
		if(id != channelId) handleDataTV(dataTV)
	}, [channelId])

	return (
		<div className="guide">
			{loading && 
                <GuideLoader />
			}
			{!showButtonGuide &&
				<div className="content-button-guide">
					<button type="button" className="button-guide" onClick={() => handleClick()}>
						<i className="fas fa-chevron-up" />
							Mostrar guía
					</button>
				</div>
			}
			{showGuide &&
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