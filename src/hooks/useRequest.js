import { useState, useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'
import { API_URL } from '../services/settings'
import {getLiveTV} from '../services/getLiveTV'
import { useCookies } from 'react-cookie'
const axios = require('axios')

export function useRequest(section){
      let apiURL
      const { userAuth } = useContext(UserContext)
      const [loading, setLoading] = useState(true)
      const [data, setData] = useState([])
      const [cookies, setCookie] = useCookies()
      
      switch(section){
            case 'livetv':
                  apiURL = `${API_URL}/cmdata/leon/livetvplus/${userAuth.memclid}/UTC-7`
                  break
            default:
                  break
      }
      
      useEffect(() => {
            setLoading(true)
            if(userAuth.memclid){
                  axios.get(apiURL)
                  .then(function (response) {
                        switch(response.data[0].SuscriptionStatus) {
                              case 0:
                                    // Suscripción expirada
                                    setCookie('memclid', "", { path: '/' })
                                    location.reload()
                                    break
                              case 1:
                                    // Suscripción válida
                                    setData(response.data)
                                    setLoading(false)
                                    break
                              case 2:
                                    // Suscripción periodo de gracia
                                    setData(response.data)
                                    setLoading(false)
                                    break
                              case 3:
                                    // Suscripción gratuita
                                    setData(response.data)
                                    setLoading(false)
                                    break
                              case 4:
                                    // Sesión no válida
                                    setCookie('memclid', "", { path: '/' })
                                    location.reload()
                                    break
                              default:
                                    setData(response.data)
                                    setLoading(false)
                                    break
                        }
                  })
                  .catch(function (error) {
                        setData(error)
                        setLoading(false)
                  })
            }
      }, [userAuth])

      return {loading, data}
}