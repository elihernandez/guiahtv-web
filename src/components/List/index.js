import React, { useState, useEffect, useContext, useRef } from 'react'
import { useHistory, NavLink, useRouteMatch } from 'react-router-dom'
import VodContext from '../../context/VodContext'
const cssTransition = require('css-transition')
import './styles.css'

function isSerie(contentType) {
      if (contentType.includes('series')) {
            return true
      }

      return false
}

function typeContent(contentType){
      if(contentType.includes('series')){
            return 'serie'
      }else{
            return 'pelicula'
      }
}

function ListItem({ data, posterType }) {
      const { url } = useRouteMatch()
      const { dispatchVod } = useContext(VodContext)
      const { Registro, HDPosterUrlPortrait, HDPosterUrlLandscape, ContentType } = data
      const type = typeContent(ContentType)

      const handleClick = () => {
            console.log(isSerie(ContentType))
            if (isSerie(ContentType)) {
                  dispatchVod({ type: 'setSerie', payload: data })
            }else{
                  dispatchVod({ type: 'setMovie', payload: data })
            }
      }

      const handleError = (e) => {
            let srcImg = ''
            switch (posterType) {
                  case '0':
                        srcImg = 'build/assets/images/logos/guiahtv/vod-error-portrait.png'
                        break
                  case '1':
                        srcImg = 'build/assets/images/logos/guiahtv/GuiahAzulPerf.png'
                        break
                  default:
                        srcImg = 'build/assets/images/logos/guiahtv/GuiahAzulPerf.png'
                        break
            }
            e.nativeEvent.target.src = srcImg
      }

      return (
            <NavLink to={`${url}/${type}/${Registro}`} className="item-link">
                  <div className="item" onClick={handleClick}>
                        {posterType == 0 &&
                              <img onError={handleError} src={HDPosterUrlPortrait} />
                        }
                        {posterType == 1 &&
                              <img onError={handleError} src={HDPosterUrlLandscape} />
                        }
                  </div>
            </NavLink>
      )
}

export function List({ data }) {
      let pages = 0
      const [page, setPage] = useState(1)
      const [totalPages, setTotalPages] = useState(0)
      const { category, poster_type, cmData } = data
      const classes = poster_type == 0 ? "list portrait" : "list landscape"
      const refList = useRef()

      const handleClickPrev = () => {
            let moveP = 100 * (page - 2)
            cssTransition(refList.current, {
                  transform: `translate3d(-${moveP}%, 0, 0)`
            }, 500, function () {
                  setPage(page - 1)
            })
      }

      const handleClickRight = () => {
            let moveP = 100 * (page)
            cssTransition(refList.current, {
                  transform: `translate3d(-${moveP}%, 0, 0)`
            }, 500, function () {
                  setPage(page + 1)
            })
      }

      useEffect(() => {
            if (poster_type == 0) {
                  pages = cmData.length / 7
            } else {
                  pages = cmData.length / 5
            }

            if (pages % 1 != 0) {
                  pages = Math.ceil(pages)
            }

            if (pages > 1) {
                  setTotalPages(pages)
            }
      }, [])

      return (
            <div className={classes}>
                  <h3 className="title-list">{category}</h3>
                  <div className="list-content">
                        <div className="list-items" ref={refList}>
                              {
                                    cmData.map((data) => {
                                          return <ListItem key={data.Registro} data={data} posterType={poster_type} />
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
            </div>
      )

}