import React from 'react'
import { NavLink, useRouteMatch, useParams } from "react-router-dom"
import { Navbar } from '../../../../components/Navbar/index'
import './styles.css'

function NavbarArtist(){
      const navLinks = [
            {title: 'Vista general', href: '/musica', icon: ''},
            {title: 'A los fanaticos también les gusta', href: '/a', icon: ''},
            {title: 'Acerca de', href: '/b', icon: ''}
      ]

      const classItems = 'navbar-link-artist'
      const classNavbar = 'navbar-artist'

      return (
            <Navbar navLinks={navLinks} classNavbar={classNavbar} classItems={classItems} />
      )
}

function Header(){
      return (
            <div className="header">
                  <div className="background-image">
                        <img src="build/assets/images/backgrounds/wendy_montilla.jpeg" />
                        <div className="opacity-overlay"></div>
                  </div>
                  <div className="info-artist">
                        <h2 className="name-artist">Wendy Montilla</h2>
                        <h3 className="genre-artist">American pop artist</h3>
                  </div>
                  <span className="icons">
                        <div className="play-music">
                              Reproducir
                              <i class="fas fa-play"></i>
                        </div>
                        <div className="like-artist">
                              <i class="fas fa-heart"></i>
                        </div>
                        <div className="share-artist">
                              <i class="fas fa-share-alt"></i>
                        </div>
                  </span>
            </div>
      )
}

function Albums(){
      return (
            <div className="albums-artist">
                  <h2 className="title-section">Álbumes</h2>
                  <ul className="list-albums">
                        <li className="item-album active">
                              <div className="image-album">
                                    <img src="build/assets/images/backgrounds/wendy_montilla2.jpeg" />
                                    <div className="info-album">
                                          <NavLink exact to={`/musica/wendymontilla/vivoparati`}>
                                                <h2 className="title-album">Vivo para ti</h2>
                                          </NavLink>
                                          <h3 className="year-album">2016</h3>
                                    </div>
                              </div>
                        </li>
                        <li className="item-album active">
                              <div className="image-album">
                                    <img src="build/assets/images/backgrounds/wendy_montilla2.jpeg" />
                                    <div className="info-album">
                                          <h2 className="title-album">En ti permanezco</h2>
                                          <h3 className="year-album">2017</h3>
                                    </div>
                              </div>
                        </li>
                        <li className="item-album active">
                              <div className="image-album">
                                    <img src="build/assets/images/backgrounds/wendy_montilla2.jpeg" />
                                    <div className="info-album">
                                          <h2 className="title-album">Tú amor</h2>
                                          <h3 className="year-album">2017</h3>
                                    </div>
                              </div>
                        </li>
                        <li className="item-album active">
                              <div className="image-album">
                                    <img src="build/assets/images/backgrounds/wendy_montilla2.jpeg" />
                                    <div className="info-album">
                                          <h2 className="title-album">Nadie como tú</h2>
                                          <h3 className="year-album">2018</h3>
                                    </div>
                              </div>
                        </li>
                        <li className="item-album active">
                              <div className="image-album">
                                    <img src="build/assets/images/backgrounds/wendy_montilla2.jpeg" />
                                    <div className="info-album">
                                          <h2 className="title-album">En ti confio</h2>
                                          <h3 className="year-album">2019</h3>
                                    </div>
                              </div>
                        </li>
                        <li className="item-album active">
                              <div className="image-album">
                                    <img src="build/assets/images/backgrounds/wendy_montilla2.jpeg" />
                                    <div className="info-album">
                                          <h2 className="title-album">Libertad</h2>
                                          <h3 className="year-album">2020</h3>
                                    </div>
                              </div>
                        </li>
                  </ul>
            </div>
      )
}

function PopularSongs(){
      let { url } = useRouteMatch()

      return (
            <div className="popular-songs">
                  <h2 className="title-section">Canciones populares</h2>
                  <ul className="list-songs">
                        <li className="item-song active">
                              <div className="image-song">
                                    <img src="build/assets/images/backgrounds/wendy_montilla2.jpeg" />
                              </div>
                              <div className="info-song">
                                    <h3 className="name-song">Solo para ti</h3>
                                    <h3 className="name-artist">Wendy Montilla</h3>
                              </div>
                              <div className="time-song">
                                    3:50
                              </div>
                              <div className="extras">
                                    <i class="fas fa-plus"></i>
                              </div>
                        </li>
                        <li className="item-song">
                              <div className="image-song">
                                    <img src="build/assets/images/backgrounds/wendy_montilla2.jpeg" />
                              </div>
                              <div className="info-song">
                                    <h3 className="name-song">Libertad</h3>
                                    <h3 className="name-artist">Wendy Montilla</h3>
                              </div>
                              <div className="time-song">
                                    3:15
                              </div>
                              <div className="extras">
                                    <i class="fas fa-plus"></i>
                              </div>
                        </li>
                        <li className="item-song">
                              <div className="image-song">
                                    <img src="build/assets/images/backgrounds/wendy_montilla2.jpeg" />
                              </div>
                              <div className="info-song">
                                    <h3 className="name-song">Vivo para ti</h3>
                                    <h3 className="name-artist">Wendy Montilla</h3>
                              </div>
                              <div className="time-song">
                                    2:45
                              </div>
                              <div className="extras">
                                    <i class="fas fa-plus"></i>
                              </div>
                        </li>
                        <li className="item-song">
                              <div className="image-song">
                                    <img src="build/assets/images/backgrounds/wendy_montilla2.jpeg" />
                              </div>
                              <div className="info-song">
                                    <h3 className="name-song">Tú amor</h3>
                                    <h3 className="name-artist">Wendy Montilla</h3>
                              </div>
                              <div className="time-song">
                                    3:25
                              </div>
                              <div className="extras">
                                    <i class="fas fa-plus"></i>
                              </div>
                        </li>
                        <li className="item-song">
                              <div className="image-song">
                                    <img src="build/assets/images/backgrounds/wendy_montilla2.jpeg" />
                              </div>
                              <div className="info-song">
                                    <h3 className="name-song">Todo lo puedo en ti</h3>
                                    <h3 className="name-artist">Wendy Montilla</h3>
                              </div>
                              <div className="time-song">
                                    4:30
                              </div>
                              <div className="extras">
                                    <i class="fas fa-plus"></i>
                              </div>
                        </li>
                        <li className="item-song">
                              <NavLink exact to={`${url}/canciones`}>
                                    Mostrar todas las canciones
                              </NavLink>
                        </li>
                  </ul>
            </div>
      )
}

export function Artist() {
      // let { artista } = useParams()
      // let { url } = useRouteMatch()

      return (
            <div className="content-section">
                  <Header />
                  <NavbarArtist/>
                  <div className="content-artist">
                        <PopularSongs />
                        <Albums />
                  </div>
            </div>
      )
}