const axios = require('axios')

export function deleteTrackToPlaylist(token, trackID, playlistID) {
	const apiURL = `https://api.guiah.tv/delete/track/${token}/1`

	const body = {
		'PlayListID': playlistID,
		'TrackID': trackID
	}

	return axios.delete(apiURL, {
		data: body
	})
		.then(function (response) {
			return response.data
		})
		.catch(function (error) {
			return Promise.reject(error)
		})
}