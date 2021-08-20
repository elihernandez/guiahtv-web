import React from 'react'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import { PopperMenu } from '../PopperMenu'
import './styles.css'
// import { devBasenameRouter, prodBasenameRouter } from '../../../config'
// const basename = process.env.NODE_ENV !== 'production' ? devBasenameRouter : prodBasenameRouter

export function UserMenu() {
	const [cookies, setCookie, removeCookie] = useCookies()
	const history = useHistory()

	const handleLogout = (e) => {
		e.preventDefault()
		removeCookie('memclid', { path: '/' })
		removeCookie('memclem', { path: '/' })
		history.push('/login')
	}

	const textButton = <span className="body-3">Mi perfil&nbsp;&nbsp;&nbsp;<i className='fas fa-user-circle' /></span>
	const itemsMenu = [
		{ title: 'Mi cuenta', href: 'https://cuenta.guiah.tv/Login', func: '' },
		{ title: 'Cerrar sesión', href: '#', func: handleLogout },
	]

	return (
		<div className="user-profile-navbar">
			<PopperMenu textButton={textButton} itemsMenu={itemsMenu} />
		</div>
	)
}
// <div>
//   <Button
//     ref={anchorRef}
//     aria-controls={open ? 'menu-list-grow' : undefined}
//     aria-haspopup="true"
//     onClick={handleToggle}
//   >
//     <span>Mi perfil&nbsp;&nbsp;&nbsp;<i className='fas fa-user-circle'/></span>
//   </Button>
//   <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
//     {({ TransitionProps, placement }) => (
//       <Grow
//         {...TransitionProps}
//         style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
//       >
//         <Paper>
//           <ClickAwayListener onClickAway={handleClose}>
//             <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
//               <a href="https://guiah.tv/axs/Login">
//                 <MenuItem>Mi cuenta</MenuItem>
//               </a>
//               <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
//             </MenuList>
//           </ClickAwayListener>
//         </Paper>
//       </Grow>
//     )}
//   </Popper>
// </div>