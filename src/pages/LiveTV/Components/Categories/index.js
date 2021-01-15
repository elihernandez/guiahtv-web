import React, { useContext } from 'react'
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom"
import { LiveTvChannel, LiveTvEvent } from '../Channel/index'
import { createUrlString } from '../../../../js/String/index'
import LiveTvContext from '../../../../context/LiveTvContext'
import GuideLoader from '../ContentLoader/Guide'

function Channels({ data, classActive}) {
      const classes = `content-channels ${classActive}`

      return (
            <div className={classes}>
                  {
                        data.map((channel) => {
                              switch (channel.ContentType) {
                                    case 'leon_livetv_Channel':
                                          return <LiveTvChannel key={channel.Id} dataChannel={channel} />
                                          break
                                    case 'leon_livetv_Event':
                                          return <LiveTvEvent key={channel.Id} dataChannel={channel} />
                                          break
                                    case 'leon_livetv_Radio':
                                          return <LiveTvEvent key={channel.Id} dataChannel={channel} />
                                          break
                              }
                        })
                  }
            </div>
      )
}

function Category({category, data}) {
      let classActive = ""
      const { categoria } = useParams()
      if (createUrlString(category) == categoria) {
            classActive = "active"
      }
      
      return <Channels data={data} classActive={classActive}/>

}

export function Categories({ refer }) {
      let { url } = useRouteMatch()
      const { data } = useContext(LiveTvContext)

      return (
            <div className="channels-wrapper" ref={refer}>
                  {
                        data
                  ?  
                        <div className="channels-guide-tv">
                              <Switch>
                                    <Route exact path={`${url}/:categoria`} >
                                          {
                                                data.map(({category, cmData}) => {
                                                      return <Category key={category} category={category} data={cmData}/>
                                                })  
                                          }
                                    </Route>
                              </Switch>
                        </div>
                  :     <GuideLoader /> 
                  }
            </div>
      )
}