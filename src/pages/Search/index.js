import React, { useEffect, useState } from 'react'
import { SearchForm } from './components/Form'
import { SearchResults } from './components/Results'
import { hideTopMenuNavbar, showTopMenuNavbar } from '../../js/TopMenu'
import './styles.css'

export function SearchPage(){
	const [results, setResults] = useState([])
	const [value, setValue] = useState('')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		showTopMenuNavbar()

		return () => {
			hideTopMenuNavbar()
		}
	}, [])

	return (
		<div className="search-page">
			<SearchForm value={value} setValue={setValue} setLoading={setLoading} setResults={setResults} />
			<SearchResults loading={loading} value={value} results={results} />
		</div>
	)
}