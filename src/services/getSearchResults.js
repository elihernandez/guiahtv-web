import { API_URL } from './settings'
const axios = require('axios')
import { getUtcOffsetLocal } from '../js/Time'

export function getSearchResults(memclid, value) {
	const apiURL = `${API_URL}/cmetadata/search/leon/${memclid}/${value}/${getUtcOffsetLocal()}`

	return axios.get(apiURL)
		.then(function (response) {
			return response.data
		})
		.catch(function (error) {
			return (error)
		})
}