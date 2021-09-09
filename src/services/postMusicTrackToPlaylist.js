const axios = require('axios')

export function postTrackToPlaylist(token, trackID, playlistID) {
	const apiURL = `https://api.guiah.tv/post/track/${token}/1`

	const body = {
		'PlayListID': playlistID,
		'TrackID': trackID
	}

	return axios.post(apiURL, body)
		.then(function (response) {
			return response.data
		})
		.catch(function (error) {
			return Promise.reject(error)
		})
}