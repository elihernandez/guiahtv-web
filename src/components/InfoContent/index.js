import React, { Fragment } from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import LinearProgress from '@material-ui/core/LinearProgress'
import { getProgressMovie } from '../../js/Time'
import { imgSourceSetJpg } from '../../js/Image'
import Imdb from '../../assets/images/clasifications-movies/imdb.png'
import PG13 from '../../assets/images/clasifications-movies/PG13.png'
import PG from '../../assets/images/clasifications-movies/PG.png'
import G from '../../assets/images/clasifications-movies/G.png'
import R from '../../assets/images/clasifications-movies/R.png'
// import { LazyLoadImage } from 'react-lazy-load-image-component'
import { LazyImage } from '../Image'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import './styles.css'

export function InfoMovie({ data }) {
      const { url } = useRouteMatch()
      const history = useHistory()
      const { HdBackgroundImageUrl, Title, Description, Categories, Artist, Director, ReleaseDate, Length, Rating, StarRating, ResumePos } = data
      const textButton = ResumePos == "" ? "Ver ahora" : "Reanudar"

      const handleClick = () => {
            history.push(`${url}/video`)
      }

      return (
            <Fragment>
                  <div className="background">
                        <ImgBackground title={Title} img={HdBackgroundImageUrl} type="movie" />
                        <div className="overlay bottom s-50" />
                        <div className="overlay bottom s-40" />
                        <div className="overlay bottom s-30" />
                        <div className="overlay bottom s-20" />
                        <div className="overlay left s-80" />
                        <div className="overlay left s-70" />
                        <div className="overlay left s-60" />
                        <div className="overlay left s-50" />
                        <div className="overlay left s-40" />
                        <div className="overlay left s-30" />
                        <div className="overlay left s-20" />
                  </div>
                  <div className="info-movie">
                        <div className="group-title">
                              <h2 className="title">{Title}</h2>
                        </div>
                        <div className="group info">
                              {StarRating &&
                                    <Fragment>
                                          <img className="img-rating" src={Imdb} />
                                          <p className="rating">{StarRating}</p>
                                          <p className="rating">|</p>
                                    </Fragment>
                              }
                              {Rating.trim() == "PG-13" &&
                                    <img className="img-clasification" src={PG13} />
                              }
                              {Rating.trim() == "PG" &&
                                    <img className="img-clasification" src={PG} />
                              }
                              {Rating.trim() == "G" &&
                                    <img className="img-clasification" src={G} />
                              }
                              {Rating.trim() == "R" &&
                                    <img className="img-clasification" src={R} />
                              }
                              {ReleaseDate &&
                                    <p className="release-date">{ReleaseDate}</p>
                              }
                              {Length &&
                                    <p className="duration">{Length}</p>
                              }
                              {Categories &&
                                    <p className="genre">{Categories}</p>
                              }
                        </div>
                        {Description &&
                              <div className="group-description">
                                    <p className="description">{Description}</p>
                              </div>
                        }
                        {Artist &&
                              <div className="group-artist">
                                    <span className="group">
                                          <p className="text-group">Actores:</p>
                                          <p className="artist">{Artist}</p>
                                    </span>
                              </div>
                        }
                        {Director &&
                              <div className="group-director">
                                    <span className="group">
                                          <p className="text-group">Director:</p>
                                          <p className="director">{Director}</p>
                                    </span>
                              </div>
                        }
                        <div className="group-actions">
                              <button type="button" className="button-watch" onClick={handleClick}>
                                    <i className="fas fa-play" />{textButton}
                                    <div className="progress-bar-content">
                                          <LinearProgress variant="determinate" value={getProgressMovie(ResumePos, Length)} />
                                    </div>
                              </button>
                        </div>
                  </div>
            </Fragment>
      )
}

export function InfoSerie({ data }) {
      const { HdBackgroundImageUrl, Title, Description, Categories } = data
      return (
            <Fragment>
                  <div className="background">
                        <ImgBackground title={Title} img={HdBackgroundImageUrl} type="serie" />
                        <div className="overlay bottom s-50" />
                        <div className="overlay bottom s-40" />
                        <div className="overlay bottom s-30" />
                        <div className="overlay bottom s-20" />
                        <div className="overlay left s-80" />
                        <div className="overlay left s-70" />
                        <div className="overlay left s-60" />
                        <div className="overlay left s-50" />
                        <div className="overlay left s-40" />
                        <div className="overlay left s-30" />
                        <div className="overlay left s-20" />
                  </div>
                  <div className="info-movie">
                        <div className="group-title">
                              <h2 className="title">{Title}</h2>
                        </div>
                        <div className="group info">
                              {Categories &&
                                    <p className="genre">{Categories}</p>
                              }
                        </div>
                        {Description &&
                              <div className="group-description">
                                    <p className="description">{Description}</p>
                              </div>
                        }
                  </div>
            </Fragment>
      )
}

function ImgBackground({ title, img, type }) {
      const alt = `background-${title}`

      return (
            <Fragment>
                  {type == "movie" &&
                        <LazyImage img={img} alt={alt} type="webp" recoverType="jpg" />
                  }
                  {type == "serie" &&
                        
                        <LazyImage img={img} alt={alt} type="webp" recoverType="jpg" />
                  }
            </Fragment>

      )
}
// <picture>
//       <source srcSet={img} type="image/png" />
//       <source srcSet={imgSourceSetJpg(img, 'png')} type="image/jpeg" />
//       <LazyImage img={img} alt={alt} />
// </picture>
// <picture>
//       <source srcSet={img} type="image/webp" />
//       <source srcSet={imgSourceSetJpg(img, 'webp')} type="image/jpeg" />
//       <MyImage />
// </picture>
// <img style={{opacity: show ? "1" : "0"}} onLoad={onLoad} ref={imgRef} src="build/assets/images/logos/guiahtv/error-tv-landscape.png" alt={`background-${title}`} />
