/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, useContext } from 'react'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Popover from '@material-ui/core/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import MusicContext from '../../../../context/MusicContext'
import GlobalContext from '../../../../context/GlobalContext'
import UserContext from '../../../../context/UserContext'
import { postTrackToPlaylist } from '../../../../services/postMusicTrackToPlaylist'
import { deleteTrackToPlaylist } from '../../../../services/deleteMusicTrackToPlaylist'
import { postPlaylist } from '../../../../services/postPlaylist'
import Tooltip from '@material-ui/core/Tooltip'
import { limitString } from '../../../../js/String'
import './styles.css'

export function SongMenu({ track, type = 'album' }) {
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
			<Tooltip title="Más opciones">
				<Button
					ref={anchorRef}
					aria-controls={open ? 'menu-list-grow' : undefined}
					aria-haspopup="true"
					onClick={handleToggle}
				>
					<i className="fas fa-ellipsis-h" />
				</Button>
			</Tooltip>
			<Popper open={open} anchorEl={anchorRef.current} placement="bottom-start" role={undefined} transition disablePortal >
				{({ TransitionProps, placement }) => (
					<Paper>
						<ClickAwayListener onClickAway={handleClose}>
							<MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
								{type === 'album' ?
									<MenuItem className="body-3">
										<PopoverPopupState track={track} />
									</MenuItem>
									:
									<ButtonDeleteSong track={track} />
								}
							</MenuList>
						</ClickAwayListener>
					</Paper>

				)}
			</Popper>
		</div>
	)
}

function PopoverPopupState({ track }) {
	const { stateMusic, dispatchMusic } = useContext(MusicContext)
	const { globalDispatch } = useContext(GlobalContext)
	const { stateUser } = useContext(UserContext)
	const { credentials } = stateUser
	const { myPlaylists } = stateMusic

	const handleClick = (playlistID) => {
		postTrackToPlaylist(credentials.memclid, track.regID, playlistID)
			.then(response => {
				globalDispatch({ type: 'setSnackbarOptions', payload: { open: true, type: 'success', message: <p>La canción se agregó a la playlist. <i className="fad fa-check-circle"></i></p> } })
			})
			.catch(error => {
				globalDispatch({ type: 'setSnackbarOptions', payload: { open: true, type: 'danger', message: <p>No se pudo agregar la canción a la playlist. <i className="fad fa-check-circle"></i></p> } })
			})
	}

	const handleAddToPlaylistNew = () => {
		const modal = {
			isModalActive: true,
			data: {
				name: '',
				description: '',
				isPublic: false
			},
			type: 'create-ws',
			track
		}

		dispatchMusic({ type: 'setModal', payload: modal })
	}

	return (
		<PopupState variant="popover" popupId="demo-popup-popover">
			{(popupState) => (
				<div>
					<Button variant="contained" color="primary" {...bindTrigger(popupState)}>
						<i className="fas fa-caret-left" />Agregar a playlist
					</Button>
					<Popover
						{...bindPopover(popupState)}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'left',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
					>
						{
							myPlaylists.map((playlist) => {
								if (playlist.type === 'button') {
									return <Box key={playlist.title} className="button-separated" p={2} onClick={handleAddToPlaylistNew}>
										<Typography className="body-3">Agregar a una playlist nueva</Typography>
									</Box>
								}

								return <Box key={playlist.regID} p={2} onClick={() => handleClick(playlist.regID)}>
									<Typography className="body-3">{playlist.title}</Typography>
								</Box>
							})
						}
					</Popover>
				</div>
			)}
		</PopupState>
	)
}

function ButtonDeleteSong({ track }) {
	const { stateMusic, dispatchMusic } = useContext(MusicContext)
	const { globalDispatch } = useContext(GlobalContext)
	const { stateUser } = useContext(UserContext)
	const { credentials } = stateUser
	const { playlist } = stateMusic

	const handleClick = () => {
		deleteTrackToPlaylist(credentials.memclid, track.regID, playlist.playlistID)
			.then(response => {
				const newPlaylist = playlist.tracks.filter(function (e) {
					return e.regID !== track.regID
				})

				playlist.totalItems = playlist.totalItems - 1
				playlist.tracks = newPlaylist
				dispatchMusic({ type: 'setPlaylist', payload: playlist })
				globalDispatch({ type: 'setSnackbarOptions', payload: { open: true, type: 'success', message: <p>La canción se eliminó a la playlist. <i className="fad fa-check-circle"></i></p> } })
			})
			.catch(error => {
				globalDispatch({ type: 'setSnackbarOptions', payload: { open: true, type: 'success', message: <p>La canción se eliminó a la playlist. <i className="fad fa-check-circle"></i></p> } })
			})
	}

	return (
		<MenuItem className="body-3" onClick={handleClick}>Eliminar de playlist</MenuItem>
	)
}