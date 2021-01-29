import React from 'react'
import { InfoMovie } from '../../components/InfoContent'

export function ContentMovie({data}){
      return (
            <div className="movie-info info-wrapper">
                  <InfoMovie data={data}/>
            </div>
      )
}
