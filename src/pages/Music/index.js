import React from 'react'
import { useRequest } from '../../hooks/useRequest'
import './styles.css'

export function Music(){
      const {loading, data} = useRequest()

      return (
            <>
                  <div className="wrapper-music">
                        <div className="music-content">
                              <div className="sidebar">
                                    <div className="list-section">
                                          <h3 className="list-title">Música</h3>
                                          <ul className="list-menu">
                                                <li className="list-item">
                                                      <i className="fas fa-home"/>
                                                      Inicio
                                                </li>
                                                <li className="list-item active">
                                                      <i className="fas fa-compact-disc"/>
                                                      Estrenos
                                                </li>
                                                <li className="list-item">
                                                      <i className="fab fa-artstation"/>
                                                      Recomendado
                                                </li>
                                                <li className="list-item">
                                                      <i className="fas fa-genderless"/>
                                                      Género
                                                </li>
                                                
                                          </ul>
                                    </div>
                                    <div className="list-section">
                                          <h3 className="list-title">Playlists</h3>
                                          <ul className="list-menu">
                                                <li className="list-item">
                                                      <i className="fas fa-play-circle"/>
                                                      My playlist
                                                </li>
                                                <li className="list-item">
                                                      <i className="fas fa-plus-circle"/>
                                                      Nueva playlist
                                                </li>
                                          </ul>
                                    </div>
                              </div>
                              <div className="content-section">
                                    <h2 className="title-section">Estrenos</h2>
                                    <div className="list-content">
                                          <ul className="list">
                                                <li className="item">
                                                      <div className="img">
                                                            <img src="build\assets\images\backgrounds\wendy_montilla.jpeg"/>
                                                            <div className="more-content">
                                                                  <button>
                                                                        <i class="fas fa-play"></i>   
                                                                  </button>
                                                            </div>
                                                      </div>
                                                      <div className="info">
                                                            <h3 className="title">Wendy Montilla</h3>
                                                            <i class="fas fa-ellipsis-v"></i>
                                                      </div>
                                                </li>
                                                <li className="item">
                                                      <div className="img">
                                                            <img src="build\assets\images\backgrounds\marcos_witt.jpg"/>
                                                      </div>
                                                      <div className="info">
                                                            <h3 className="title">Marcos Witt</h3>
                                                            <i class="fas fa-ellipsis-v"></i>
                                                      </div>
                                                </li>
                                                <li className="item">
                                                      <div className="img">
                                                            <img src="build\assets\images\backgrounds\alex_zurdo.jpg"/>
                                                      </div>
                                                      <div className="info">
                                                            <h3 className="title">Alex Zurdo</h3>
                                                            <i class="fas fa-ellipsis-v"></i>
                                                      </div>
                                                </li>
                                                <li className="item">
                                                      <div className="img">
                                                            <img src="build\assets\images\backgrounds\Funky.jpg"/>
                                                      </div>
                                                      <div className="info">
                                                            <h3 className="title">Funky</h3>
                                                            <i class="fas fa-ellipsis-v"></i>
                                                      </div>
                                                </li>
                                                <li className="item">
                                                      <div className="img">
                                                            <img src="build\assets\images\backgrounds\redimi2.jpg"/>
                                                      </div>
                                                      <div className="info">
                                                            <h3 className="title">Redimi2</h3>
                                                            <i class="fas fa-ellipsis-v"></i>
                                                      </div>
                                                </li>
                                                <li className="item">
                                                      <div className="img">
                                                            <img src="build\assets\images\backgrounds\job_gonzalez.jpg"/>
                                                      </div>
                                                      <div className="info">
                                                            <h3 className="title">Job González</h3>
                                                            <i class="fas fa-ellipsis-v"></i>
                                                      </div>
                                                </li>
                                                <li className="item">
                                                      <div className="img">
                                                            <img src="build\assets\images\backgrounds\danilo_montero.jpg"/>
                                                      </div>
                                                      <div className="info">
                                                            <h3 className="title">Danilo Montero</h3>
                                                            <i class="fas fa-ellipsis-v"></i>
                                                      </div>
                                                </li>
                                                <li className="item">
                                                      <div className="img">
                                                            <img src="build\assets\images\backgrounds\coalo_zamorano.jpg"/>
                                                      </div>
                                                      <div className="info">
                                                            <h3 className="title">Coalo Zamorano</h3>
                                                            <i class="fas fa-ellipsis-v"></i>
                                                      </div>
                                                </li>
                                                <li className="item">
                                                      <div className="img">
                                                            <img src="build\assets\images\backgrounds\mielsanmarcos.jpg"/>
                                                      </div>
                                                      <div className="info">
                                                            <h3 className="title">Miel San Marcos</h3>
                                                            <i class="fas fa-ellipsis-v"></i>
                                                      </div>
                                                </li>
                                                <li className="item">
                                                      <div className="img">
                                                            <img src="build\assets\images\backgrounds\barak.jpg"/>
                                                      </div>
                                                      <div className="info">
                                                            <h3 className="title">Barak</h3>
                                                            <i class="fas fa-ellipsis-v"></i>
                                                      </div>
                                                </li>
                                                <li className="item">
                                                      <div className="img">
                                                            <img src="build\assets\images\backgrounds\bani_munoz.jpg"/>
                                                      </div>
                                                      <div className="info">
                                                            <h3 className="title">Bani Muñoz</h3>
                                                            <i class="fas fa-ellipsis-v"></i>
                                                      </div>
                                                </li>
                                                <li className="item">
                                                      <div className="img">
                                                            <img src="build\assets\images\backgrounds\bethel_music.jpg"/>
                                                      </div>
                                                      <div className="info">
                                                            <h3 className="title">Bethel Music</h3>
                                                            <i class="fas fa-ellipsis-v"></i>
                                                      </div>
                                                </li>
                                                <li className="item">
                                                      <div className="img">
                                                            <img src="build\assets\images\backgrounds\christine.jpeg"/>
                                                      </div>
                                                      <div className="info">
                                                            <h3 className="title">Christine D´Clario</h3>
                                                            <i class="fas fa-ellipsis-v"></i>
                                                      </div>
                                                </li>
                                                <li className="item">
                                                      <div className="img">
                                                            <img src="build\assets\images\backgrounds\uncorazon.jpg"/>
                                                      </div>
                                                      <div className="info">
                                                            <h3 className="title">Un Corazón</h3>
                                                            <i class="fas fa-ellipsis-v"></i>
                                                      </div>
                                                </li>
                                                <li className="item">
                                                      <div className="img">
                                                            <img src="build\assets\images\backgrounds\elevation_worship.jpg"/>
                                                      </div>
                                                      <div className="info">
                                                            <h3 className="title">Elevation Worship</h3>
                                                            <i class="fas fa-ellipsis-v"></i>
                                                      </div>
                                                </li>
                                                <li className="item">
                                                      <div className="img">
                                                            <img src="build\assets\images\backgrounds\planetshakers.jpg"/>
                                                      </div>
                                                      <div className="info">
                                                            <h3 className="title">Planetshakers</h3>
                                                            <i class="fas fa-ellipsis-v"></i>
                                                      </div>
                                                </li>
                                          </ul>
                                    </div>
                              </div>
                        </div>
                        <div className="player-wrapper">
                              <div className="progress-time-wrapper">
                                    <div className="progress-content">
                                          <div className="current-progress">
                                          </div>
                                    </div>
                              </div>
                              <div className="player-content-wrapper">
                                    <div className="player-content">
                                          <div className="current-music-info">
                                                <div className="image-artist">
                                                      <img src="build/assets/images/backgrounds/wendy_montilla.jpeg" alt="image-artist"/>
                                                </div>
                                                <div className="info-artist">
                                                      <h2>Sólo para ti - Haz morada</h2>
                                                      <h3>Wendy Montilla</h3>
                                                </div>
                                          </div>
                                          <div className="current-music-time">
                                                <h3>1:32 - 4:25</h3>
                                          </div>
                                          <div className="buttons-player">
                                                <ul className="list-buttons">
                                                      <li className="button-item">
                                                            <i class="fas fa-redo"></i>
                                                      </li>
                                                      <li className="button-item">
                                                            <i class="fas fa-backward"></i>
                                                      </li>
                                                      <li className="button-item active">
                                                            <i class="fas fa-play"></i>
                                                      </li>
                                                      <li className="button-item">
                                                            <i class="fas fa-forward"></i>
                                                      </li>
                                                      <li className="button-item">
                                                            <i class="fas fa-random"></i>
                                                      </li>
                                                </ul>
                                          </div>
                                          <div className="volume-music-content">
                                                <i class="fas fa-volume-up"></i>
                                                <div className="wrapper-volume-music">
                                                      <div className="volume-content">
                                                            <div className="current-volume">
                                                                  <div className="drop-volume">
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                          <div className="adds">
                                                <ul>
                                                      <li>
                                                            <i class="far fa-heart"></i>
                                                      </li>
                                                      <li>
                                                            <i class="fas fa-thumbs-up"></i>
                                                      </li>
                                                      <li>
                                                            <i class="fas fa-bars"></i>
                                                      </li>
                                                </ul>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      )
}