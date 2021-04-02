import React, { useState, useEffect, useContext, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { createUrlString } from '../../../../js/String'
import LiveTvContext from '../../../../context/LiveTvContext'
import VideoContext from '../../../../context/VideoContext'
import { Channel } from '../Channel'
import { List } from '../../../../components/List'
const cssTransition = require('css-transition')
import './styles.css'

function isEvent(ContentType){
	if(ContentType == 'leon_livetv_Event'){
		return true
	}

	return false
}

export function Channels({ data }) {
	let { categoria, canal } = useParams()
	const { state, dispatchTV } = useContext(LiveTvContext)
	const { currentPage, currentCategory } = state
	const { stateVideo, dispatch } = useContext(VideoContext)
	const { dataChannel } = stateVideo
	const [channels, setChannels] = useState(null)
	const [page, setPage] = useState(0)
	const [totalPages, setTotalPages] = useState(0)
	const refChannels = useRef()
	const history = useHistory()

	const handleClickLeft = () => {
		let moveP = 100 * (page - 1)
		cssTransition(refChannels.current, {
			transform: `translate3d(-${moveP}%, 0, 0)`
		}, 500, function () {
			setPage(page - 1)
		})
	}

	const handleClickRight = () => {
		let moveP = 100 * (page + 1)
		cssTransition(refChannels.current, {
			transform: `translate3d(-${moveP}%, 0, 0)`
		}, 500, function () {
			setPage(page + 1)
		})
	}

	const resetTransition = () => {
		cssTransition(refChannels.current, {
			transform: 'translate3d(0%, 0, 0)'
		}, 0, function () {   
		})
	}

	const countPages = (category) => {
		let pages = category.cmData.length / 5
		if ((pages % 1) != 0) {
			pages = Math.ceil(pages)
		}

		setTotalPages(pages - 1)
	}

	const validateUrl = () => {
		if(currentCategory){
			// console.log(1)
			if(categoria == currentCategory){
				// console.log(2)
				let moveP = 100 * (currentPage)
				// console.log(moveP)
				cssTransition(refChannels.current, {
					transform: `translate3d(-${moveP}%, 0, 0)`
				}, 0, function () {
					setPage(currentPage)
					data.map((category) => {
						if (createUrlString(category.category) == currentCategory) {
							setTotalPages(0)
							setChannels(category)
							countPages(category)
							category.cmData.map((channel, index) => {
								if(isEvent(channel.ContentType)){
									if(channel.Id == dataChannel.Id){
										history.push('/tv/'+categoria+'/'+channel.Id)
										let length = index + 1
										let pages = length / 5
										if(pages > 1){
											pages = Math.trunc(pages)
											setPage(pages)
											let moveP = 100 * (pages)
											// console.log(pages)
											cssTransition(refChannels.current, {
												transform: `translate3d(-${moveP}%, 0, 0)`
											}, 0, function () {
                                                                       
											})
										}
                                                         
									}
								}else{
									if(createUrlString(channel.Name) == createUrlString(dataChannel.Name)){
										history.push('/tv/'+categoria+'/'+createUrlString(channel.Name))
										let length = index + 1
										let pages = length / 5
										if(pages > 1){
											pages = Math.trunc(pages)
											setPage(pages)
											let moveP = 100 * (pages)
											// console.log(moveP)
											cssTransition(refChannels.current, {
												transform: `translate3d(-${moveP}%, 0, 0)`
											}, 0, function () {
                                                                       
											})
										}
                                                         
									}
								}
							})
						}
					})
				})
			}else{ 
				if(channels){
					// console.log(3)
					resetTransition()
					data.map((category) => {
						if (createUrlString(category.category) == categoria) {
							setPage(0)
							setTotalPages(0)
							setChannels(category)
							countPages(category)
						}
					})
				}else{
					// console.log(4)
					history.push(currentCategory)
					let moveP = 100 * (currentPage)
                              
					cssTransition(refChannels.current, {
						transform: `translate3d(-${moveP}%, 0, 0)`
					}, 0, function () {
						setPage(currentPage)
						data.map((category) => {
							if (createUrlString(category.category) == currentCategory) {
								setTotalPages(0)
								setChannels(category)
								countPages(category)
							}
						})
					})
				}
			}
		}else{
			if(!categoria){
				// console.log(5)
				// console.log(data[0])
				setChannels(data[0])
				countPages(data[0])
				dispatch({ type: 'updateData', payload: data[0].cmData[0] })
				dispatchTV({ type: 'updatePage', payload: page })
				dispatchTV({ type: 'updateCategory', payload: createUrlString(data[0].category) })
				if(isEvent(data[0].cmData[0].ContentType)){
					history.push('/tv/'+createUrlString(data[0].category)+'/'+data[0].cmData[0].Id)
				}else{
					history.push('/tv/'+createUrlString(data[0].category)+'/'+createUrlString(data[0].cmData[0].Name))
				}
			}else{
				if(!canal){
					if(dataChannel){
						// console.log(7)
						data.map((category) => {
							if (createUrlString(category.category) == categoria) {
								setChannels(category)
								setTotalPages(0)
								countPages(category)
								dispatch({ type: 'updateData', payload: category.cmData[0] })
								dispatchTV({ type: 'updatePage', payload: page })
								dispatchTV({ type: 'updateCategory', payload: categoria })
								if(isEvent(category.cmData[0].ContentType)){
									history.push('/tv/'+categoria+'/'+category.cmData[0].Id)
								}else{
									history.push('/tv/'+categoria+'/'+createUrlString(category.cmData[0].Name))
								}
							}
						})
					}else{
						// console.log(9)
						data.map((category) => {
							if (createUrlString(category.category) == categoria) {
								setChannels(category)
								setTotalPages(0)
								countPages(category)
								dispatch({ type: 'updateData', payload: category.cmData[0] })
								dispatchTV({ type: 'updatePage', payload: page })
								dispatchTV({ type: 'updateCategory', payload: categoria })
								if(isEvent(category.cmData[0].ContentType)){
									history.push('/tv/'+categoria+'/'+category.cmData[0].Id)
								}else{
									history.push('/tv/'+categoria+'/'+createUrlString(category.cmData[0].Name))
								}
							}
						})
					}
					resetTransition()
				}else{
					// console.log(8)
					data.map((category) => {
						if (createUrlString(category.category) == categoria) {
							category.cmData.map((channel, index) => {
								if(isEvent(channel.ContentType)){
									if(channel.Id == canal){
										// console.log(index)
										dispatch({ type: 'updateData', payload: channel })
										dispatchTV({ type: 'updatePage', payload: page })
										dispatchTV({ type: 'updateCategory', payload: categoria })
										resetTransition()
									}
								}else{
									if(createUrlString(channel.Name) == canal){
                                                          
										let length = index + 1
										let pages = length / 5
										if(pages > 1){
											pages = Math.trunc(pages)
											setPage(pages)
											let moveP = 100 * (pages)
											// console.log(moveP)
											cssTransition(refChannels.current, {
												transform: `translate3d(-${moveP}%, 0, 0)`
											}, 0, function () {
                                                                       
											})
										}
										dispatch({ type: 'updateData', payload: channel })
										dispatchTV({ type: 'updatePage', payload: page })
										dispatchTV({ type: 'updateCategory', payload: categoria })
                                                           
									}
								}
							})
							setChannels(category)
							setTotalPages(0)
							countPages(category)
						}
                                    
					})
				}
			}
		}
	}

	useEffect(() => {
		validateUrl()
	}, [categoria])

	// return (
	// 	<div className="channels">
	// 		{channels &&
	// 			<List data={channels} listType="channel"/>
	// 		}
	// 	</div>
	// )
	return (
		<div className="channels">
			<div className="channels-wrapper" ref={refChannels}>
				{channels &&
					<div className="content-channels">
						{
							channels.cmData.map((channel) => {
								return <Channel key={channel.Id} data={channel} category={channels} page={page} categoria={categoria}/>
							})
						}
					</div>
				}
			</div>
			{
				totalPages > 0 && page > 0 &&
                        <div className="direction direction-prev" onClick={handleClickLeft}>
                        	<i className="fas fa-chevron-left"></i>
                        </div>
			}
			{
				(totalPages > 1) && (page < totalPages) &&
                        <div className="direction direction-next" onClick={handleClickRight}>
                        	<i className="fas fa-chevron-right"></i>
                        </div>
			}
		</div>
	)
}