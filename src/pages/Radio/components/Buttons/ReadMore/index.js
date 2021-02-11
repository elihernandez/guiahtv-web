import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import './styles.css'

export function ReadMore() {

      return (
            <div className="button-read-more-wrapper">
                  <Tooltip title="Leer más" placement="top-start">
                        <span className="button-read-more">
                              <i className="fas fa-ellipsis-h" />
                        </span>
                  </Tooltip>
            </div>
      )
}