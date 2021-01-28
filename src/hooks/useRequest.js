import { useState, useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'
import { API_URL } from '../services/settings'
import { validateSuscription } from '../js/Auth/validateSuscription'
import { getData } from '../services/getData'
import { getUtcOffsetLocal } from '../js/Time'

function getURL(section, credentials) {
      let apiURL
      switch (section) {
            case 'livetv':
                  let utcOffsetLocal = getUtcOffsetLocal()
                  apiURL = `${API_URL}/cmdata/leon/livetvplus/${credentials.memclid}/${utcOffsetLocal}`
                  break
            case 'alacarta':
                  apiURL = `${API_URL}/cmdata/leon/entplus/${credentials.memclid}`
                  break
            case 'zonakids':
                  apiURL = `${API_URL}/cdata/leon/kids/${credentials.memclid}`
                  break
            default:
                  break
      }

      return apiURL
}

export function useRequest(section, dispatch, data) {
      const { stateUser, dispatchUser } = useContext(UserContext)
      const { credentials } = stateUser
      const [loading, setLoading] = useState(false)

      useEffect(() => {
            setLoading(true)
            const requestData = async () => {
                  try {
                        const requestUrl = getURL(section, credentials)
                        const response = await getData(requestUrl, dispatchUser)
                        if (response === "error") throw new Error("Ocurrión un problema, intenta otra vez")
                        data = validateSuscription(response, dispatchUser)
                        dispatch({ type: 'setData', payload: response })
                        setLoading(false)
                  } catch (e) {
                        console.log(e.message)
                  }
            }

            if (credentials.memclid && !data) {
                  requestData()
            }
      }, [credentials])

      return { loading, data }
}