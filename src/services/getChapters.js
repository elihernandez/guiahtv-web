
import {API_URL} from './settings'
const axios = require('axios')

export function getChapters(serieId, TitleSeason, credentials){
	const apiURL = `${API_URL}/episode/leon/${serieId}/temp/${TitleSeason}/${credentials.memclid}`
    
	return axios.get(apiURL)
		.then(function (response) {
			return response.data
		})
		.catch(function (error) {
			return (error)
		})
}