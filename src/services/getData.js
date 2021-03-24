const axios = require('axios')

export function getData(requestUrl, dispatch) {
	return axios.get(requestUrl)
		.then(function (response) {
			return response.data
		})
		.catch(function (error) {
			return 'error'
		})
}