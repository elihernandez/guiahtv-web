import React, { useState, useEffect } from 'react'
import { List } from '../../../../components/List'
import { CSSTransition } from 'react-transition-group'
import './styles.css'

export function Catalogue({ data }) {
      const [show, setShow] = useState(false)

      useEffect(() => {
            setShow(true)
      }, [])

      return (
            <CSSTransition in={show} timeout={100} classNames="fade" unmountOnExit>
                  <div className="content-catalogue alacarta">
                        {
                              data.map((category) => {
                                    return <List key={category.category} data={category} listType="catalogue" />
                              })
                        }
                  </div>
            </CSSTransition>
      )
}

// {!loading && data &&
//       data.map((category) => {
//             return <List key={category.category} data={category} listType="catalogue" />
//       })
// }