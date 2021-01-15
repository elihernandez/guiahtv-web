import { useState, useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'
import { API_URL } from '../services/settings'
import { validateSuscription } from '../js/Auth/validateSuscription'
const axios = require('axios')
const moment = require('moment')

function getUtcOffsetLocal(){
      let utcOffsetLocal = "UTC"+(moment().utcOffset()/60);
  
      return utcOffsetLocal;
}

function getURL(section, user){
      let apiURL
      switch(section){
            case 'livetv':
                  let utcOffsetLocal = getUtcOffsetLocal()
                  apiURL = `${API_URL}/cmdata/leon/livetvplus/${user.memclid}/${utcOffsetLocal}`
                  break
            default:
                  break
      }

      return apiURL
}

export function useRequest(section){
      const { userAuth } = useContext(UserContext)
      const [loading, setLoading] = useState(false)
      const [data, setData] = useState()
      
      useEffect(() => {
            setLoading(true)
            if(userAuth){
                  const apiURL = getURL(section, userAuth)
                  axios.get(apiURL)
                  .then(function (response) {
                        setData(validateSuscription(response))
                        setLoading(false)
                  })
                  .catch(function (error) {
                        setData(error)
                        setLoading(false)
                  })
            }
      }, [userAuth])

      return {loading, data}
}