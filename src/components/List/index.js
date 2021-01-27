import React, { Fragment, useState, useEffect, useRef } from 'react'
import { LazyImage } from "react-lazy-images"
import LazyLoad from 'react-lazyload'
const cssTransition = require('css-transition')
import './styles.css'

export function List({ data }) {
      let pages = 0
      const [page, setPage] = useState(1)
      const [totalPages, setTotalPages] = useState(0)
      const { category, poster_type, cmData } = data
      const classes = poster_type == 0 ? "list portrait" : "list landscape"
      const refList = useRef()

      const handleClickPrev = () =>{
            let moveP = 100 * (page - 2)
            cssTransition(refList.current, {
                  transform: `translate3d(-${moveP}%, 0, 0)`
            }, 500, function () {
                  setPage(page - 1)
            })
      }
      const handleClickRight = () =>{
            let moveP = 100 * (page)
            cssTransition(refList.current, {
                  transform: `translate3d(-${moveP}%, 0, 0)`
            }, 500, function () {
                  setPage(page + 1)
            })
      }

      useEffect(() => {
            if(poster_type == 0){
                 pages = cmData.length / 7
            }else{
                 pages = cmData.length / 5
            }

            if (pages % 1 == 0) {
            } else {
                  pages = Math.ceil(pages)
            }
         
            if(pages > 1){
                  setTotalPages(pages)
            }
      }, [])
     
      return (
            <div className={classes}>
                  <h3 className="title-list">{category}</h3>
                  <div className="list-items" ref={refList}>
                        {
                              cmData.map(({ Registro, HDPosterUrlPortrait, HDPosterUrlLandscape }) => {
                                    return (

                                          <div key={Registro} className="item">
                                                {poster_type == 0 &&
                                                      <img src={HDPosterUrlPortrait} /> 
                                                }
                                                {poster_type == 1 &&
                                                      <img src={HDPosterUrlLandscape} />
                                                }
                                          </div>
                                    )
                              })
                        }
                  </div>
                  {
                        totalPages > 1 && page > 1 &&
                        <div className="direction direction-prev" onClick={handleClickPrev}>
                              <i className="fas fa-chevron-left" />
                        </div>
                  }
                  {
                        (totalPages > 1) && (page < totalPages) &&
                        <div className="direction direction-next" onClick={handleClickRight}>
                              <i className="fas fa-chevron-right" />
                        </div>
                  }
            </div>
      )

}