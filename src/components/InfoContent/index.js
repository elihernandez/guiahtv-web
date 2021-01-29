import React, { Fragment } from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import './styles.css'

export function InfoMovie({data}){
      const { url } = useRouteMatch()
      const history = useHistory()
      const { HdBackgroundImageUrl, Title, Description, Categories, Artist, Director, ReleaseDate, Length, Rating, StarRating, ResumePos } = data
      const textButton = ResumePos == "" ? "Ver ahora" : "Reanudar" 

      const handleClick = () => {
            console.log(url)
            history.push(`${url}/video`)
      }

      return (
            <Fragment>
                  <div className="background">
                        <img  src={HdBackgroundImageUrl}/>
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
                                          <img className="img-rating" src="build/assets/images/clasifications-movies/imdb.png" />
                                          <p className="rating">{StarRating}</p>
                                          <p className="rating">|</p>
                                    </Fragment>
                              }
                              {Rating.trim() == "PG-13" &&
                                    <img className="img-clasification" src="build/assets/images/clasifications-movies/PG13.png" />
                              }
                              {Rating.trim() == "PG" &&
                                    <img className="img-clasification" src="build/assets/images/clasifications-movies/PG13.png" />
                              }
                              {Rating.trim() == "G" &&
                                    <img className="img-clasification" src="build/assets/images/clasifications-movies/G.png" />
                              }
                              {Rating.trim() == "R" &&
                                    <img className="img-clasification" src="build/assets/images/clasifications-movies/R.png" />
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
                              </button>
                        </div>
                  </div>
            </Fragment>
      )
}

export function InfoSerie({data}){
      const { HdBackgroundImageUrl, Title, Description, Categories, Artist, Director, ReleaseDate, Length, Rating, StarRating, ResumePos } = data
      const textButton = ResumePos == "" ? "Ver ahora" : "Reanudar" 
      return (
            <Fragment>
                  <div className="background">
                        <img  src={HdBackgroundImageUrl}/>
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
                        <div className="group-actions">
                              <button type="button" className="button-watch">
                                    <i className="fas fa-play" />{textButton}
                              </button>
                        </div>
                  </div>
            </Fragment>
      )
}

