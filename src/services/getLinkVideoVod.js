import { API_URL } from './settings'
const axios = require('axios')

export function getLinkVideoVod({Registro}, {memclid}){
	const apiURL = `${API_URL}/cmd/getLinkLeon/${Registro}/${memclid}`

	return axios.get(apiURL)
		.then(function (response) {
			return response.data
		})
		.catch(function (_error) {
			return ('error')
		})
}