import React, { Fragment, useState, useEffect, useRef } from 'react'
import { useParams } from "react-router-dom"
import { LiveTvChannel, LiveTvEvent } from '../Channel'
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom"
import { createUrlString } from '../../../../js/String'
import { Channel } from '../Channel'
import { CSSTransition } from 'react-transition-group'
var cssTransition = require('css-transition')
import './styles.css'

function ContentChannels({ data}) {

      return (
            <div className="content-channels">

                  {
                        data.cmData.map((channel) => {
                              return <Channel key={channel.Id} data={channel} category={data} />
                        })
                  }
                 
            </div>
      )
}

export function Channels({ data }) {
      let { categoria } = useParams()
      const [channels, setChannels] = useState(null)
      const [page, setPage] = useState(0)
      const [totalPages, setTotalPages] = useState(0)
      const refChannels = useRef()

      const handleClickLeft = () => {
            let moveP = 100 * (page - 1)
            cssTransition(refChannels.current, {
                  transform: `translate3d(-${moveP}%, 0, 0)`
            }, 500, function () {
                  setPage(page - 1)
            })
      }

      const handleClickRight = () => {
            let moveP = 100 * (page + 1)
            cssTransition(refChannels.current, {
                  transform: `translate3d(-${moveP}%, 0, 0)`
            }, 500, function () {
                  setPage(page + 1)
            })
      }

      const resetTransition = () => {
            cssTransition(refChannels.current, {
                  transform: `translate3d(0%, 0, 0)`
            }, 0, function () {
                  
            })
      }

      const countPages = (category) => {
            let length = category.cmData.length
            let pages = length / 5
            if(pages > 1){
                  pages = Math.trunc(pages)
                  setTotalPages(totalPages + 1)
            }
      }

      useEffect(() => {
            setTotalPages(0)
            setPage(0)
            resetTransition()

            if(!categoria){
                  console.log("Hola")
                  setChannels(data[0])
                  countPages(data[0])
            }else{
                  data.map((category) => {
                        if (createUrlString(category.category) == categoria) {
                              setChannels(category)
                              countPages(category)
                        }
                  })
            }

      }, [categoria])

      return (
           <div className="channels">
                  <div className="channels-wrapper" ref={refChannels}>
                        {     channels &&
                              <ContentChannels data={channels}  />
                        }
                  </div>
                  {
                        totalPages > 0 && page > 0 &&
                        <div className="direction-prev" onClick={handleClickLeft}>
                              <i className="fas fa-chevron-left"></i>
                        </div>
                  }
                  {
                        totalPages > 0 && page < totalPages &&
                        <div className="direction-next" onClick={handleClickRight}>
                              <i className="fas fa-chevron-right"></i>
                        </div>
                  }
            </div>
      )
}