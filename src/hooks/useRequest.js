import { useState, useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'
import { useCookies } from 'react-cookie'
import { API_URL } from '../services/settings'
import { validateSuscription } from '../js/Auth/validateSuscription'
const axios = require('axios')
const moment = require('moment')

function getUtcOffsetLocal(){
      let utcOffsetLocal = "UTC"+(moment().utcOffset()/60);
  
      return utcOffsetLocal;
}

function getURL(section, credentials){
      let apiURL
      switch(section){
            case 'livetv':
                  let utcOffsetLocal = getUtcOffsetLocal()
                  apiURL = `${API_URL}/cmdata/leon/livetvplus/${credentials.memclid}/${utcOffsetLocal}`
                  break
            case 'vod':
                  apiURL = `${API_URL}/cmdata/leon/entplus/${credentials.memclid}`
                  break
            default:
                  break
      }

      return apiURL
}

export function useRequest(section, dispatch){
      const { stateUser, dispatchUser } = useContext(UserContext)
      const { credentials } = stateUser
      const [loading, setLoading] = useState(false)
      const [data, setData] = useState()
      const [setCookie] = useCookies()
      
      useEffect(() => {
            setLoading(true)
            if(credentials.memclid){
                  const apiURL = getURL(section, credentials)
                  axios.get(apiURL)
                  .then(function (response) {
                        const res = validateSuscription(response, dispatchUser)
                        // if(){

                        // }
                        // console.log(res)
                        // throw new Error(res)
                        // setData()
                        // setLoading(false)
                  })
                  .catch(function (error) {
                        console.log(error)
                        // setData(error)
                        // setLoading(false)
                  })
            }
      }, [credentials])

      return {loading, data}
}