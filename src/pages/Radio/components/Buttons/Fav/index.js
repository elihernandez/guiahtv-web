import React, { useState } from 'react'
import './styles.css'

export function Fav() {
      const [fav, setFav] = useState(false)

      const handleClick = () => {
            setFav(!fav)
      }

      return (
            <div className="button-fav-wrapper">
                  <span className="button-fav" onClick={handleClick}>
                        {!fav &&
                              <i className="far fa-heart" />
                        }
                        {fav &&
                              <i className="fas fa-heart" />
                        }
                  </span>
            </div>
      )
}