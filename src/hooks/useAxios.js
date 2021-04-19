import React, { useState, useEffect, useContext } from 'react'
import { getUtcOffsetLocal } from '../js/Time'
import { validateSuscription } from '../js/Auth/validateSuscription'
import UserContext from '../context/UserContext'
import config from '../../config'
import axios from '../js/Axios'
import styled from 'styled-components'

function getURL(section, { memclid }, params) {
	let apiURL
	switch (section) {
	case 'spotlight':
		apiURL = `${config.API_URL}/sl/leon/home_spotlight`
		break
	case 'buttons-menu':
		apiURL = `${config.API_URL}/cs/leon_home_bm`
		break
	case 'livetv':
		apiURL = `${config.API_URL}/cmdata/leon/livetvplus/${memclid}/${getUtcOffsetLocal()}`
		break
	case 'catalogue-vod':
		apiURL = `${config.API_URL}/cmdata/leon/entplus/${memclid}`
		break
	case 'radio':
		apiURL = `${config.API_URL}/cdata/leon/radio/${memclid}`
		break
	case 'catalogue-zonakids':
		apiURL = `${config.API_URL}/cdata/leon/kids/${memclid}`
		break
	case 'music-home':
		apiURL = `https://api.guiah.tv/music/home/${memclid}`
		break
	case 'track-link':
		apiURL = `https://api.guiah.tv/get/trackLink/${params.trackId}/${memclid}`
		break
	default:
		break
	}

	return apiURL
}

export function useAxios(section, sendRequest = true, params = {}){
	const { stateUser, dispatchUser } = useContext(UserContext)
	const { credentials } = stateUser
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState([])
	const [error, setError] = useState(false)
	const [count, setCount] = useState(0)

	const onClickRequest = () => {
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

	return { loading, data, error, onClickRequest }
}

const Wrapper = styled.div`
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
`

const Text = styled.p`
      font-size: 1vw;
      text-align: center;
      margin: .5vw 0;
`

const Button = styled.button`
      font-size: .75vw;
      text-align: center;
      color: white;
      border: .125vw solid white;
      padding: .5vw;
      border-radius: 4px;
      margin: .5vw 0;
      transition: all 150ms ease-in-out;

      &:hover {
            background: white;
            color: black;
      }
`

const errorMessage = (onClick) => {
	return (
		<Wrapper>
			<Text>No se pudo cargar el contenido</Text>
			<Button onClick={onClick}>Volver a intentar</Button>
		</Wrapper>
	)
}

const errorMessageTwo = () => {
	return (
		<Wrapper>
			<Text>No se pudo cargar el contenido</Text>
		</Wrapper>
	)
}