import React, { Fragment } from 'react'
import Tooltip from '@material-ui/core/Tooltip'

function isShortString(string){
      if (string.length > 60) {
            return true
      }

      return false
}

export function ContactInfo({description, contactID, handleClickShowInfo}) {
      return (
            <div className="buttons-content" >
                  <Tooltip title="Más info" placement="top-start">
                        <span tabIndex="0" onClick={handleClickShowInfo}>
                              <i className="fas fa-info" tabIndex="0" />
                        </span>
                  </Tooltip>
            </div>
      )
}