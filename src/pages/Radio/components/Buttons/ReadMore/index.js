import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Popover from '@material-ui/core/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { isLimitString } from '../../../../../js/String'
import './styles.css'

export function ReadMore({data}) {

      if(!data || !isLimitString(data.Description.length, 80)) return null

      const { Title, Description } = data

      return (
            <PopupState variant="popover" popupId="demo-popup-popover">
                  {(popupState) => (
                        <div>
                              <div className="button-read-more-wrapper">
                                    <Tooltip title="Leer más" placement="top-start">
                                          <span className="button-read-more" {...bindTrigger(popupState)}>
                                                <i className="fas fa-ellipsis-h" />
                                          </span>
                                    </Tooltip>
                              </div>
                              <Popover
                                    {...bindPopover(popupState)}
                                    anchorOrigin={{
                                          vertical: 'top',
                                          horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                          vertical: 'bottom',
                                          horizontal: 'center',
                                        }}
                              >   
                                    <div className="contact-info-item">
                                          <h2 className="title">{Title}</h2>
                                          <h3 className="description">{Description}</h3>
                                    </div>
                              </Popover>
                        </div>
                  )}
            </PopupState>
      )
}
