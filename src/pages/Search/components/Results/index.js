import React, { Fragment } from 'react'
import { containsString } from '../../../../js/String'
import { List, TitleList } from '../../../../components/List'
import { Channels } from '../../../LiveTV/Components/Channels'
import './styles.css'

function TypeList({ dataCategory }){
	// console.log(dataCategory.cmData[0].ContentType)
	const contentType = dataCategory.cmData[0].ContentType 

	if(containsString(contentType, 'alacarta_movie')){
		return <List key={dataCategory.category} data={dataCategory} listType="catalogue" /> 
	}

	if(containsString(contentType, 'alacarta_series')){
		return <List key={dataCategory.category} data={dataCategory} listType="catalogue" /> 
	}

	if(containsString(contentType, 'kids')){
		return <List key={dataCategory.category} data={dataCategory} listType="catalogue" /> 
	}

	if(containsString(contentType, 'radio')){
		return (
			<Fragment>
				<TitleList title={dataCategory.category} />
				<List key={dataCategory.category} data={dataCategory} listType="radio" /> 
			</Fragment>
		)
	}

	if(containsString(contentType, 'livetv')){
		return (
			<Fragment>
				<TitleList title={dataCategory.category} />
				<List key={dataCategory.category} data={dataCategory} listType="channel" /> 
			</Fragment>
		)
	}
	// <List key={category.category} data={category} listType="catalogue" /> 
	return (
		null
	)
}

export function SearchResults({ value, results: data }){
	// console.log(data)

	if(data.length === 0 && value){
		return <h1 className="not-results-message">No se encontraron resultados para "{value}"</h1>
	}
    
	return (
		<div className="search-results">
			{
				data.map((category) => {
					return <TypeList key={category.category} dataCategory={category}/>
				})
			}
		</div>
	)
}