import { useEffect } from 'react'
const { detect } = require('detect-browser')
const browser = detect()
import { v4 as uuidv4 } from 'uuid'
import { useCookies } from 'react-cookie';

export function useAuth() {
      const [cookies, setCookie] = useCookies()

      useEffect(() => {
            if (!cookies.platform) setCookie('platform', 'Web Browser', { path: '/', maxAge: 3600 }) 
            if (!cookies.deviceType) setCookie('deviceType', browser.name, { path: '/', maxAge: 3600 })
            if (!cookies.deviceVersion) setCookie('deviceVersion', browser.version, { path: '/', maxAge: 3600 })
            if (!cookies.uuid) setCookie('uuid', uuidv4(), { path: '/', maxAge: 60 * 60 * 24 * 365 })
            if (!cookies.userAgent) setCookie('userAgent', window.navigator.userAgent, { path: '/', maxAge: 3600 })
      }, [cookies])

      if(cookies){
            return cookies
      }
}