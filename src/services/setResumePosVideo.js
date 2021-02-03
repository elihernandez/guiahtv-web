// url: urlGetApi+'cmd/sCmResPos/'+actualVideo.movie.Registro+'/'+positionVideoMil+'/'+suscriberId,

import { API_URL } from './settings'
const axios = require('axios')

export function setResumePosVideo(Registro, positionVideo, {memclid}){
      const apiURL = `${API_URL}/cmd/sCmResPos/${Registro}/${positionVideo}/${memclid}`

      return axios.get(apiURL)
      .then(function (response) {
            return response.data
      })
      .catch(function (error) {
            return ("error")
      })
}