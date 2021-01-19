import React, { Fragment, useState, useEffect, useRef } from 'react'
import { useParams } from "react-router-dom"
import { LiveTvChannel, LiveTvEvent } from '../Channel'
import { Switch, Route, useRouteMatch } from "react-router-dom"
import { createUrlString } from '../../../../js/String'
import { Channel } from '../Channel'
import { CSSTransition } from 'react-transition-group'
import './styles.css'

function ContentChannels({ data }) {

      return (
            <div className="content-channels" >

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
      // const [show, setShow] = useState(false)
      useEffect(() => {
            data.map((category) => {
                  if (createUrlString(category.category) == categoria) {
                        setChannels(category)
                  }
            })

      }, [categoria])
      
      if (!categoria) {
            return (
                  <div className="channels">
                        <div className="channels-wrapper">
                              <ContentChannels data={data[0]} />
                              <div className="direction-prev">
                                    <i className="fas fa-chevron-left"></i>
                              </div>
                              <div className="direction-next">
                                    <i className="fas fa-chevron-right"></i>
                              </div>
                        </div>
                  </div>
            )
      }

      return (
            <Fragment>
            {     channels
            ?     <div className="channels">
                        <div className="channels-wrapper">
                              <ContentChannels data={channels} />
                              <div className="direction-prev">
                                    <i className="fas fa-chevron-left"></i>
                              </div>
                              <div className="direction-next">
                                    <i className="fas fa-chevron-right"></i>
                              </div>
                        </div>
                  </div>
            :     null
            }
            </Fragment>    
      )
}

// export function Channels({ data }) {
//       let { url } = useRouteMatch()
//       const history = useHistory()
//       let { pathname } = useLocation()
//       console.log(data)
//       const { setVideoData } = useContext(VideoContext)
//       const refChannels = useRef()

//       useEffect(() => {
//             if (pathname == '/tvenvivo') {
//                   let category = createUrlString(data[0].category)
//                   history.push(`/tvenvivo/${category}`)
//                   setVideoData(data[0].cmData[0])
//             }
//       }, [])

//       const handleClickLeft = () => {
//             cssTransition(refChannels.current, {
//                   transform: 'translate3d(0%, 0, 0)'
//             }, 300, function () {
//             })
//       }

//       const handleClickRight = () => {
//             cssTransition(refChannels.current, {
//                   transform: 'translate3d(-100%, 0, 0)'
//             }, 300, function () {
//             })
//       }

//       return (
//             <div className="channels-wrapper">
//                   {
//                         data
//                               ? <div className="channels-guide-tv">
//                                     <Switch>
//                                           <Route path={`${url}/:categoria`} >
//                                                 {
//                                                       data.map(({ category, cmData }) => {
//                                                             return <Category key={category} category={category} data={cmData} />
//                                                       })
//                                                 }
//                                           </Route>
//                                     </Switch>
//                                     <div className="direction-prev">
//                                           <i className="fas fa-chevron-left" onClick={handleClickLeft}></i>
//                                     </div>
//                                     <div className="direction-next">
//                                           <i className="fas fa-chevron-right" onClick={handleClickRight}></i>
//                                     </div>
//                               </div>
//                               : <GuideLoader />
//                   }
//             </div>
//       )
// }