import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../../../context/UserContext'
import { getSearchResults } from '../../../../services/getSearchResults' 
import './styles.css'

export function SearchForm({ value, setValue, setResults, setLoading }){
	const { stateUser } = useContext(UserContext)
	const { credentials } = stateUser
	const { memclid } = credentials
	const history = useHistory()

	const handleClick = () => {
		history.goBack()
	}
	
	const onChange = (e) => {
		setLoading(true)
		setValue(e.target.value)
	}

	useEffect(() => {
		const getData = async() => {
			try{
				const data = await getSearchResults(memclid, decodeURIComponent(value))
				setResults(data)
				setLoading(false)
			}catch(e){
				setLoading(false)
			}
		}

		const interval = setTimeout(() => {
			if(value){
				getData()
			}else{
				setLoading(false)
			}
		}, 1000)

		return () => clearTimeout(interval) 
	}, [value])

	return(
		<div className="search-form">
			<form>
				<div className="back-content" onClick={handleClick}>
					<i className="fas fa-arrow-left" />
				</div>
				<div className="input-group">
					<span><i className="fas fa-search"></i></span>
					<input type="text" autoFocus value={value} className="input-search" placeholder="Busca contenido..." onChange={onChange} />
				</div>
			</form>
		</div>
	)
}