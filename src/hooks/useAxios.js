import { useState, useEffect, useContext } from 'react'
import axios from '../js/Axios'
import UserContext from '../context/UserContext'
// import { ErrorMessage } from '../components/ErrorMessage'
import { getUtcOffsetLocal } from '../js/Time'
import { validateSuscription } from '../js/Auth/validateSuscription'
import config from '../../config'

function getURL(section, { memclid }, params) {
	const endpoints = {
		'spotlight': `${config.API_URL}/sl/leon/home_spotlight`,
		'buttons-menu': `${config.API_URL}/cs/leon_home_bm`,
		'livetv': `${config.API_URL}/cmdata/leon/livetvplus/${memclid}/${getUtcOffsetLocal()}`,
		'catalogue-vod': `${config.API_URL}/cmdata/leon/entplus/${memclid}`,
		'radio': `${config.API_URL}/cdata/leon/radio/${memclid}`,
		'catalogue-zonakids': `${config.API_URL}/cdata/leon/kids/${memclid}`,
		'music-home': `https://api.guiah.tv/music/home/${memclid}/1`,
		'music-artist': `https://api.guiah.tv/get/artist/${params.artistID}`,
		'music-album': `https://api.guiah.tv/get/album/${params.albumID}`,
		'music-playlist': `https://api.guiah.tv/get/playlist/${params.playlistID}`,
		'track-link': `https://api.guiah.tv/get/trackLink/${params.trackId}/${memclid}`
	}

	return endpoints[section]
}

export function useAxios(section, sendRequest = true, params = {}){
	const { stateUser, dispatchUser } = useContext(UserContext)
	const { credentials } = stateUser
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState([])
	const [error, setError] = useState(false)
	const [count, setCount] = useState(0)

	const handleRequest = () => {
		setCount(count + 1)
	}

	useEffect(() => {
		async function getData() {
			try {
				setLoading(true)
				const url = getURL(section, credentials, params)
				const response = await axios.get(url)
				validateSuscription(response, dispatchUser)
				setData(response)
				setLoading(false)
			} catch (error) {
				setLoading(false)
				if(count != 3){
					setError(1)
				    //setError(errorMessage(onClickRequest))
				}else{
					setError(2)
				    //setError(errorMessageTwo())
				}
			}
		}

		if(count <= 3 && sendRequest){
			setError(false)
			setData([])
			getData()
		}
	}, [section, count, sendRequest])

	return { loading, data, error, handleRequest }
}
