// urlGetApi+'cmdata/leon/livetvplus/'+suscriberId+'/'+utcOffset;
import { useContext } from 'react'
// import UserContext from '../../../../context/UserContext'
import { API_URL } from './settings'
const axios = require('axios')
const moment = require('moment')

function getUtcOffsetLocal(){
      let utcOffsetLocal = "UTC"+(moment().utcOffset()/60);
  
      return utcOffsetLocal;
}

export function getLiveTV({memclid}) {
      let utcOffsetLocal = getUtcOffsetLocal()
      const apiURL = `${API_URL}/cmdata/leon/livetvplus/${memclid}/${utcOffsetLocal}`

      return axios.get(apiURL)
      .then(function (response) {
            return response.data
      })
      .catch(function (error) {
            return (error)
      })
}