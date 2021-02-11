import React, { Fragment, useState, useContext } from 'react'
import { NavLink, useRouteMatch, useHistory } from 'react-router-dom'
import VodContext from '../../context/VodContext'
import RadioContext from '../../context/RadioContext'
import AudioContext from '../../context/AudioContext'
import { getProgressMovie } from '../../js/Time'
import { isShortString, limitString, isSerie, typeContent } from '../../js/String'
import Tooltip from '@material-ui/core/Tooltip'
import LinearProgress from '@material-ui/core/LinearProgress'
import './styles.css'

export function Item({ data, posterType, listType }) {
      let Item = () => null
      const history = useHistory()
      const { url } = useRouteMatch()
      const { Registro, ContentType } = data
      const type = typeContent(ContentType)

      // if (listType != "radio") {

      // } else {
      //       const { dispatchRadio } = useContext(RadioContext)
      //       const { dispatchAudio } = useContext(AudioContext)

      //       handleClick = () => {
      //             history.push(`/radio/${Registro}`)
      //             dispatchRadio({ type: 'setCurrentStation', payload: data })
      //             dispatchAudio({ type: 'setData', payload: data })
      //       }
      // }

      switch (listType) {
            case 'catalogue':
                  Item = <ItemCatalogue url={url} type={type} posterType={posterType} data={data} />
                  break
            case 'season':
                  Item = <ItemSeason url={url} posterType={posterType} data={data} />
                  break
            case 'radio':
                  Item = <ItemCard url={url} posterType={posterType} data={data} />
                  break
      }

      return Item

      // return (
      //       <Fragment>
      //             { listType == "catalogue" &&
      //                   <NavLink to={`${url}/${type}/${Registro}`} className="item-link">
      //                         <div className="item" onClick={handleClick}>
      //                               <div className="background-item">
      //                                     {posterType == 0 &&
      //                                           <img onError={handleError} src={HDPosterUrlPortrait} />
      //                                     }
      //                                     {posterType == 1 &&
      //                                           <img onError={handleError} src={HDPosterUrlLandscape} />
      //                                     }
      //                                     {ResumePos &&
      //                                           <div className="progress-bar-content">
      //                                                 <LinearProgress variant="determinate" value={getProgressMovie(ResumePos, Length)} />
      //                                           </div>
      //                                     }
      //                               </div>
      //                         </div>
      //                   </NavLink>
      //             }
      //             { listType == "season" &&
      //                   <NavLink to={`${url}/video`} className="item-link">
      //                         <div className="item" onClick={handleClick}>
      //                               <div className="background-item">
      //                                     {posterType == 0 &&
      //                                           <img onError={handleError} src={HDPosterUrlPortrait} />
      //                                     }
      //                                     {posterType == 1 &&
      //                                           <img onError={handleError} src={HDPosterUrlLandscape} />
      //                                     }
      //                                     {ResumePos &&
      //                                           <div className="progress-bar-content">
      //                                                 <LinearProgress variant="determinate" value={getProgressMovie(ResumePos, Length)} />
      //                                           </div>
      //                                     }
      //                               </div>
      //                               <div className="info-episode">
      //                                     <div className="group-name-episode">
      //                                           <h3 className="name-episode">{Title}</h3>
      //                                     </div>
      //                                     <div className="group-description-episode">
      //                                           <p className="description-episode">{limitString(Description, 100)}</p>
      //                                     </div>
      //                               </div>
      //                         </div>
      //                   </NavLink>
      //             }
      //             { listType == "radio" &&
      //                   <div className="item-link">
      //                         <div className="item" onClick={handleClick}>
      //                               <div className="title-content">
      //                                     <h2 className="title-item">{Title}</h2>
      //                               </div>
      //                               <div className="background-item">
      //                                     {posterType == 0 &&
      //                                           <img onError={handleError} src={HDPosterUrlPortrait} />
      //                                     }
      //                                     {posterType == 1 &&
      //                                           <img onError={handleError} src={HDPosterUrlLandscape} />
      //                                     }
      //                               </div>
      //                               <div className="description-content">
      //                                     <h3 className="description-item">{limitString(Description, 60)}</h3>
      //                               </div>
      //                               <div className="buttons-content">
      //                                     <Tooltip title="Más info" placement="top-start">
      //                                           <span tabIndex="0">
      //                                                 <i className="fas fa-info" tabIndex="0" />
      //                                           </span>
      //                                     </Tooltip>

      //                                     {isShortString(Description) &&
      //                                           <Tooltip title="Leer más" placement="top-start">
      //                                                 <span tabIndex="0">
      //                                                       <i className="fas fa-ellipsis-h" tabIndex="0" />
      //                                                 </span>
      //                                           </Tooltip>
      //                                     }
      //                               </div>
      //                         </div>
      //                   </div>
      //             }
      //       </Fragment>
      // )
}

