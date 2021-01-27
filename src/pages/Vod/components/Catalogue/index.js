import React, { Fragment, useContext } from 'react'
import { LoaderSpinnerMUI } from '../../../../components/Loader'
import { useRequest } from '../../../../hooks/useRequest'
import VodContext from '../../../../context/VodContext'
import { List } from '../../../../components/List'
import { CSSTransition } from 'react-transition-group'
import './styles.css'

export function Catalogue() {
      const { stateVod, dispatchVod } = useContext(VodContext)
      const { dataVod } = stateVod 
      const { loading, data } = useRequest('vod', dispatchVod, dataVod)

      return (
            <Fragment>
                  <CSSTransition in={loading} timeout={300} classNames="active" unmountOnExit>
                        <LoaderSpinnerMUI />
                  </CSSTransition>
                  <CSSTransition in={!loading} timeout={300} classNames="active" unmountOnExit>
                        <Fragment>
                              {data && !loading &&
                                    data.map((category) => {
                                          return <List key={category.category} data={category} />
                                    })
                              }
                        </Fragment>
                  </CSSTransition>
            </Fragment>
      )
}
