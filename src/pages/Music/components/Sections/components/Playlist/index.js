import React, { Fragment, useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import MusicContext from '../../../../../../context/MusicContext'
import { useAxios } from '../../../../../../hooks/useAxios'
import { List } from '../../../../../../components/List'
import { LoaderSpinnerMUI } from '../../../../../../components/Loader'
import { minutesToHoursString, getYearDate } from '../../../../../../js/Time'
import './styles.css'

export function Playlist(){
	const { playlistID } = useParams()
	const params = { playlistID: playlistID }
	const { stateMusic, dispatchMusic } = useContext(MusicContext)
	const { playlist } = stateMusic
	const [dataPlaylist, setDataPlaylist] = useState([])
	const sendRequestPlaylist = playlist?.playlistID == playlistID ? false : true
	const { loading, data } = useAxios('music-playlist', sendRequestPlaylist, params)

	useEffect(() => {
		if(data.length){
			dispatchMusic({ type: 'setPlaylist', payload: data })
		}

		console.log(playlist?.playlistID == playlistID)
		if(playlist?.playlistID == playlistID){
			setDataPlaylist(playlist)
		}else{
			if(data.tracks){
				data.playlistID = parseInt(playlistID)
				data.id = uuid()
				dispatchMusic({ type: 'setPlaylist', payload: data })
				setDataPlaylist(data)
			}
		}
	}, [data])

	if(loading){
		return <LoaderSpinnerMUI />
	}

	return (
		<Fragment>
			{dataPlaylist.tracks && (
				<Fragment>
					<div className="album-info">
						<div className="album-info-wrapper">
							<div className="cover-album">
								<img className="cover-img" src={dataPlaylist.portadaURL} />
							</div>
							<div className="info-album">
								<h2 className="text-album">Playlist</h2>
								<h3 className="name-album">{dataPlaylist.title}</h3>
								<h3 className="description-album">{dataPlaylist.description}</h3>
								<div className="more-info-album">
									<p>{getYearDate(dataPlaylist.releaseDate)}</p>
									<p>{dataPlaylist.totalItems} canciones </p>
									<p>{minutesToHoursString(dataPlaylist.length)}</p>
								</div>
							</div>
						</div>
					</div>
					<List data={dataPlaylist} listType='tracksPlaylist' indexList={0} tabValues={0}/>
				</Fragment>
			)}
		</Fragment>
	)
}