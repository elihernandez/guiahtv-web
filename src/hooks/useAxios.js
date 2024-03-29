import React, { useState, useEffect, useContext } from 'react'
import axios from '../js/Axios'
import UserContext from '../context/UserContext'
import { ErrorMessageReload, ErrorMessageDefault } from '../components/ErrorMessage'
import { validateSuscription } from '../js/Auth/validateSuscription'
import { getURL } from '../api/endpoint'

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

	const Countdown = () =>{
		
		var secs
		if(count < 1) secs = 30
		else if(count == 1) secs = 45
		else secs = 60
		
		const [seconds, setSeconds] = useState(secs)

		useEffect(() => {
			if (seconds > 0) {
				setTimeout(() => setSeconds(seconds - 1), 1000)
			} else {
				setCount(count + 1)
			}
		})

		return (
			<div className="counter">
				<div className="counter">
					{seconds} segundos.
				</div>
			</div>
		)
	}

	// const fetchData = async () => {
	// 	const url = getURL(section, credentials, params)
	// 	return await axios.get(url)
	// }
	
	async function getData() {
		try {
			const url = getURL(section, credentials, params)
			const response = await axios.get(url)
			validateSuscription(response, dispatchUser)
			setData(response)
			setLoading(false)
			return response
		} catch (e) {
			const code = parseInt(e.message)

			const listMessages = {
				1: 'No se pudo cargar la información.', // Error en petición o servidor no responde nada
				2: 'Ocurrió un problema.', // Error del cliente
				3: 'Ocurrió un problema.', // Error del servidor
				4: 'Ha ocurrido un error de conexión.', // Error de conexión
				5: 'Se ha interrumpido la conexión.', // Conexión abortada
				6: 'No se pudo conectar con el servidor.'// Error de timeout
			}

			const message = listMessages[code] || 'Ocurrió un error inesperado.'

			var subMessage = ''

			if(count < 3)
				subMessage = 'Se volverá a intentar en '
			else
				subMessage = 'Favor de intentar más tarde.'
			

			setLoading(false)

			if(count != 3){
				setError(<ErrorMessageReload message={message} subMessage={subMessage} onClick={handleRequest} Countdown={Countdown}/>)
			}else{
				setError(<ErrorMessageDefault message={message} subMessage={subMessage} onClick={handleRequest} Countdown={Countdown}/>)
			}
		}
	}
	
	useEffect(() => {
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
		handleRequest,
		getData
	}
}
