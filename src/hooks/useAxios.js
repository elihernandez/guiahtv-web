import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../../config'
import { isEmptyArray } from '../js/Array'

const instance = axios.create({
      baseURL: config.API_URL,
      timeout: 10000
})

instance.interceptors.response.use(
      function (response) {
            if(response.status === 200){
                  if(isEmptyArray(response.data)){
                        throw new Error()
                  }

                  return response.data
            }
      }, 
      function () {
            throw new Error()
      }
)

export default instance

export function useAxios(url){
      const [data, setData] = useState([])
      const [error, setError] = useState(false)
      const [count, setCount] = useState(0)

      const onClickRequest = () => {
            setCount(count + 1)
      }

      useEffect(() => {
            async function getUrl() {
                  try {
                        const response = await instance.get(url)
                        setData(response)
                  } catch (error) {
                        setError(error)
                  }
            }

            if(count <= 3){
                  getUrl()
            }
      }, [count])

      return { data, error, onClickRequest }
}
