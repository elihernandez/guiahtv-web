const axios = require('axios')

export function deletePlaylist(token, playlistID){
	const apiURL = `https://api.guiah.tv/delete/playlist/${playlistID}/${token}/1`

	return axios.delete(apiURL)
		.then(function (response) {
			return response.data
		})
		.catch(function (error) {
			return Promise.reject(error)
		})
}