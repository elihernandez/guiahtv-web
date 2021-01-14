// urlGetApi+'cmdata/leon/livetvplus/'+suscriberId+'/'+utcOffset;
import { useContext } from 'react'
import { API_URL } from './settings'
const axios = require('axios')

export function getLiveTV({memclid}) {

      const apiURL = `${API_URL}/cmdata/leon/livetvplus/${memclid}/UTC-7`

      return axios.get(apiURL)
      .then(function (response) {
            return response.data
      })
      .catch(function (error) {
            return (error)
      })
}