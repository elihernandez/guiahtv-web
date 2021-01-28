import React, { Fragment, useState, useEffect, useContext } from 'react'
import { LoaderSpinnerMUI } from '../Loader'
import { getSeasons } from '../../services/getSeasons' 
import { useParams } from 'react-router-dom'
import VodContext from '../../context/VodContext'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'
import './styles.css'

function searchContent(data, contentId){
     
      let content
      data.map(({cmData}) => {
            cmData.map((movie) =>{
                  if(movie.Registro == contentId){
                        content = movie
                  }
            })
      })

      return content
}

function InfoMovie({data}){
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
                              <button type="button" className="button-watch">
                                    <i className="fas fa-play" />{textButton}
                              </button>
                        </div>
                  </div>
            </Fragment>
      )
}

function InfoSerie({data}){
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

function ContentMovie({data}){
      return <InfoMovie data={data}/>
}

function TabPanel(props) {
      const { children, value, index, ...other } = props
    
      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`full-width-tabpanel-${index}`}
          aria-labelledby={`full-width-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box p={3}>
                  {children}
            </Box>
          )}
        </div>
      )
}

TabPanel.propTypes = {
      children: PropTypes.node,
      index: PropTypes.any.isRequired,
      value: PropTypes.any.isRequired,
}
    
function a11yProps(index) {
      return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
      }
}

function FullWidthTabs({serieId}) {
      const [value, setValue] = useState(0)
      const [seasons, setSeasons] = useState(null)
    
      const handleChange = (event, newValue) => {
        setValue(newValue)
      }
    
      const handleChangeIndex = (index) => {
        setValue(index)
      }

      const [anchorEl, setAnchorEl] = React.useState(null)
      const open = Boolean(anchorEl)

      const handleClick = (event) => {
            setAnchorEl(event.currentTarget)
      }

      const handleClose = () => {
            setAnchorEl(null)
      }

      useEffect(() => {
            const requestData = async () => {
                  try{
                        const response = await getSeasons(serieId)
                        setSeasons(response)
                  }catch(e){

                  }
            }

            requestData()
      }, [])
    
      return (
            <Fragment>
                  {seasons &&
                        <div className="tabs-info-wrapper">
                              <AppBar position="static" color="default">
                                    <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="fullWidth"
                                    aria-label="full width tabs info"
                                    >
                                          <Tab label="Episodios" {...a11yProps(0)} />
                                          <Tab label="Sugerencias" {...a11yProps(1)} />
                                          <Tab label="Detalles" {...a11yProps(2)} />
                                    </Tabs>
                              </AppBar>
                              <TabPanel value={value} index={0}>
                                    <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
                                          Temporadas <i className="fas fa-caret-down"></i>
                                    </Button>
                                    <Menu
                                          id="fade-menu"
                                          anchorEl={anchorEl}
                                          keepMounted
                                          open={open}
                                          onClose={handleClose}
                                          TransitionComponent={Fade}
                                    >
                                          {
                                                seasons.map(({Title, TitleSeason}) =>{
                                                      return <MenuItem key={Title} onClick={handleClose}>{Title}</MenuItem>
                                                })
                                          }
                                    </Menu>
                              </TabPanel>
                              <TabPanel value={value} index={1}>
                                    Item Two
                              </TabPanel>
                              <TabPanel value={value} index={2}>
                                    Item Three
                              </TabPanel>
                        </div>
                  }
            </Fragment>
      )
}

function ContentSerie({data}){
      console.log(data)
      const { ContentTypeOrder } = data
      return (
            <Fragment>
                  <InfoSerie data={data}/>
                  <FullWidthTabs serieId={ContentTypeOrder} />
            </Fragment>
      )
}

export function InfoContent(){
      const { contentId, contentType } = useParams()
      const { stateVod, dispatchVod } = useContext(VodContext)
      const { dataVod, movieVod, seasonVod, serieVod } = stateVod
      const [loading, setLoading] = useState(true)
      const [content, setContent] = useState('')

      useEffect(() => {
            if(dataVod){      
                  switch(contentType){
                        case 'pelicula':
                              if(movieVod){
                                    setLoading(false)
                                    setContent('movie')
                              }else{
                                    console.log('hola')
                                    // searchContent(dataVod, contentId, setLoading) 
                                    dispatchVod({ type: 'setMovie', payload: searchContent(dataVod, contentId) })
                                    setLoading(false)
                                    setContent('movie')
                              }
                        break
                        case 'serie':
                              if(serieVod){
                                    setLoading(false)
                                    setContent('serie')
                              }else{
                                    console.log("No hay data")
                              }
                        break
                  }
            }
      }, [dataVod])

      if(loading){
            return <LoaderSpinnerMUI />
      }

      return (
            <Fragment>
                  {content == "movie" && movieVod &&
                        <CSSTransition in={!loading} timeout={300} classNames="active" unmountOnExit>
                              <div className="movie-info-wrapper">
                                    <ContentMovie data={movieVod} />
                              </div>
                        </CSSTransition>
                  }
                  {content == "serie" && serieVod &&
                        <CSSTransition in={!loading} timeout={300} classNames="active" unmountOnExit>
                              <div className="movie-info-wrapper">
                                    <ContentSerie data={serieVod} />
                              </div>
                        </CSSTransition>
                  }
            </Fragment>
      )
}