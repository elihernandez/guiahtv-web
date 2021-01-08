import {API_URL} from './settings'
const axios = require('axios')

export function getButtonsMenu(){
  const apiURL = `${API_URL}/cs/leon_home_bm`

  return axios.get(apiURL)
  .then(function (response) {
        return response.data
  })
  .catch(function (error) {
        return (error)
  })
}