const axios = require('axios')

export function postPlaylist(token, data){
	const apiURL = `https://api.guiah.tv/post/playlist/${token}/1`

	return axios.post(apiURL, data)
		.then(function (response) {
			return response.data
		})
		.catch(function (error) {
			return Promise.reject(error)
		})
}