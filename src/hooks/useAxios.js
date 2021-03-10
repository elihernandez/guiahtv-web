import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
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
                        setError('No se pudo cargar el contenido.')
                        // if(count != 3){
                        //       setError(errorMessage(onClickRequest))
                        // }else{
                        //       setError(errorMessageTwo())
                        // }
                  }
            }

            if(count <= 3){
                  getUrl()
            }
      }, [count])

      return { data, error, onClickRequest }
}

const Wrapper = styled.div`
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
`;

const Text = styled.p`
      font-size: 1vw;
      text-align: center;
      margin: .5vw 0;
`;

const Button = styled.button`
      font-size: .75vw;
      text-align: center;
      color: white;
      border: .125vw solid white;
      padding: .5vw;
      border-radius: 4px;
      margin: .5vw 0;
      transition: all 150ms ease-in-out;

      &:hover {
            background: white;
            color: black;
      }
`;

const errorMessage = (onClick) => {
      return (
            <Wrapper>
                  <Text>No se pudo cargar el contenido</Text>
                  <Button onClick={onClick}>Volver a intentar</Button>
            </Wrapper>
      )
}

const errorMessageTwo = () => {
      return (
            <Wrapper>
                  <Text>No se pudo cargar el contenido</Text>
            </Wrapper>
      )
}