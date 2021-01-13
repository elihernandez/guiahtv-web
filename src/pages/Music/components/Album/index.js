import React from 'react'
import './styles.css'

export function Album(){
      return(
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
      )
}