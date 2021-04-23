import React, { Fragment, useContext } from 'react'
import AudioContext from '../../../../../../context/AudioContext'
import Tooltip from '@material-ui/core/Tooltip'
import { limitString, isLimitString } from '../../../../../../js/String'
import './styles.css'

export function InfoSong() {
	const { stateAudio } = useContext(AudioContext)
	const { track, error } = stateAudio

	if(!track || !track.regID){
		return null
	}

	return (
		<div className="current-music-info">
			<div className="image-artist">
				<img src={track.portadaURL} alt={`Cover de ${track.Title}`} />
			</div>
			<div className="info-artist">
				{	error && track.length !== 0
					?	<h2 className="message-error">{error}</h2>
					:	<Fragment>
						<Tooltip title={isLimitString(track.title, 32) ? track.title : ''} placement="top-start">
							<h2>{limitString(track.title, 32)}</h2>
						</Tooltip>
						<h3>{track.description}</h3>
					</Fragment>	
				}
			</div>		
		</div>
	)
}