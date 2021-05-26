import React, { Fragment, useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { useAxios } from '../../../../../../hooks/useAxios'
import MusicContext from '../../../../../../context/MusicContext'
import { PlaylistMenu } from '../../../Menu'
import { List } from '../../../../../../components/List'
import { LoaderSpinnerMUI } from '../../../../../../components/Loader'
import { minutesToHoursString, getYearDate } from '../../../../../../js/Time'
import './styles.css'

export function Playlist(){
	const { playlistID } = useParams()
	const params = { playlistID: playlistID }
	const [isEditPlaylist, setIsEditPlaylist] = useState(false)
	const [dataPlaylist, setDataPlaylist] = useState([])
	const { stateMusic, dispatchMusic } = useContext(MusicContext)
	const { playlist, myPlaylists } = stateMusic
	const sendRequestPlaylist = playlist?.playlistID == playlistID ? false : true
	const { loading, data } = useAxios('music-playlist', sendRequestPlaylist, params)

	useEffect(() => {
		if(data.length){
			dispatchMusic({ type: 'setPlaylist', payload: data })
		}

		if(playlist?.playlistID == playlistID){
			setDataPlaylist(playlist)
		}else{
			if(data?.musicCollectionID){
				data.playlistID = parseInt(playlistID)
				data.id = uuid()
				dispatchMusic({ type: 'setPlaylist', payload: data })
				setDataPlaylist(data)
			}
		}
	}, [data])

	const isMyPlaylist = (playlist, myPlaylists) => {
		if(myPlaylists.find(element => element.regID === playlist.musicCollectionID)){
			return true
		}
		return false
	}

	useEffect(() => {
		if(playlist?.musicCollectionID && myPlaylists.length > 0 && isMyPlaylist(playlist, myPlaylists)){
			setIsEditPlaylist(true)
		}else{
			setIsEditPlaylist(false)
		}
	}, [playlist, myPlaylists])

	if(loading){
		return <LoaderSpinnerMUI />
	}

	return (
		<Fragment>
			<div className="album-info">
				<div className="album-info-wrapper">
					<div className="cover-album">
						<img className="cover-img" src={dataPlaylist.portadaURL} />
					</div>
					<div className="info-album">
						<h2 className="text-album">Playlist
							{isEditPlaylist &&
								<PlaylistMenu dataPlaylist={dataPlaylist} />
							}
						</h2>
						<h3 className="name-album">{dataPlaylist.title}</h3>
						<h3 className="description-album">{dataPlaylist.description}</h3>
						<div className="more-info-album">
							<ReleaseDate dataPlaylist={dataPlaylist} />
							<TotalSongs dataPlaylist={dataPlaylist} />
							<Length dataPlaylist={dataPlaylist} />
						</div>
					</div>
				</div>
			</div>
			{dataPlaylist?.tracks && (
				<List data={dataPlaylist} listType='tracksPlaylist' indexList={0} tabValues={0}/>
			)}
		</Fragment>
	)
}

const ReleaseDate = ({ dataPlaylist }) => {
	return <p>{getYearDate(dataPlaylist.releaseDate)}&nbsp;&nbsp;-&nbsp;&nbsp;</p>
}

const TotalSongs = ({ dataPlaylist }) => {
	return (
		<Fragment>
			{dataPlaylist?.tracks ? (
				<p>{dataPlaylist.totalItems}&nbsp;canciones</p>
			) : (
				<p>&nbsp;Sin canciones</p>
			)}
		</Fragment>
	)
}

const Length = ({ dataPlaylist }) => {
	return (
		<Fragment>
			{dataPlaylist?.tracks && (
				<p>&nbsp;,{minutesToHoursString(dataPlaylist.length)}</p>
			)}
		</Fragment>
	)
}