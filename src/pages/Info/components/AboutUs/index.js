import React from 'react'
import img from '../../../../assets/images/backgrounds/guiahtv_devices.png'
import './styles.css'

export function AboutUs(){
      return (
            <div className="aboutus-wrapper">
                  <div className="img">
                        <img src={img} />
                  </div>
                  <div className="info-wrapper">
                        <div className="info-group">
                              <h2>¿Qué es Guiah Tv?</h2>
                              <hr />
                              <h3>Es una plataforma para
                              aquellos que buscan
                              fortalecer su alma y espíritu,
                              con contenidos que alimentan
                              su fe y les permitan crecer
                              en su vida personal, familiar
                              y ministerial. </h3>
                        </div>
                        <div className="info-group">
                              <h2>¿Qué ofrecemos?</h2>
                              <hr />
                              <h3>Una herramienta amigable
                              que incorpora en una
                              plataforma digital televisión
                              en vivo, música, video,
                              series, películas, radio y
                              pagos por evento. </h3>
                        </div>
                        <div className="info-group">
                              <h2>¿Porqué lo hacemos?</h2>
                              <hr />
                              <h3>Nuestras
                              familias necesitan
                              tener fácil acceso a
                              contenidos de calidad que
                              alimenten su alma y espíritu. </h3>
                        </div>
                  </div>
            </div>
      )
}