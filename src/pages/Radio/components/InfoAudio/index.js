import React, { Fragment, useEffect } from 'react'
import './styles.css'

function Title({ data }) {
      const { Title } = data
      return <h3 className="title-audio">{Title}</h3>
}

function Img({ data }) {
      const { Title, HDPosterUrlLandscape } = data

      return (
            <img className="thumbnail-radio" alt={`thumbnail-${Title}`} src={HDPosterUrlLandscape} />
      )
}

export function InfoAudio({ active, data, error }) {

      return (
            <div className="info-audio-wrapper">
                  <div>
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
                              <Title data={data} />
                        }
                  </div>
                  <div className="thumbnail-content">
                        {data &&
                              <Img data={data} />
                        }
                  </div>
            </div>
      )
}