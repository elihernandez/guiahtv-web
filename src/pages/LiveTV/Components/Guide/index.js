import React, { useState, useContext, useEffect } from 'react'
import { Switch, Route, useRouteMatch } from "react-router-dom"
import LiveTvContext from '../../../../context/LiveTvContext'
import UserContext from '../../../../context/UserContext'
// import { useRequest } from '../../../../hooks/useRequest'
import { Categories } from '../Categories'
import { Channels } from '../Channels'
import GuideLoader from '../Loader'
import { getLiveTV } from '../../../../services/getLiveTV'
import { CSSTransition } from 'react-transition-group'
import './styles.css'

export function GuideChannels() {
      let { url } = useRouteMatch()
      const { userAuth } = useContext(UserContext)
      const { state, dispatchTV } = useContext(LiveTvContext)
      const { dataTV } = state
      const [loading, setLoading] = useState(true)

      useEffect(() => {
            const requestData = async () => {
                  try {
                        const response = await getLiveTV(userAuth)
                        if (!response.length) throw new Error('No se pudo obtener la información.')
                        dispatchTV({ type: 'updateData', payload: response })
                        setLoading(false)
                  } catch (e) {
                        console.log(e)
                  }
            }

            if (userAuth) {
                  setLoading(true)
                  requestData()
            }
            
      }, [userAuth])

      return (
            <div className="guide">
                  {     loading
                  ?     <GuideLoader />
                  :     <div className="guide-wrapper">
                              <Categories data={dataTV} />
                              <Switch>
                                    <Route exact path={`${url}`} >
                                          <Channels data={dataTV} />
                                    </Route>
                                    <Route exact path={`${url}/:categoria/:canal?`} >
                                          <Channels data={dataTV} />
                                    </Route>
                              </Switch>
                        </div>
                  }
            </div>
      )
}