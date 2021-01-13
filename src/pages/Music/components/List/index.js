import React from 'react'
import { NavLink, useRouteMatch } from "react-router-dom"
import './styles.css'

function ItemListContent({ img, title }) {
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

export function List({titleContent}){
      return (
            <div className="list-content">
                  <h2 className="title-section">{titleContent}</h2>
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