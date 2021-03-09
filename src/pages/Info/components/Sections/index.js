import React from 'react'
import imgEnvivo from '../../../../assets/images/backgrounds/envivo.png'
import imgAlacarta from '../../../../assets/images/backgrounds/alacarta.png'
import imgRadio from '../../../../assets/images/backgrounds/radio.png'
import imPpv from '../../../../assets/images/backgrounds/ppv.png'
import imgMusica from '../../../../assets/images/backgrounds/musica.png'
import imgZonakids from '../../../../assets/images/backgrounds/zonakids.png'
import './styles.css'

export function Sections(){
      return(
            <div className="sections-app"> 
                  <h2 className="title-section">¿Qué puedo ver en Guíah TV?</h2>
                  <div className="info-section left">
                        <div className="img">
                              <img src={imgEnvivo} />
                        </div>   
                        <div className="info-wrapper">
                              <div className="info">
                                    <h2>En vivo</h2>
                                    <hr />
                                    <h3>Un espacio de bendición en tiempo real</h3>
                                    <h4>Disfruta de la palabra de Dios a tráves de nuestros canales en vivo, todos los días a todas horas.</h4>
                              </div>
                        </div>                        
                  </div>   
                  <div className="info-section right">
                        <div className="img">
                              <img src={imgAlacarta} />
                        </div>   
                        <div className="info-wrapper">
                              <div className="info">
                                    <h2>A la carta</h2>
                                    <hr />
                                    <h3>Un espacio de variedad</h3>
                                    <h4>Aquí encontrarás un amplio catálogo de películas, predicas, conciertos, seminarios y que alimentan tu alma y espíritu, velas cuantas veces quieras.</h4>
                              </div>
                        </div>                        
                  </div> 
                  <div className="info-section left">
                        <div className="img">
                              <img src={imgRadio} />
                        </div>   
                        <div className="info-wrapper">
                              <div className="info">
                                    <h2>Radio</h2>
                                    <hr />
                                    <h3>Un espacio de difusión</h3>
                                    <h4>Escucha las mejores estaciones de radio cristianas que difunden un mensaje de reflexión, música, palabra y contenido para toda la familia.</h4>
                              </div>
                        </div>                        
                  </div> 
                  <div className="info-section right">
                        <div className="img">
                              <img src={imgZonakids} />
                        </div>   
                        <div className="info-wrapper">
                              <div className="info">
                                    <h2>Zona kids</h2>
                                    <hr />
                                    <h3>Un espacio para los pequeños del hogar</h3>
                                    <h4>Dedicado a niños y niñas de cualquier edad, con contenido de valor para edificar y fortalecer su fe.</h4>
                              </div>
                        </div>                        
                  </div> 
                  <div className="info-section left">
                        <div className="img">
                              <img src={imPpv} />
                        </div>   
                        <div className="info-wrapper">
                              <div className="info">
                                    <h2>PPV</h2>
                                    <hr />
                                    <h3>Un espacio único</h3>
                                    <h4>Ten acceso exclusivo y vive los mejores eventos, conciertos, seminarios, clínicas, convenciones  y más, desde tu casa.</h4>
                              </div>
                        </div>                        
                  </div> 
                  <div className="info-section right">
                        <div className="img">
                              <img src={imgMusica} />
                        </div>   
                        <div className="info-wrapper">
                              <div className="info">
                                    <h2>Música</h2>
                                    <hr />
                                    <h3>Un espacio de alabanza</h3>
                                    <h4>Explora nuestra variedad de música de alabanza y adoración, los mejores podcasts con palabras de aliento y crea tus playlists con tus canciones favoritas.</h4>
                              </div>
                        </div>                        
                  </div> 
            </div>
      )
}