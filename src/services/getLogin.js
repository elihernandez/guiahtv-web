import {API_URL} from './settings'
const axios = require('axios')

export function getLogin(username, password, credentials){

      const apiURL = `${API_URL}/cmd/logusr/${username}/${password}`
      const data = {
            DevicePlatform: credentials.platform,
            DeviceType: credentials.deviceType,
            DeviceUUID: credentials.uuid,
            DeviceVersion: credentials.deviceVersion
      }

      return axios.get(apiURL, {
            params: data
      })
      .then(function (response) {
            return response.data
      })
      .catch(function (error) {
            return error
      })
}