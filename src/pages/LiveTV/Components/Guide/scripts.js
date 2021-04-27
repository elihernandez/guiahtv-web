import React from 'react'
import { List } from '../../../../components/List'

export function findInitialValues(data, contentId){
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

export function findFirstChannel(data){
	return data[0].cmData[0]
}

export function getDataArray(data, findedValues){
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