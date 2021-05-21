const axios = require('axios')

export function putPlaylist(token, data, playlistID){
	const apiURL = `https://api.guiah.tv/put/playlist/${playlistID}/${token}/1`

	return axios.put(apiURL, data)
		.then(function (response) {
			return response.data
		})
		.catch(function (error) {
			return Promise.reject(error)
		})
}