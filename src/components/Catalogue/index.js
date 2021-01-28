import React, { Fragment, useContext } from 'react'
import { Switch, Route, useRouteMatch } from "react-router-dom"
import VodContext from '../../context/VodContext'
import { useRequest } from '../../hooks/useRequest'
import { LoaderSpinnerMUI } from '../Loader'
import { List } from '../List'
import { InfoContent } from '../InfoContent'
import { CSSTransition } from 'react-transition-group'
import './styles.css'

export function CatalogueVod({requestApi}) {
      const { url } = useRouteMatch()
      const { stateVod, dispatchVod } = useContext(VodContext)
      const { dataVod } = stateVod 
      const { loading, data } = useRequest(requestApi, dispatchVod, dataVod)

      return (
            <Fragment>
                  <CSSTransition in={loading} timeout={300} classNames="active" unmountOnExit>
                        <LoaderSpinnerMUI />
                  </CSSTransition>
                  <CSSTransition in={!loading} timeout={300} classNames="active" unmountOnExit>
                        <Switch>
                              <Route exact path={`${url}`} >
                                    <div className="content-catalogue">
                                          {data && !loading &&
                                                data.map((category) => {
                                                      return <List key={category.category} data={category} />
                                                })
                                          }
                                    </div>
                              </Route>
                              <Route exact path={`${url}/:contentType/:contentId`} >
                                    <InfoContent />
                              </Route>
                        </Switch>
                  </CSSTransition>
            </Fragment>
      )
}