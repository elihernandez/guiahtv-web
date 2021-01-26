
import { API_URL } from './settings'
const axios = require('axios')

export function getVod({memclid}) {
      const apiURL = `${API_URL}/cmdata/leon/entplus/${memclid}`

      return axios.get(apiURL)
      .then(function (response) {
            return response.data
      })
      .catch(function (error) {
            return (error)
      })
}