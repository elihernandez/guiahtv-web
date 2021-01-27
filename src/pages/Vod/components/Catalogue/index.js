import React, { Fragment, useEffect, useContext } from 'react'
import { LoaderSpinner } from '../../../../components/Loader'
import { useRequest } from '../../../../hooks/useRequest'
import VodContext from '../../../../context/VodContext'
import { List } from '../../../../components/List'
import { CSSTransition } from 'react-transition-group'

export function Catalogue() {
      const { stateVod, dispatchVod } = useContext(VodContext)
      const { dataVod } = stateVod 
      const { loading, data } = useRequest('vod', dispatchVod, dataVod)

      useEffect(() =>{

      }, [dataVod])

      return (
            <Fragment>
                  <CSSTransition in={loading} timeout={100} classNames="active" unmountOnExit>
                        <LoaderSpinner color="blue" />
                  </CSSTransition>
                  <CSSTransition in={!loading} timeout={100} classNames="active" unmountOnExit>
                        <Fragment>
                              {data &&
                                    data.map((category) => {
                                          // console.log(category)
                                          return <List key={category.category} data={category} />
                                    })
                              }
                        </Fragment>
                  </CSSTransition>
            </Fragment>
      )
}
