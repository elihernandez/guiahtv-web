// import React, { useContext } from 'react'
// import MusicContext from '../../../../context/MusicContext'
// import { PopperMenu } from '../../../../components/PopperMenu'
// import Tooltip from '@material-ui/core/Tooltip'
// import './styles.css'

// export const SongMenu = () => {
// 	// const { stateMusic } = useContext(MusicContext)
// 	// const { myPlaylists } = stateMusic

// 	// console.log(myPlaylists)
// 	const itemsMenu2 = [
// 		{ title: 'hola', href: '#', func: '' },
// 		{ title: 'hola2', href: '#', func: '' },
// 	]
	
// 	const PlaylistsMenu = () => <PopperMenu textButton={<div>Agregar a playlist <i className="fas fa-caret-right" /></div>} itemsMenu={itemsMenu2} placement="top-left"/>

// 	const itemsMenu = [
// 		{ title: <PlaylistsMenu />, href: '#', func: () => {} },
// 		{ title: <div>Guardar en Tus me gusta</div>, href: '#', func: '' },
// 	]

// 	return (
// 		<Tooltip title="Opciones de playlist" placement="top-start" enterDelay={500} enterNextDelay={500}>
// 			<PopperMenu textButton={<i className="fas fa-ellipsis-h"/>} itemsMenu={itemsMenu} placement="bottom-start"/>
// 		</Tooltip>
// 	)
// }

/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef} from 'react'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import './styles.css'

export function SongMenu(){
	const anchorRef = useRef(null)
	const [open, setOpen] = useState(false)
    
	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen)
	}
    
	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return
		}
    
		setOpen(false)
	}
    
	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault()
			setOpen(false)
		}
	}
    
	// return focus to the button when we transitioned from !open -> open
	const prevOpen = useRef(open)
	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus()
		}
    
		prevOpen.current = open
	}, [open])


	const handleClick = (e) => {
		e.preventDefault()
		console.log('Hola')
	}
    
	return (
		<div className="popper-menu-wrapper">
			<Button
				ref={anchorRef}
				aria-controls={open ? 'menu-list-grow' : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
			>
				<i className="fas fa-ellipsis-h"/>
			</Button>
			<Popper open={open} anchorEl={anchorRef.current} placement="bottom-start" role={undefined} transition disablePortal >
				{({ TransitionProps, placement }) => (
					<Paper>
						<ClickAwayListener onClickAway={handleClose}>
							<MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
								<MenuItem className="body-3" onClick={handleClick}>Agregar a playlist <i className="fas fa-caret-right" /></MenuItem>
								<MenuItem className="body-3" onClick={handleClick}>Guardar en Tus me gusta</MenuItem>
							</MenuList>
						</ClickAwayListener>
					</Paper>
              
				)}
			</Popper>
		</div>
	)
}
    