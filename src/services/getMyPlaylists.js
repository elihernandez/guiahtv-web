const axios = require('axios')

export function getMyPlaylists({ credentials }){

	const apiURL = `https://api.guiah.tv/get/myplaylist/${credentials.memclid}/1`

	return axios.get(apiURL)
		.then(function (response) {
			return response.data
		})
		.catch(function () {
			return Promise.reject('Ocurrió un problema al recuperar las playlists del usuario.')
		})
}