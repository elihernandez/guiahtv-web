import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import './styles.css'

function findTabRadio(data, contentId){
	let tabContent
	data.map((categories, indexC) => {
		categories.cmData.map((station) => {
			if(station.Registro === contentId){
				tabContent = indexC
			}
		})
	})

	return tabContent
}
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

export function CustomTabs({data, initialTab}){
	const [value, setValue] = useState(0)
	
	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	useEffect(() => {
		if(initialTab){
			setValue(initialTab)
		}
	}, [])

	return (
		<div className="tabs-wrapper">
			<AppBar position="static" color="default">
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
					aria-label="full width tabs info"
				>
					{
						data.map(({title}, index) => {
							return <Tab key={`${title}-${index}`} disableRipple={false} label={title} {...a11yProps(index)} />
						})
					}
				</Tabs>
			</AppBar>
			{
				data.map(({content}, index) => {
					return <TabPanel key={`${data[index].title}-Content-${index}`} value={value} index={index}>
						{content}
					</TabPanel>
				})
			}
		</div>
	)
}