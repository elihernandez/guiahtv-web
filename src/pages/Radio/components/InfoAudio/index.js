import React, { useEffect } from 'react'
import './styles.css'

function Title({data}){
      const { Title } = data
      return  <h3 className="title-audio">{Title}</h3>
}

export function InfoAudio({active, data, error}){

      return (
            <div className="info-audio-wrapper">
                  {error &&
                        <p>Estación de radio no disponible por el momento</p>
                  }
                  {active &&
                        <p>Estás escuchando:</p>
                  }
                  {!active && !error && data &&
                        <p>Cargando radio</p>
                  }
                  {data &&
                        <Title data={data}/>
                  }
            </div>
      )
}