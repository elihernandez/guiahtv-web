import React, { useState, useEffect, useContext, useRef, useCallback } from 'react'
import { useParams, useHistory } from "react-router-dom"
import { createUrlString } from '../../../../js/String'
import LiveTvContext from '../../../../context/LiveTvContext'
import VideoContext from '../../../../context/VideoContext'
import { Channel } from '../Channel'
var cssTransition = require('css-transition')
import './styles.css'

export function Channels({ data }) {
      let { categoria, canal } = useParams()
      const { state, dispatchTV } = useContext(LiveTvContext)
      const { dispatch } = useContext(VideoContext)
      const { currentPage, currentCategory } = state
      const [channels, setChannels] = useState(null)
      const [page, setPage] = useState(0)
      const [totalPages, setTotalPages] = useState(0)
      const refChannels = useRef()
      const history = useHistory()

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
                  setTotalPages(pages)
            }
      }

      // const saveData = useCallback(() => {

      // }, )

      useEffect(() => {
            if(currentCategory){
                  if(categoria == currentCategory){
                        let moveP = 100 * (currentPage)
                        cssTransition(refChannels.current, {
                              transform: `translate3d(-${moveP}%, 0, 0)`
                        }, 0, function () {
                              setPage(currentPage)
                              data.map((category) => {
                                    if (createUrlString(category.category) == currentCategory) {
                                          setTotalPages(0)
                                          setChannels(category)
                                          countPages(category)
                                    }
                              })
                        })
                  }else{
                             
                        if(channels){
                              resetTransition()
                              data.map((category) => {
                                    if (createUrlString(category.category) == categoria) {
                                          setPage(0)
                                          setTotalPages(0)
                                          setChannels(category)
                                          countPages(category)
                                    }
                              })
                        }else{
                              history.push(currentCategory)
                              let moveP = 100 * (currentPage)
                              cssTransition(refChannels.current, {
                                    transform: `translate3d(-${moveP}%, 0, 0)`
                              }, 0, function () {
                                    setPage(currentPage)
                                    data.map((category) => {
                                          if (createUrlString(category.category) == currentCategory) {
                                                setTotalPages(0)
                                                setChannels(category)
                                                countPages(category)
                                          }
                                    })
                              })
                        }
                  }
            }else{
                  if(!categoria){
                        setChannels(data[0])
                        countPages(data[0])
                        dispatch({ type: 'updateData', payload: data[0].cmData[0] })
                        dispatchTV({ type: 'updatePage', payload: page })
                        dispatchTV({ type: 'updateCategory', payload: createUrlString(data[0].category) })
                        history.push('/tvenvivo/'+createUrlString(data[0].category)+'/'+createUrlString(data[0].cmData[0].Name))
                  }else{
                        console.log(canal)
                        if(!canal){
                              data.map((category) => {
                                    if (createUrlString(category.category) == categoria) {
                                          setChannels(category)
                                          setTotalPages(0)
                                          countPages(category)
                                          dispatch({ type: 'updateData', payload: category.cmData[0] })
                                          dispatchTV({ type: 'updatePage', payload: page })
                                          dispatchTV({ type: 'updateCategory', payload: categoria })
                                          history.push('/tvenvivo/'+categoria+'/'+createUrlString(category.cmData[0].Name))
                                    }
                              })
                        }else{
                              data.map((category) => {
                                    if (createUrlString(category.category) == categoria) {
                                          category.cmData.map((channel) => {
                                                if(createUrlString(channel.Name) == canal){
                                                      dispatch({ type: 'updateData', payload: channel })
                                                      dispatchTV({ type: 'updatePage', payload: page })
                                                      dispatchTV({ type: 'updateCategory', payload: categoria })
                                                      // history.push('/tvenvivo/'+categoria+'/'+canal)
                                                }
                                          })
                                          setChannels(category)
                                          setTotalPages(0)
                                          countPages(category)
                                    }
                              })
                        }
                  }

                  resetTransition()
                  setPage(0)
            }
      }, [categoria])

      return (
            <div className="channels">
                  <div className="channels-wrapper" ref={refChannels}>
                        {     channels &&
                              <div className="content-channels">
                                    {
                                          channels.cmData.map((channel) => {
                                                return <Channel key={channel.Id} data={channel} category={channels} page={page} categoria={categoria}/>
                                          })
                                    }
                              </div>
                        }
                  </div>
                  {
                        totalPages > 0 && page > 0 &&
                        <div className="direction-prev" onClick={handleClickLeft}>
                              <i className="fas fa-chevron-left"></i>
                        </div>
                  }
                  {
                        (totalPages > 0) && (page < totalPages) &&
                        <div className="direction-next" onClick={handleClickRight}>
                              <i className="fas fa-chevron-right"></i>
                        </div>
                  }
            </div>
      )
}