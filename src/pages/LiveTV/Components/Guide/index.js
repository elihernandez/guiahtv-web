import React , { useRef, useContext, useEffect } from 'react'
import LiveTvContext from '../../../../context/LiveTvContext'
var cssTransition = require('css-transition')
import { useRequest } from '../../../../hooks/useRequest'
import { Categories } from '../Categories/index'
import { Navbar } from '../Navbar/index'
import './styles.css'
import GuideLoader from '../ContentLoader/Guide'


export function Guide() {
      const { data } = useRequest('livetv')
      const { setData } = useContext(LiveTvContext)
      let refChannels = useRef(null)

      const handleClickLeft = () => {
            cssTransition(refChannels.current, {
                  transform: 'translate3d(0%, 0, 0)'
            }, 300, function () {
            })
      }

      const handleClickRight = () => {
            cssTransition(refChannels.current, {
                  transform: 'translate3d(-100%, 0, 0)'
            }, 300, function () {
            })
      }

      useEffect(() => {
            setData(data)
      }, [data])

      return (
            <div className="guide">
                  {     data
                  ?     <div className="guide-wrapper">
                              <Navbar data={data} />
                              <Categories refer={refChannels} />
                              <div className="direction-prev" onClick={handleClickLeft}>
                                    <i className="fas fa-chevron-left"></i>
                              </div>
                              <div className="direction-next" onClick={handleClickRight}>
                                    <i className="fas fa-chevron-right"></i>
                              </div>
                        </div>
                  :     <GuideLoader />
                  }
            </div>
      )
}