function ItemCatalogue({ url, type, posterType, data }) {
      const { Registro, ContentType, HDPosterUrlPortrait, HDPosterUrlLandscape, ResumePos, Length } = data
      const { dispatchVod } = useContext(VodContext)

      const handleClick = () => {
            if (isSerie(ContentType)) {
                  dispatchVod({ type: 'setSerie', payload: data })
            } else {
                  dispatchVod({ type: 'setMovie', payload: data })
            }
      }

      return (
            <NavLink to={`${url}/${type}/${Registro}`} className="item-link">
                  <div className="item" onClick={handleClick}>
                        <div className="background-item">
                              <Img posterType={posterType} imgPortrait={HDPosterUrlPortrait} imgLandscape={HDPosterUrlLandscape} />
                              {ResumePos &&
                                    <div className="progress-bar-content">
                                          <LinearProgress variant="determinate" value={getProgressMovie(ResumePos, Length)} />
                                    </div>
                              }
                        </div>
                  </div>
            </NavLink>
      )
}

function ItemSeason({ url, posterType, data }) {
      const { Title, Description, ContentType, HDPosterUrlPortrait, HDPosterUrlLandscape, ResumePos, Length } = data
      const { dispatchVod } = useContext(VodContext)

      const handleClick = () => {
            if (isSerie(ContentType)) {
                  dispatchVod({ type: 'setSerie', payload: data })
            } else {
                  dispatchVod({ type: 'setMovie', payload: data })
            }
      }

      return (
            <NavLink to={`${url}/video`} className="item-link">
                  <div className="item" onClick={handleClick}>
                        <div className="background-item">
                              <Img posterType={posterType} imgPortrait={HDPosterUrlPortrait} imgLandscape={HDPosterUrlLandscape} />
                              <ProgressBar resumePos={ResumePos} length={Length} />
                        </div>
                        <Info title={Title} description={Description} />
                  </div>
            </NavLink>
      )
}

function ItemCard({ url, posterType, data }) {
      const history = useHistory()
      const { Title, Description, Registro, ContentType, HDPosterUrlPortrait, HDPosterUrlLandscape, ResumePos, Length } = data
      const { dispatchRadio } = useContext(RadioContext)
      const { dispatchAudio } = useContext(AudioContext)

      const handleClick = () => {
            history.push(`/radio/${Registro}`)
            dispatchRadio({ type: 'setCurrentStation', payload: data })
            dispatchAudio({ type: 'setData', payload: data })
      }

      return (
            <div className="item-link">
                  <div className="item" onClick={handleClick}>
                        
                  <TitleItem title={Title} />
                        <div className="background-item">
                              <Img title={Title} posterType={posterType} imgPortrait={HDPosterUrlPortrait} imgLandscape={HDPosterUrlLandscape} />
                              {ResumePos &&
                                    <div className="progress-bar-content">
                                          <LinearProgress variant="determinate" value={getProgressMovie(ResumePos, Length)} />
                                    </div>
                              }
                        </div>
                        <DescriptionItem description={Description} />
                        <Buttons description={Description} />
                  </div>
            </div>
      )
}

function TitleItem({title}){
      return (
            <div className="title-content">
                  <h6 className="title-item">{title}</h6>
            </div>
      )
}

function DescriptionItem({description}){
      return (
            <div className="description-content">
                  <h3 className="description-item">{limitString(description, 60)}</h3>
            </div>
      )
}

function Img({ title, posterType, imgPortrait, imgLandscape }) {

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
            e.nativeEvent.target.classList.add("image-recover")
      }

      return (
            <Fragment>
                  {posterType == 0 &&
                        <img alt={`img-${title}`} onError={handleError} src={imgPortrait} />
                  }
                  {posterType == 1 &&
                        <img alt={`img-${title}`} onError={handleError} src={imgLandscape} />
                  }
            </Fragment>
      )
}

function ProgressBar({ resumePos, length }) {

      return (
            <Fragment>
                  {resumePos &&
                        <div className="progress-bar-content">
                              <LinearProgress variant="determinate" value={getProgressMovie(resumePos, length)} />
                        </div>
                  }
            </Fragment>
      )
}

function Info({ title, description }) {
      return (
            <div className="info-item">
                  <div className="group-name-item">
                        <h6 className="name-item">{title}</h6>
                  </div>
                  <div className="group-description-item">
                        <p className="description-item">{limitString(description, 60)}</p>
                  </div>
            </div>
      )
}

function Buttons({description}){
      return (
            <div className="buttons-content">
                  <Tooltip title="Más info" placement="top-start">
                        <span tabIndex="0">
                              <i className="fas fa-info" tabIndex="0" />
                        </span>
                  </Tooltip>

                  {isShortString(description) &&
                        <Tooltip title="Leer más" placement="top-start">
                              <span tabIndex="0">
                                    <i className="fas fa-ellipsis-h" tabIndex="0" />
                              </span>
                        </Tooltip>
                  }
            </div>
      )
}