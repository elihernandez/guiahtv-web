import React, { useContext } from 'react'
import { Switch, Route, useRouteMatch } from "react-router-dom"
import VodContext from '../../../../context/VodContext'
import { useRequest } from '../../../../hooks/useRequest'
import { VideoVod } from '../../../Video'
import { Catalogue } from '../Catalogue'
import { InfoContent } from '../../../../components/Catalogue'

export function Content() {
      const { url } = useRouteMatch()
      const { stateVod, dispatchVod } = useContext(VodContext)
      const { dataVod } = stateVod
      const { loading, data } = useRequest('alacarta', dispatchVod, dataVod)

      return (
            <div className="section-content">
                  <Switch>
                        <Route exact path={`${url}`} >
                              <Catalogue loading={loading} data={data} />
                        </Route>
                        <Route exact path={`${url}/:contentType/:contentId`} >
                              <InfoContent />
                        </Route>
                        <Route exact path={`${url}/:contentType/:contentId/video`} >
                              <VideoVod state={stateVod} dispatchVod={dispatchVod} />
                        </Route>
                  </Switch>
            </div>
      )
}