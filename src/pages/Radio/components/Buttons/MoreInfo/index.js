import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import './styles.css'

export function MoreInfo() {

      return (
            <div className="button-more-info-wrapper">
                  <Tooltip title="Más info" placement="top-start">
                        <span className="button-more-info">
                              <i className="fas fa-info" />
                        </span>
                  </Tooltip>
            </div>
      )
}