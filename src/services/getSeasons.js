// url: urlGetApi+'season/leon/'+data.movie.ContentTypeOrder,

import {API_URL} from './settings'
const axios = require('axios')

export function getSeasons(ContentTypeOrder){
      const apiURL = `${API_URL}/season/leon/${ContentTypeOrder}`
    
      return axios.get(apiURL)
      .then(function (response) {
            return response.data
      })
      .catch(function (error) {
            return (error)
      })
 }