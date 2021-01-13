import React, { useState } from 'react'
import './styles.css'

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

export function Player() {
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