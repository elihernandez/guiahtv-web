import React, { useEffect, useContext, Fragment } from 'react'
// import { getLiveTV } from '../../services/getLiveTV'
// import UserContext from '../../context/UserContext'
import { useRequest } from '../../hooks/useRequest'
import { LoaderSpinner } from '../../components/Loader/index'
// import { useCookies } from 'react-cookie';
import './styles.css'

function ChannelsGuide(){
      return (
            <div className="channels-guide">
            </div>
      )
}

export function LiveTV() {
      const {loading, data} = useRequest('livetv')

      return (
            <Fragment>
            {     loading
            ?     <div className="loader-tv">
                        <LoaderSpinner color="blue" />
                  </div>
            :     <Fragment>
                        <div  className="wrapper-livetv">
                              <div className="section-content w-padding-top">
                                    <ChannelsGuide />
                              </div>
                        </div>
                        <div className="video-section">
                        </div>
                  </Fragment>
            }
            </Fragment>
      )
}
