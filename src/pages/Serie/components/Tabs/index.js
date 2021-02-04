import React, { useState, useEffect } from 'react'
import { getSeasons } from '../../../../services/getSeasons' 
import { getContactInfo } from '../../../../services/getContactInfo'
import { Seasons } from '../Seasons'
import { Info } from '../Info'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'

function TabPanel(props) {
      const { children, value, index, ...other } = props
    
      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`full-width-tabpanel-${index}`}
          aria-labelledby={`full-width-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box p={3}>
                  {children}
            </Box>
          )}
        </div>
      )
}

TabPanel.propTypes = {
      children: PropTypes.node,
      index: PropTypes.any.isRequired,
      value: PropTypes.any.isRequired,
}
    
function a11yProps(index) {
      return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
      }
}

export function TabsContent({serieId, contactId}) {
      const [value, setValue] = useState(0)
      const [seasons, setSeasons] = useState(null)
      const [info, setInfo] = useState(null)
    
      const handleChange = (event, newValue) => {
            setValue(newValue)
      }
    
      const handleChangeIndex = (index) => {
            setValue(index)
      }

      const [anchorEl, setAnchorEl] = useState(null)
      const open = Boolean(anchorEl)

      const handleClick = (event) => {
            setAnchorEl(event.currentTarget)
      }

      const handleClose = () => {
            setAnchorEl(null)
      }

      useEffect(() => {
            const requestSeasons = async () => {
                  try{
                        const response = await getSeasons(serieId)
                        setSeasons(response)
                  }catch(e){

                  }
            }

            const requestContactInfo = async () => {
                  try{
                        const response = await getContactInfo(contactId)
                        setInfo(response)
                        console.log(response)
                  }catch(e){

                  }
            }

            requestSeasons()
            requestContactInfo()
      }, [])
    
      return (
            <div className="tabs-info-wrapper">
                  <AppBar position="static" color="default">
                        <Tabs
                              value={value}
                              onChange={handleChange}
                              indicatorColor="primary"
                              textColor="primary"
                              variant="fullWidth"
                              aria-label="full width tabs info"
                        >
                              <Tab label="Episodios" {...a11yProps(0)} />
                              <Tab label="Detalles" {...a11yProps(1)} />
                        </Tabs>
                  </AppBar>
                  <TabPanel value={value} index={0}>
                        {seasons &&
                              <Seasons seasons={seasons} serieId={serieId}/>
                        }
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                        {info &&
                              <Info data={info} />   
                        }
                  </TabPanel>
            </div>
      )
}