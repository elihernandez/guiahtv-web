import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { LoaderSpinnerMUI } from '../../../../components/Loader'
import RadioContext from '../../../../context/RadioContext'
import { useRequest } from '../../../../hooks/useRequest'
import { CustomTabs } from '../../../../components/Tabs'
import { List } from '../../../../components/List'
import { useAxios } from '../../../../hooks/useAxios'
import './styles.css'

function findInitialValues(data, contentId){
	let initialSlide, tabContent
	data.map((categories, indexC) => {
		categories.cmData.map((element, index) => {
			if(element.Registro == contentId){
				initialSlide = index
				tabContent = indexC
			}
		})
	})
	return { initialSlide, tabContent }
}

export function Guide(){
	let { contentId } = useParams()
	const { stateRadio, dispatchRadio } = useContext(RadioContext)
	const { dataRadio } = stateRadio 
	const { loading, data } = useRequest('radio', dispatchRadio, dataRadio)
	const [ tabs, setTabs ] = useState(null)
	const [initialValues, setInitialValues] = useState({})
	const dataTabs = []
	const { error } = useAxios('radio')

	useEffect(() => {
		if(data){
			data.map((category, index) => {
				dataTabs.push(
					{
						title: category.category,
						content:  <List key={category.category} data={category} listType="radio" indexList={index} tabValues={initialValues} />
					}
				)
			})
			setTabs(dataTabs)
		}
	}, [initialValues])

	useEffect(() => {
		if(data){
			const findedValues = findInitialValues(data, contentId)
			setInitialValues(findedValues)
		}
	}, [data, contentId])

	return (
		error ? (error) : (
			<div className="guide-radio">
				{loading &&
					<LoaderSpinnerMUI />
				}
				{tabs &&
					<CustomTabs data={tabs} initialTab={initialValues.tabContent} />
				}
			</div>
		)
		
	)
}