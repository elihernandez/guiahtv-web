import React, { useEffect, useState, useRef} from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { useCookies } from 'react-cookie'
import './styles.css';

export function UserMenu() {
      const [open, setOpen] = useState(false)
      const anchorRef = useRef(null)
      const history = useHistory()
      const [cookies, setCookie, removeCookie] = useCookies()
    
      const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen)
      }
    
      const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return
        }
    
        setOpen(false);
      }
    
      function handleListKeyDown(event) {
        if (event.key === 'Tab') {
          event.preventDefault()
          setOpen(false)
        }
      }

      const handleLogout = () => {
        removeCookie('memclid', { path: '/' })
        removeCookie('memclem', { path: '/' })
        location.reload()
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
        <div className="user-profile-navbar">
          <div>
            <Button
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
                  <span>Mi perfil&nbsp;&nbsp;&nbsp;<i className="fas fa-user-circle"/></span>
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <a href="https://guiah.tv/axs/Login">
                          <MenuItem onClick="">Mi cuenta</MenuItem>
                        </a>
                        <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </div>
        );
}