import React, { Fragment, useState } from 'react'
import { useRequest } from '../../hooks/useRequest'
import { Switch, Route, NavLink, useRouteMatch, useParams } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import './styles.css'
import './artist.css'

function CheckAuth({ children }) {
      const cookies = useAuth();
      return (
            <Fragment>
                  {cookies.memclid ? children : <Redirect to='/login' />}
            </Fragment>
      )
}

function Extras() {
      return (
            <div className="adds">
                  <ul>
                        <li>
                              <i className="far fa-heart"></i>
                        </li>
                        <li>
                              <i className="fas fa-bars"></i>
                        </li>
                  </ul>
            </div>
      )
}

function VolumeMusic() {
      return (
            <div className="volume-music-content">
                  <i className="fas fa-volume-up"></i>
                  <div className="wrapper-volume-music">
                        <div className="volume-content">
                              <div className="current-volume">
                                    <div className="drop-volume">
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

function ButtonsPlayer() {
      const [play, setPlay] = useState(true)

      const handleClick = () => {
            if (play) {
                  setPlay(false)
            } else {
                  setPlay(true)
            }
      }

      return (
            <div className="buttons-player">
                  <ul className="list-buttons">
                        <li className="button-item">
                              <i className="fas fa-redo"></i>
                        </li>
                        <li className="button-item">
                              <i className="fas fa-backward"></i>
                        </li>
                        <li className="button-item active" onClick={handleClick}>
                              {play
                                    ? <i className="fas fa-play"></i>
                                    : <i className="fas fa-pause"></i>
                              }

                        </li>
                        <li className="button-item">
                              <i className="fas fa-forward"></i>
                        </li>
                        <li className="button-item">
                              <i className="fas fa-random"></i>
                        </li>
                  </ul>
            </div>
      )
}

function SongTime() {
      return (
            <div className="current-music-time">
                  <h3>1:32 - 4:25</h3>
            </div>
      )
}

function SongInfo() {
      return (
            <div className="current-music-info">
                  <div className="image-artist">
                        <img src="build/assets/images/backgrounds/wendy_montilla.jpeg" alt="image-artist" />
                  </div>
                  <div className="info-artist">
                        <h2>Sólo para ti - Haz morada</h2>
                        <h3>Wendy Montilla</h3>
                  </div>
            </div>
      )
}

function ProgressTime() {
      return (
            <div className="progress-content">
                  <div className="current-progress">
                  </div>
            </div>
      )
}

function Player() {
      return (
            <div className="player-wrapper">
                  <div className="progress-time-wrapper">
                        <ProgressTime />
                  </div>
                  <div className="player-content-wrapper">
                        <div className="player-content">
                              <SongInfo />
                              <SongTime />
                              <ButtonsPlayer />
                              <VolumeMusic />
                              <Extras />
                        </div>
                  </div>
            </div>
      )
}

function ItemListContent({ img, title }) {
      let { url } = useRouteMatch();

      return (
            <li className="item">
                  <div className="img">
                        <NavLink exact to={`/musica/wendymontilla`}>
                              <img src={img} />
                        </NavLink>
                        {title == 'Wendy Montilla'
                              ? <div className="more-content">
                                    <button>
                                          <i className="fas fa-play"></i>
                                    </button>
                              </div>
                              : ""
                        }
                  </div>
                  <div className="info">
                        <NavLink exact to={`/musica/wendymontilla`}>
                              <h3 className="title">{title}</h3>
                        </NavLink>
                        <i className="fas fa-ellipsis-v"></i>
                  </div>
            </li>
      )
}

function ListContent() {
      return (
            <div className="list-content">
                  <ul className="list">
                        <ItemListContent img="build\assets\images\backgrounds\wendy_montilla.jpeg" title="Wendy Montilla" />
                        <ItemListContent img="build\assets\images\backgrounds\marcos_witt.jpg" title="Marcos Witt" />
                        <ItemListContent img="build\assets\images\backgrounds\Funky.jpg" title="Funky" />
                        <ItemListContent img="build\assets\images\backgrounds\redimi2.jpg" title="Redimi2" />
                        <ItemListContent img="build\assets\images\backgrounds\job_gonzalez.jpg" title="Job González" />
                        <ItemListContent img="build\assets\images\backgrounds\danilo_montero.jpg" title="Danilo Montero" />
                        <ItemListContent img="build\assets\images\backgrounds\coalo_zamorano.jpg" title="Coalo Zamorano" />
                        <ItemListContent img="build\assets\images\backgrounds\mielsanmarcos.jpg" title="Miel San Marcos" />
                        <ItemListContent img="build\assets\images\backgrounds\barak.jpg" title="Barak" />
                        <ItemListContent img="build\assets\images\backgrounds\bani_munoz.jpg" title="Bani Muñoz" />
                        <ItemListContent img="build\assets\images\backgrounds\bethel_music.jpg" title="Bethel Music" />
                        <ItemListContent img="build\assets\images\backgrounds\christine.jpeg" title="Christine D'Clario" />
                        <ItemListContent img="build\assets\images\backgrounds\uncorazon.jpg" title="Un Corazón" />
                        <ItemListContent img="build\assets\images\backgrounds\elevation_worship.jpg" title="Elevation Worship" />
                        <ItemListContent img="build\assets\images\backgrounds\planetshakers.jpg" title="Planetshakers" />
                  </ul>
            </div>
      )
}

function Content({ titleContent }) {
      return (
            <div className="content-section">
                  <h2 className="title-section">{titleContent}</h2>
                  <ListContent />
            </div>
      )
}

function ItemListSidebar({ classIcon, title }) {
      const className = title == 'Artistas' ? 'list-item' : 'list-item'

      return (
            <li className={className}>
                  <i className={classIcon} />
                  {title}
            </li>
      )
}

function ListSidebar({ listTitle, children }) {
      return (
            <div className="list-section">
                  <h3 className="list-title">{listTitle}</h3>
                  {children}
            </div>
      )
}

function Sidebar() {
      let { url } = useRouteMatch();

      return (
            <div className="sidebar">
                  <ListSidebar listTitle="Música">
                        <ul className="list-menu">
                              <NavLink exact to={`${url}`} activeClassName="active">
                                    <ItemListSidebar classIcon="fas fa-home" title="Inicio" />
                              </NavLink>
                              <NavLink exact to={`${url}/recomendado`} activeClassName="active">
                                    <ItemListSidebar classIcon="fab fa-artstation" title="Recomendado" />
                              </NavLink>
                              <NavLink exact to={`${url}/genero`} activeClassName="active">
                                    <ItemListSidebar classIcon="fas fa-genderless" title="Género" />
                              </NavLink>
                              <NavLink exact to={`${url}/buscar`} activeClassName="active">
                                    <ItemListSidebar classIcon="fas fa-genderless" title="Buscar" />
                              </NavLink>
                        </ul>
                  </ListSidebar>
                  <ListSidebar listTitle="Mi biblioteca">
                        <ul className="list-menu">
                              <NavLink exact to={`${url}/canciones`} activeClassName="active">
                                    <ItemListSidebar classIcon="fas fa-genderless" title="Canciones" />
                              </NavLink>
                              <NavLink exact to={`${url}/artistas`} activeClassName="active">
                                    <ItemListSidebar classIcon="fas fa-genderless" title="Artistas" />
                              </NavLink>
                              <NavLink exact to={`${url}/albumes`} activeClassName="active">
                                    <ItemListSidebar classIcon="fas fa-genderless" title="Álbumes" />
                              </NavLink>
                              <NavLink exact to={`${url}/playlists`} activeClassName="active">
                                    <ItemListSidebar classIcon="fas fa-genderless" title="Playlists" />
                              </NavLink>
                              <NavLink exact to={`${url}/playlists`} activeClassName="active">
                                    <ItemListSidebar classIcon="fas fa-genderless" title="Playlists" />
                              </NavLink>
                              <NavLink exact to={`${url}/playlists`} activeClassName="active">
                                    <ItemListSidebar classIcon="fas fa-genderless" title="Playlists" />
                              </NavLink>
                              <NavLink exact to={`${url}/playlists`} activeClassName="active">
                                    <ItemListSidebar classIcon="fas fa-genderless" title="Playlists" />
                              </NavLink>
                        </ul>
                  </ListSidebar>
            </div>
      )
}

function Artist() {
      let { artista } = useParams()
      let { url } = useRouteMatch();

      return (
            <div className="section-artist">
                  <div className="background">
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
                  <div className="navmenu-artist">
                        <ul>
                              <li className="active">Vista general</li>
                              <li>A los fanaticos también les gusta</li>
                              <li>Acerca de</li>
                        </ul>
                  </div>
                  <div className="content-artist">
                        <div className="songs-artist">
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
                  </div>
            </div>
      )
}

function AllSongsArtist() {
      return (
            <div className="songs-artist-wrapper">
                  <div className="content-wrapper">

                        <div className="content-albums">
                              <div className="album-artist">
                                    <div className="header-album">
                                          <div className="cover-album">
                                                <img src="build\assets\images\backgrounds\marcos_witt.jpg" />
                                          </div>
                                          <div className="info-album">
                                                <h2 className="title-album">25 Concierto Conmemorativo</h2>
                                                <p>De <strong>Marcos Witt</strong></p>
                                                <p>2011 - 30 canciones, 1h 17 min</p>
                                                <div className="buttons">
                                                      <button className="btn-play-album">Reproducir</button>
                                                      <span className="button-icon"><i className="far fa-heart"></i></span>
                                                      <span className="button-icon"><i className="fas fa-ellipsis-h"></i></span>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="content-album">
                                          <table>
                                                <tr>
                                                      <th className="number-song">#</th>
                                                      <th className="fav-song"></th>
                                                      <th className="title-song">Título</th>
                                                      <th className="time-song"><i class="far fa-clock"></i></th>
                                                      <th className="liked-song"><i class="far fa-thumbs-up"></i></th>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">1</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Preludio conmemorativo</td>
                                                      <td className="time-song">3:48</td>
                                                      <td className="liked-song">4k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">2</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Canción a Dios</td>
                                                      <td className="time-song">1:07</td>
                                                      <td className="liked-song">5k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">3</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Motivo de mi canción</td>
                                                      <td className="time-song">1:28</td>
                                                      <td className="liked-song">3.5k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">4</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Es por ti</td>
                                                      <td className="time-song">4:03</td>
                                                      <td className="liked-song">1k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">5</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Te amo</td>
                                                      <td className="time-song">6:07</td>
                                                      <td className="liked-song">8k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">6</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Cuan bello es el señor</td>
                                                      <td className="time-song">6:07</td>
                                                      <td className="liked-song">8k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">7</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Has cambiado mi lamento</td>
                                                      <td className="time-song">6:07</td>
                                                      <td className="liked-song">8k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">8</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Un adorador</td>
                                                      <td className="time-song">6:07</td>
                                                      <td className="liked-song">8k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">9</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Será llena la tierra</td>
                                                      <td className="time-song">6:07</td>
                                                      <td className="liked-song">8k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">10</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Dios ha sido fiel</td>
                                                      <td className="time-song">6:07</td>
                                                      <td className="liked-song">8k</td>
                                                </tr>
                                          </table>
                                    </div>
                              </div>
                              <div className="album-artist">
                                    <div className="header-album">
                                          <div className="cover-album">
                                                <img src="build\assets\images\backgrounds\Funky.jpg" />
                                          </div>
                                          <div className="info-album">
                                                <h2 className="title-album">Agua</h2>
                                                <p>De <strong>Funky</strong></p>
                                                <p>2019 - 10 canciones, 37 min</p>
                                                <div className="buttons">
                                                      <button className="btn-play-album">Reproducir</button>
                                                      <span className="button-icon"><i className="far fa-heart"></i></span>
                                                      <span className="button-icon"><i className="fas fa-ellipsis-h"></i></span>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="content-album">
                                          <table>
                                                <tr>
                                                      <th className="number-song">#</th>
                                                      <th className="fav-song"></th>
                                                      <th className="title-song">Título</th>
                                                      <th className="time-song"><i class="far fa-clock"></i></th>
                                                      <th className="liked-song"><i class="far fa-thumbs-up"></i></th>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">1</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Confia</td>
                                                      <td className="time-song">3:48</td>
                                                      <td className="liked-song">4k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">2</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Disfrazao</td>
                                                      <td className="time-song">1:07</td>
                                                      <td className="liked-song">5k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">3</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Tiembla</td>
                                                      <td className="time-song">1:28</td>
                                                      <td className="liked-song">3.5k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">4</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Contra Viento y Marea</td>
                                                      <td className="time-song">4:03</td>
                                                      <td className="liked-song">1k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">5</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Hello</td>
                                                      <td className="time-song">6:07</td>
                                                      <td className="liked-song">8k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">6</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Hasta Que LLegué Yo</td>
                                                      <td className="time-song">6:07</td>
                                                      <td className="liked-song">8k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">7</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Hipo</td>
                                                      <td className="time-song">6:07</td>
                                                      <td className="liked-song">8k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">8</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Entiérralo</td>
                                                      <td className="time-song">6:07</td>
                                                      <td className="liked-song">8k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">9</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Soy tu Dios</td>
                                                      <td className="time-song">6:07</td>
                                                      <td className="liked-song">8k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">10</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Hello</td>
                                                      <td className="time-song">6:07</td>
                                                      <td className="liked-song">8k</td>
                                                </tr>
                                          </table>
                                    </div>
                              </div>
                              <div className="album-artist">
                                    <div className="header-album">
                                          <div className="cover-album">
                                                <img src="build\assets\images\backgrounds\danilo_montero.jpg" />
                                          </div>
                                          <div className="info-album">
                                                <h2 className="title-album">Mi Viaje</h2>
                                                <p>De <strong>Danilo Montero</strong></p>
                                                <p>2018 - 11 canciones, 52 min</p>
                                                <div className="buttons">
                                                      <button className="btn-play-album">Reproducir</button>
                                                      <span className="button-icon"><i className="far fa-heart"></i></span>
                                                      <span className="button-icon"><i className="fas fa-ellipsis-h"></i></span>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="content-album">
                                          <table>
                                                <tr>
                                                      <th className="number-song">#</th>
                                                      <th className="fav-song"></th>
                                                      <th className="title-song">Título</th>
                                                      <th className="time-song"><i class="far fa-clock"></i></th>
                                                      <th className="liked-song"><i class="far fa-thumbs-up"></i></th>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">1</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Este es el día</td>
                                                      <td className="time-song">3:48</td>
                                                      <td className="liked-song">4k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">2</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Vuelvo a ti</td>
                                                      <td className="time-song">1:07</td>
                                                      <td className="liked-song">5k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">3</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Eres Todopoderoso Popurrí (El es el Rey/Has aumentado)</td>
                                                      <td className="time-song">1:28</td>
                                                      <td className="liked-song">3.5k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">4</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Bueno estamos aqui</td>
                                                      <td className="time-song">4:03</td>
                                                      <td className="liked-song">1k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">5</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Te Alabare Popurrí/Bueno es alabar/Salmods 84</td>
                                                      <td className="time-song">6:07</td>
                                                      <td className="liked-song">8k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">6</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">¿A quién tengo yo?</td>
                                                      <td className="time-song">6:07</td>
                                                      <td className="liked-song">8k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">7</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Yo no se vivir sin Jesús</td>
                                                      <td className="time-song">6:07</td>
                                                      <td className="liked-song">8k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">8</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Cantaré de tu amor</td>
                                                      <td className="time-song">6:07</td>
                                                      <td className="liked-song">8k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">9</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">El señor es mi pastor</td>
                                                      <td className="time-song">6:07</td>
                                                      <td className="liked-song">8k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">10</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Llena todo en mi (Espontanea)</td>
                                                      <td className="time-song">6:07</td>
                                                      <td className="liked-song">3.5k</td>
                                                </tr>
                                          </table>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

function AlbumArtist(){
      return (
            <div className="album-artist-wrapper">
                  <div className="content-wrapper">
                        <div className="content-albums">
                              <div className="album-artist">
                                    <div className="header-album">
                                          <div className="cover-album">
                                                <img src="build\assets\images\backgrounds\marcos_witt.jpg" />
                                          </div>
                                          <div className="info-album">
                                                <h2 className="title-album">25 Concierto Conmemorativo</h2>
                                                <p>De <strong>Marcos Witt</strong></p>
                                                <p>2011 - 30 canciones, 1h 17 min</p>
                                                <div className="buttons">
                                                      <button className="btn-play-album">Reproducir</button>
                                                      <span className="button-icon"><i className="far fa-heart"></i></span>
                                                      <span className="button-icon"><i className="fas fa-ellipsis-h"></i></span>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="content-album">
                                          <table>
                                                <tr>
                                                      <th className="number-song">#</th>
                                                      <th className="fav-song"></th>
                                                      <th className="title-song">Título</th>
                                                      <th className="time-song"><i class="far fa-clock"></i></th>
                                                      <th className="liked-song"><i class="far fa-thumbs-up"></i></th>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">1</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Preludio conmemorativo</td>
                                                      <td className="time-song">3:48</td>
                                                      <td className="liked-song">4k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">2</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Canción a Dios</td>
                                                      <td className="time-song">1:07</td>
                                                      <td className="liked-song">5k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">3</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Motivo de mi canción</td>
                                                      <td className="time-song">1:28</td>
                                                      <td className="liked-song">3.5k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">4</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Es por ti</td>
                                                      <td className="time-song">4:03</td>
                                                      <td className="liked-song">1k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">5</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Te amo</td>
                                                      <td className="time-song">6:07</td>
                                                      <td className="liked-song">8k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">6</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Cuan bello es el señor</td>
                                                      <td className="time-song">6:07</td>
                                                      <td className="liked-song">8k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">7</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Has cambiado mi lamento</td>
                                                      <td className="time-song">6:07</td>
                                                      <td className="liked-song">8k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">8</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Un adorador</td>
                                                      <td className="time-song">6:07</td>
                                                      <td className="liked-song">8k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">9</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Será llena la tierra</td>
                                                      <td className="time-song">6:07</td>
                                                      <td className="liked-song">8k</td>
                                                </tr>
                                                <tr>
                                                      <td className="number-song">10</td>
                                                      <td className="fav-song"><i class="far fa-heart"></i></td>
                                                      <td className="title-song">Dios ha sido fiel</td>
                                                      <td className="time-song">6:07</td>
                                                      <td className="liked-song">8k</td>
                                                </tr>
                                          </table>
                                    </div>
                              </div>
                        </div>
                        <div className="more-of-artist">
                              <div className="header-section">
                                    <h2 className="title-section">Más de Wendy Montilla</h2>
                                    <hr/>
                              </div>
                              <div className="albums-artist">
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
                        </div>
                  </div>
            </div>
      )
}

export function Music() {
      const { loading, data } = useRequest()
      let { url } = useRouteMatch()

      return (
            <div  className="section-content w-padding-top">
                  <div className="wrapper-music">
                        <div className="music-content">
                              <Sidebar />
                              <Switch>
                                    <Route exact path={`${url}`} >

                                    </Route>
                                    <Route exact path={`${url}/artistas`} >
                                          <CheckAuth>
                                                <Content titleContent="Artistas" />
                                          </CheckAuth>
                                    </Route>
                                    <Route exact path={`${url}/:artista`} >
                                          <CheckAuth>
                                                <Artist />
                                          </CheckAuth>
                                    </Route>
                                    <Route exact path={`${url}/:artista/canciones`} >
                                          <CheckAuth>
                                                <AllSongsArtist />
                                          </CheckAuth>
                                    </Route>
                                    <Route exact path={`${url}/:artista/:album`} >
                                          <CheckAuth>
                                                <AlbumArtist />
                                          </CheckAuth>
                                    </Route>
                              </Switch>
                        </div>
                        </div>
                  <div className="player-content">
                        <Player />
                  </div>
            </div>
      )
}