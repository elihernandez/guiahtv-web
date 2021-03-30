import React from 'react'
import { containsString } from '../../../../js/String'
import { List } from '../../../../components/List'
import { LoaderSpinnerMUI } from '../../../../components/Loader'
import './styles.css'

function TypeList({ dataCategory }){
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
			<List key={dataCategory.category} data={dataCategory} listType="radio" /> 
		)
	}

	if(containsString(contentType, 'livetv')){
		return (
			<List key={dataCategory.category} data={dataCategory} listType="channel" /> 
		)
	}
	
	return (
		null
	)
}

export function SearchResults({ loading, value, results: data }){

	if(loading){
		return <LoaderSpinnerMUI />
	}

	if(data.length === 0 && value){
		return <h1 className="not-results-message">No se encontraron resultados para "{value}"</h1>
	}
    
	if(value){
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

	return null
}