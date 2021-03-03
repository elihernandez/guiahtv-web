import React, { Fragment, useState, useContext, useEffect } from 'react'
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
      const { dataTV, guideOnce } = state
      const [loading, setLoading] = useState(false)
      const [show, setShow] = useState(false)
      const [hide, setHide] = useState(false)

      const requestData = async () => {
            setLoading(true)
            setHide(true)
            try {
                  const response = await getLiveTV(credentials)
                  if (!response.length) throw new Error('No se pudo obtener la información.')
                  dispatchTV({ type: 'updateData', payload: response })
                  dispatchTV({ type: 'setGuideOnce', payload: true })
                  setTimeout(() => {
                        setLoading(false)
                        setShow(true)
                  }, 500)
            } catch (e) {
                  console.log(e)
            }
      }

      useEffect(() => {
            if (!guideOnce) {
                  setHide(true)
                  setLoading(true)
                  requestData()
            }
      }, [])

      return (
            <div className="guide">
                  {loading &&
                        <GuideLoader />
                  }
                  {!hide &&
                        <div className="content-button-guide">
                              <button type="button" className="button-guide" onClick={()=> requestData()}>
                                    <i className="fas fa-chevron-up" />
                                    Mostrar guía
                              </button>
                        </div>
                  }
                  <CSSTransition in={show} timeout={300} classNames="fade" unmountOnExit>
                        <div className="guide-wrapper">
                              {dataTV &&
                                    <Fragment>
                                          <Categories data={dataTV} />
                                          <Switch>
                                                <Route exact path={`${url}`} >
                                                      <Channels data={dataTV} />
                                                </Route>
                                                <Route exact path={`${url}/:categoria/:canal?`} >
                                                      <Channels data={dataTV} />
                                                </Route>
                                          </Switch>
                                    </Fragment>
                              }
                        </div>
                  </CSSTransition>
            </div>
      )
}