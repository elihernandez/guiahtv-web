import React, { useState } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import './styles.css'

export function Fav() {
      const [fav, setFav] = useState(false)

      const handleClick = () => {
            setFav(!fav)
      }

      return (
            <div className="button-fav-wrapper">
                  <Tooltip title="Guradar en favoritos" placement="top-start">
                        <span className="button-fav" onClick={handleClick}>
                              {!fav &&
                                    <i className="far fa-heart" />
                              }
                              {fav &&
                                    <i className="fas fa-heart" />
                              }
                        </span>
                  </Tooltip>
            </div>
      )
}