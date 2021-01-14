const axios = require('axios')

export function getData({apiURL}) {
      return axios.get(apiURL)
      .then(function (response) {
            return response.data
      })
      .catch(function (error) {
            return (error)
      })
}