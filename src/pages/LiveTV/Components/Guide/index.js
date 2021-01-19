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
      // const history = useHistory()
      // let { pathname } = useLocation()
      // const { data } = useRequest('livetv')
      let { url } = useRouteMatch()
      let { data, setData } = useContext(LiveTvContext)
      const { userAuth } = useContext(UserContext)
      const [loading, setLoading] = useState(true)
      const [show, setShow] = useState(false)

      useEffect(() => {
           
            const requestData = async () => {
                  try {
                        const response = await getLiveTV(userAuth)
                        if (!response.length) throw new Error('No se pudo obtener la información.')
                        data.data = response
                        setData(data)
                        setLoading(false)
                        setShow(true)
                  } catch (e) {
                        console.log(e)
                  }
            }

            if (userAuth) {
                  setLoading(true)
                  requestData()
            }

            // if (pathname == '/tvenvivo') {
            //       history.push(`/tvenvivo/canalestv`)
            //       // setVideoData(data[0].cmData[0])
            // }
            
      }, [userAuth])

      return (
            <div className="guide">
                  {     loading
                  ?     <GuideLoader />
                  :     <CSSTransition in={show} timeout={300} classNames="active">
                              <div className="guide-wrapper">
                                    <Categories data={data.data} />
                                    <Switch>
                                          <Route exact path={`${url}`} >
                                                <Channels data={data.data} />
                                          </Route>
                                          <Route exact path={`${url}/:categoria/:canal?`} >
                                                <Channels data={data.data} />
                                          </Route>
                                    </Switch>
                              </div>
                        </CSSTransition>
                  }
            </div>
      )
}