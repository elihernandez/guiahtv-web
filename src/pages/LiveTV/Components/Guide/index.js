import React, { useState, useContext, useEffect } from 'react'
import { Switch, Route, useRouteMatch } from "react-router-dom"
import { getLiveTV } from '../../../../services/getLiveTV'
import LiveTvContext from '../../../../context/LiveTvContext'
import UserContext from '../../../../context/UserContext'
import { Categories } from '../Categories'
import { Channels } from '../Channels'
import { GuideLoader } from '../Loader'
import { CSSTransition } from 'react-transition-group'
import './styles.css'

export function GuideChannels() {
      let { url } = useRouteMatch()
      const { stateUser } = useContext(UserContext)
      const { credentials } = stateUser
      const { state, dispatchTV } = useContext(LiveTvContext)
      const { dataTV } = state
      const [loading, setLoading] = useState(true)
      const [show, setShow] = useState(false)

      useEffect(() => {
            const requestData = async () => {
                  try {
                        const response = await getLiveTV(credentials)
                        if (!response.length) throw new Error('No se pudo obtener la información.')
                        dispatchTV({ type: 'updateData', payload: response })
                        setTimeout(() => {
                              setLoading(false)
                              setShow(true)
                        }, 500)
                  } catch (e) {
                        console.log(e)
                  }
            }

            if (credentials) {
                  setLoading(true)
                  requestData()
            }

      }, [])

      // return (
      //       <div className="guide">
      //             {     loading
      //                   ? <GuideLoader />
      //                   : <div className="guide-wrapper">
      //                         <Categories data={dataTV} />
      //                         <Switch>
      //                               <Route exact path={`${url}`} >
      //                                     <Channels data={dataTV} />
      //                               </Route>
      //                               <Route exact path={`${url}/:categoria/:canal?`} >
      //                                     <Channels data={dataTV} />
      //                               </Route>
      //                         </Switch>
      //                   </div>
      //             }
      //       </div>
      // )
      return (
            <div className="guide">
                  {loading &&
                        <GuideLoader />
                  }
                  <CSSTransition in={show} timeout={300} classNames="fade" unmountOnExit>
                  {dataTV &&
                  <div className="guide-wrapper">
                  
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
                                    </CSSTransition>
            </div>
      )
}