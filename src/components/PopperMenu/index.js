import React, { useEffect, useState, useRef} from 'react'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import './styles.css'

export function PopperMenu({textButton, itemsMenu, placement = 'bottom'}){
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
    
	return (
		<div className="popper-menu-wrapper">
			<Button
				ref={anchorRef}
				aria-controls={open ? 'menu-list-grow' : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
			>
				{textButton}
			</Button>
			<Popper open={open} anchorEl={anchorRef.current} placement={placement} role={undefined} transition disablePortal >
				{({ TransitionProps, placement }) => (
					<Paper>
						<ClickAwayListener onClickAway={handleClose}>
							<MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
								{
									itemsMenu.map(({title, href, func}) => {
										if(func != ''){
											return <a key={title} href={href} target="_blank" rel="noreferrer" onClick={handleClose}>
												<MenuItem onClick={func}>{title}</MenuItem>
											</a>
										}else{
											return <a key={title} href={href} target="_blank" rel="noreferrer" onClick={handleClose}>
												<MenuItem className="body-3">{title}</MenuItem>
											</a>
										}
									})
								}
							</MenuList>
						</ClickAwayListener>
					</Paper>
              
				)}
			</Popper>
		</div>
	)
}
    