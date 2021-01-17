import { API_URL } from './settings'
const axios = require('axios')

export function getVideo({SignalID}, {memclid}){
      const apiURL = `${API_URL}/cmd/getLinkLiveTV/${SignalID}/${memclid}`

      return axios.get(apiURL)
      .then(function (response) {
            return response.data
      })
      .catch(function (error) {
            return (error)
      })
}