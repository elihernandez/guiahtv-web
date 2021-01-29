import React from 'react'
import { useCookies } from 'react-cookie'
import { PopperMenu } from '../PopperMenu'
import './styles.css'

export function UserMenu() {
    const [cookies, setCookie, removeCookie] = useCookies()

    const handleLogout = () => {
        removeCookie('memclid', { path: '/' })
        removeCookie('memclem', { path: '/' })
        location.reload()
    }

    const textButton = <span>Mi perfil&nbsp;&nbsp;&nbsp;<i className='fas fa-user-circle' /></span>
    const itemsMenu = [
        { title: 'Mi cuenta', href: 'https://guiah.tv/axs/Login', func: '' },
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