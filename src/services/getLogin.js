import {API_URL} from './settings'
const axios = require('axios')
// const cookies = useAuth()

export default function getLogin(username, password, user){

      const apiURL = `${API_URL}/cmd/logusr/${username}/${password}`
      const data = {
            // DevicePlatform: cookies.platform,
            // DeviceType: cookies.deviceType,
            // DeviceUUID: cookies.uuid,
            // DeviceVersion:  cookies.deviceVersion
            DevicePlatform: user.platform,
            DeviceType: user.deviceType,
            DeviceUUID: user.uuid,
            DeviceVersion: user.deviceVersion
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