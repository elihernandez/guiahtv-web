import React from 'react'
import { Play } from '../Buttons/Play'
import { InfoAudio } from '../InfoAudio'
import { ReadMore } from '../Buttons/ReadMore'
import { MoreInfo } from '../Buttons/MoreInfo'
import { Fav } from '../Buttons/Fav'
import { Volume } from '../Buttons/Volume'
import { Fragment } from 'react'

export function Controls({stateAudio, dispatchAudio}){
      const { active, loading, playing, audioRef, data, error, volume } = stateAudio

      return(
            <div className="controls">
                  <Play data={data} audioRef={audioRef} loading={loading} active={active} playing={playing} error={error} dispatchAudio={dispatchAudio}/>
                  <InfoAudio active={active} data={data} error={error} />
                  {active &&
                        <Fragment>
                              <ReadMore />
                              <MoreInfo />
                              <Fav />
                        </Fragment>
                  }
                  <Volume audioRef={audioRef} volume={volume} />
            </div>
      )
}