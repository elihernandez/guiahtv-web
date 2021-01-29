import React, { Fragment, useContext } from 'react'
import { LoaderSpinnerMUI } from '../../../../components/Loader'
import { Switch, Route, useRouteMatch } from "react-router-dom"
import { useRequest } from '../../../../hooks/useRequest'
import VodContext from '../../../../context/VodContext'
import { List } from '../../../../components/List'
import { CSSTransition } from 'react-transition-group'
import './styles.css'

export function Catalogue({requestApi}) {
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
                                    <Fragment>
                                          {data && !loading &&
                                                data.map((category) => {
                                                      return <List key={category.category} data={category} listType="catalogue"/>
                                                })
                                          }
                                    </Fragment>
                              </Route>
                              <Route exact path={`${url}/:ContentType`} >
                                    <h1>Hola</h1>
                              </Route>
                        </Switch>
                  </CSSTransition>
            </Fragment>
      )
}
