import React, { useState, useEffect, useContext } from 'react'
import axios from '../js/Axios'
import UserContext from '../context/UserContext'
import { ErrorMessageReload, ErrorMessageDefault } from '../components/ErrorMessage'
import { getUtcOffsetLocal } from '../js/Time'
import { validateSuscription } from '../js/Auth/validateSuscription'
import config from '../../config'

function getURL(section, { memclid }, params) {
	const endpoints = {
		'spotlight': `${config.API_URL}/sl/leon/home_spotlights`,
		'buttons-menu': `${config.API_URL}/cs/leon_home_bms`,
		'livetv': `${config.API_URL}/cmdata/leon/livetvplus/${memclid}/${getUtcOffsetLocal()}`,
		'catalogue-vod': `${config.API_URL}/cmdata/leon/entplus/${memclid}`,
		'catalogue-zonakids': `${config.API_URL}/cdata/leon/kids/${memclid}`,
		'radio': `${config.API_URL}/cdata/leon/radio/${memclid}`,
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
				const url = getURL(section, credentials, params)
				const response = await axios.get(url)
				validateSuscription(response, dispatchUser)
				setData(response)
				setLoading(false)
			} catch (e) {
				const code = parseInt(e.message)

				const listMessages = {
					1: 'No se pudo cargar la información.', // Error en petición o servidor no responde nada
					2: 'Ocurrió un problema.', // Error del cliente
					3: 'Ocurrió un problema.', // Error del servidor
					4: 'Error de conexión.', // Error de conexión
					5: 'No se pudo completar la conexión.', // Conexión abortada
					6: 'No se pudo conectar con el servidor.'// Error de timeout
				}

				const message = listMessages[code] || 'Error desconocido.'

				setLoading(false)

				if(count != 3){
					setError(<ErrorMessageReload message={message} onClick={handleRequest} />)
				}else{
					setError(<ErrorMessageDefault message={message} onClick={handleRequest} />)
				}
			}
		}

		if(count <= 3 && sendRequest){
			setLoading(true)
			setError(false)
			setData([])
			getData()
		}
	}, [section, count, sendRequest])

	return { 
		loading, 
		data, 
		error, 
		handleRequest 
	}
}
