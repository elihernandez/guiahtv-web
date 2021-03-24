import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../../../../context/UserContext'
import { getSearchResults } from '../../../../services/getSearchResults' 
import './styles.css'

export function SearchForm({ value, setValue, setResults }){
	const { stateUser } = useContext(UserContext)
	const { credentials } = stateUser
	const { memclid } = credentials
	

	const onChange = (e) => {
		setValue(e.target.value)
	}

	useEffect(() => {
        
		const getData = async() => {
			try{
				const data = await getSearchResults(memclid, decodeURIComponent(value))
				setResults(data)
				// console.log(data)
			}catch(e){
				console.log(e)
			}
		}

		if(value){
			getData()
		}
	}, [value])

	return(
		<div className="search-form">
			<form>
				<div className="input-group">
					<span><i className="fas fa-search"></i></span>
					<input type="text" autoFocus value={value} className="input-search" placeholder="Busca contenido..." onChange={onChange} />
				</div>
			</form>
		</div>
	)
}