import React, { Fragment, useState, useContext, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import UserContext from '../../context/UserContext'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

export function SnackbarAuth() {
      const [cookies, setCookie] = useCookies()
      const [state, setState] = useState({
            open: false,
            vertical: 'top',
            horizontal: 'right',
      })
      const { vertical, horizontal, open } = state
      const { stateUser } = useContext(UserContext)
      const { suscriptionStatus } = stateUser
      const [message, setMessage] = useState('')

      const handleClose = () => {
            setState({ ...state, open: false })
      }

      useEffect(() => {
            if(!cookies.susmes){
                  switch (suscriptionStatus) {
                        case 2:
                              setState({ ...state, open: true })
                              setMessage(<Fragment>
                                    Suscripción en periodo de gracia, te invitamos a renovar tu suscripción. <br />
                                    <a style={{color: "white"}} href="https://guiah.tv/axs/Suscription">Renovar suscripción</a>
                              </Fragment>)
                              setCookie('susmes', suscriptionStatus, { path: '/', maxAge: 60 * 60 * 6 }) 
                        break
                        case 3:
                              setState({ ...state, open: true })
                              setMessage(<Fragment>
                                    Suscripción gratuita, te invitamos a suscribirte. <br />
                                    <a style={{color: "white"}} href="https://guiah.tv/axs/Suscription">Suscribirme</a>
                              </Fragment>)
                              setCookie('susmes', suscriptionStatus, { path: '/', maxAge: 60 * 60 * 6 }) 
                        break
                  }
            }
      }, [suscriptionStatus])

      return (
            <Fragment>
            {open 
            ?     <div>
                        <Snackbar
                              anchorOrigin={{ vertical, horizontal }}
                              open={open}
                              onClose={handleClose}
                              message={message}
                              key={vertical + horizontal}
                              autoHideDuration={10000}
                              action={
                                    <Fragment>
                                          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                                <CloseIcon fontSize="small" />
                                          </IconButton>
                                    </Fragment>
                              }
                        />
                  </div>
            :     null
            }
            </Fragment>
      )
}