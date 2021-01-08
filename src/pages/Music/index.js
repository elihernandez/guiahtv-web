import React from 'react'
import { useRequest } from '../../hooks/useRequest'

export function Music(){
      const {loading, data} = useRequest()

      return (
            <>
                  {
                        loading
                        ?     <h1>Cargando</h1>
                        :     <h1>Hola musica</h1>
                  }
            </>
      )
}