import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useCookies } from 'react-cookie'
import { capitalizeFirstLetter } from '../js/String'
const { detect } = require('detect-browser')

export function useAuth() {
	const browser = detect()     
	const minAge = 60 * 60 * 24
	const maxAge = 60 * 60 * 24 * 365
	const [cookies, setCookie] = useCookies()

	useEffect(() => {
		if (!cookies.platform) setCookie('platform', capitalizeFirstLetter(browser.name), { path: '/', maxAge: maxAge }) 
		if (!cookies.deviceType) setCookie('deviceType', 'Web browser', { path: '/', maxAge: minAge, })
		if (!cookies.deviceVersion) setCookie('deviceVersion', browser.version, { path: '/', maxAge: minAge, })
		if (!cookies.uuid) setCookie('uuid', uuidv4(), { path: '/', maxAge: maxAge, })
		if (!cookies.userAgent) setCookie('userAgent', window.navigator.userAgent, { path: '/', maxAge: minAge, })
	}, [cookies])

	if(cookies){
		return cookies
	}
}