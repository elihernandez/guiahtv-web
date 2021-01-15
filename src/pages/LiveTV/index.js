import React, { useContext, useState, useRef, useEffect, Fragment } from 'react'
import { useHistory, Switch, Route, useRouteMatch, useParams } from "react-router-dom"
import { useRequest } from '../../hooks/useRequest'
import { LoaderSpinner } from '../../components/Loader/index'
import { Navbar as Links } from '../../components/Navbar/index'
import { LiveTvProvider } from '../../context/LiveTvContext'
import LiveTvContext from '../../context/LiveTvContext'
import { LiveTvChannel, LiveTvEvent } from './Components/Channel/index'
var cssTransition = require('css-transition')
import './styles.css'

function createUrlString(string) {
      let href = string.toLowerCase()
      href = href.replace(/ /g, '')

      return href
}

function Navbar({ data }) {
      let navLinks = []
      let { url } = useRouteMatch()

      data.map(({ category }) => {
            let href = createUrlString(category)
            let links = {
                  title: category,
                  href: `${url}/${href}`,
                  icon: ''
            }
            navLinks.push(links)
      })

      return (
            <Links navLinks={navLinks} classNavbar="navbar-guide-tv" classItems="guide-tv" />
      )
}

function Channels({ data, classActive}) {
      const classes = `content-channels ${classActive}`

      return (
            <div className={classes}>
                  {
                        data.map((channel) => {
                              switch (channel.ContentType) {
                                    case 'leon_livetv_Channel':
                                          return <LiveTvChannel key={channel.Id} dataChannel={channel} />
                                          break
                                    case 'leon_livetv_Event':
                                          return <LiveTvEvent key={channel.Id} dataChannel={channel} />
                                          break
                                    case 'leon_livetv_Radio':
                                          return <LiveTvEvent key={channel.Id} dataChannel={channel} />
                                          break
                              }
                        })
                  }
            </div>
      )
}

function Categories({category, data}) {
      let classActive = ""
      const { categoria } = useParams()
      if (createUrlString(category) == categoria) {
            classActive = "active"
      }
      
      return <Channels data={data} classActive={classActive}/>

}

function ContentCategory({ refer }) {
      let { url } = useRouteMatch()
      const dataContext = useContext(LiveTvContext)

      return (
            <div className="channels-wrapper" ref={refer}>
                  <div className="channels-guide-tv">
                        <Switch>
                              <Route exact path={`${url}/:categoria`} >
                                    {
                                          dataContext.map(({category, cmData}) => {
                                                return <Categories key={category} category={category} data={cmData}/>
                                          })  
                                    }
                              </Route>
                        </Switch>
                  </div>
            </div>
      )
}

function Guide({ data }) {
      let refChannels = useRef(null)
      const [page, setPage] = useState(0)

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

      return (
            <div className="guide">
                  <div className="guide-wrapper">
                        <Navbar data={data} />
                        <ContentCategory refer={refChannels} />
                        <div className="direction-prev" onClick={handleClickLeft}>
                              <i className="fas fa-chevron-left"></i>
                        </div>
                        <div className="direction-next" onClick={handleClickRight}>
                              <i className="fas fa-chevron-right"></i>
                        </div>
                  </div>
            </div>
      )
}

export function LiveTV() {
      const history = useHistory()
      const { loading, data } = useRequest('livetv')
      let { url } = useRouteMatch()
      // console.log(url)
      // history.push(`${url}/eventosenvivo`)
      // if(url == '/tvenvivo'){
      //       // console.log(true)
      //       // console.log(data)
      //       if(data.length){
      //             console.log(data[0])
      //             let href = createUrlString(data[0].category)
      //             console.log(href)
                  
      //       }
      //       // console.log(href)
      //       // let links = {
      //       //       title: category,
      //       //       href: `${url}/${href}`,
      //       //       icon: ''
      //       // }
      //       // navLinks.push(links)
      // }
      // let navLinks = []


      return (
            <Fragment>
                  {     loading
                        ? <div className="loader-tv">
                              <LoaderSpinner color="blue" />
                        </div>
                        : <Fragment>
                              <LiveTvProvider value={data}>
                                    <div className="video-section">
                                    </div>
                                    <div className="wrapper-livetv">
                                          <div className="section-content w-padding-top">
                                                <Guide data={data} />
                                          </div>
                                    </div>
                              </LiveTvProvider>
                        </Fragment>
                  }
            </Fragment>
      )
}