
import { API_URL } from './settings'
const axios = require('axios')

export function getContactInfo(ContactID) {
      const apiURL = `${API_URL}/getinfo/contactid/${ContactID}`
      // https://lap55.com/json/api/getinfo/contactid/25

      return axios.get(apiURL)
      .then(function (response) {
            return response.data
      })
      .catch(function (error) {
            return (error)
      })
}