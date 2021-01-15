import {API_URL} from './settings'
const axios = require('axios')

export function getSpotlight(){
  const apiURL = `${API_URL}/sl/leon/home_spotlight`

      return axios.get(apiURL)
      .then(function (response) {
            return response.data
      })
      .catch(function (error) {
            return (error)
      })
}