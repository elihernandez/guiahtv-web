import React from 'react'
import { Play } from '../Buttons/Play'
import { InfoAudio } from '../InfoAudio'
import { Volume } from '../Buttons/Volume'
import { Fav } from '../Buttons/Fav'

export function Controls({stateAudio, dispatchAudio}){
      console.log(stateAudio)
      const { active, loading, playing, audioRef, data, error, volume } = stateAudio

      return(
            <div className="controls">
                  <Play audioRef={audioRef} loading={loading} active={active} playing={playing} error={error} dispatchAudio={dispatchAudio}/>
                  <InfoAudio active={active} data={data} error={error} />
                  <Fav />
                  <Volume audioRef={audioRef} volume={volume} />
            </div>
      )
}