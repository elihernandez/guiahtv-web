import React, { Fragment, useContext } from 'react'
import AudioContext from '../../../../../../context/AudioContext'
import MusicContext from '../../../../../../context/MusicContext'
import Tooltip from '@material-ui/core/Tooltip'
import { limitString, isLimitString } from '../../../../../../js/String'
import { ArtistsTrack } from '../../../../../../components/ListItem'
import './styles.css'

export function InfoSong() {
	const { stateAudio } = useContext(AudioContext)
	const { stateMusic } = useContext(MusicContext)
	const { error } = stateAudio
	const { track, album } = stateMusic
	const coverTrack = track?.portadaURL ? track?.portadaURL : album?.portadaURL

	if(!track || !track.regID){
		return null
	}

	return (
		<div className="current-music-info">
			<div className="image-artist">
				<img src={coverTrack} alt={`Cover de ${track.title}`} />
			</div>
			<div className="info-artist">
				{	error && track.length !== 0
					?	<h2 className="message-error">{error}</h2>
					:	<Fragment>
						<Tooltip title={isLimitString(track.title, 32) ? track.title : ''} placement="top-start">
							<h2>{limitString(track.title, 32)}</h2>
						</Tooltip>
						<ArtistsTrack artists={track.artists} />
					</Fragment>	
				}
			</div>		
		</div>
	)
}