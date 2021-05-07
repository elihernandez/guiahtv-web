import React, { Fragment, useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import MusicContext from '../../../../../../context/MusicContext'
import { useAxios } from '../../../../../../hooks/useAxios'
import { List } from '../../../../../../components/List'
import { LoaderSpinnerMUI } from '../../../../../../components/Loader'
import { minutesToHoursString, getYearDate } from '../../../../../../js/Time'
import './styles.css'

export function Album(){
	const { albumID } = useParams()
	const params = { albumID: albumID }
	const { stateMusic, dispatchMusic } = useContext(MusicContext)
	const { album } = stateMusic
	const [dataAlbum, setDataAlbum] = useState([])
	const sendRequestAlbum = album?.albumID == albumID ? false : true
	const { loading, data } = useAxios('music-album', sendRequestAlbum, params)

	useEffect(() => {
		if(data.length){
			dispatchMusic({ type: 'setAlbum', payload: data })
		}

		if(album?.albumID == albumID){
			setDataAlbum(album)
		}else{
			if(data.tracks){
				data.albumID = parseInt(albumID)
				data.id = uuid()
				dispatchMusic({ type: 'setAlbum', payload: data })
				setDataAlbum(data)
			}
		}
	}, [data])

	if(loading){
		return <LoaderSpinnerMUI />
	}

	return (
		<Fragment>
			{dataAlbum.tracks && (
				<Fragment>
					<div className="album-info">
						<div className="album-info-wrapper">
							<div className="cover-album">
								<img className="cover-img" src={dataAlbum.portadaURL} />
							</div>
							<div className="info-album">
								<h2 className="text-album">Álbum</h2>
								<h3 className="name-album">{dataAlbum.title}</h3>
								<div className="more-info-album">
									<p>{getYearDate(dataAlbum.releaseDate)}</p>
									<p>{dataAlbum.totalItems} canciones </p>
									<p>{minutesToHoursString(dataAlbum.length)}</p>
								</div>
							</div>
						</div>
					</div>
					<List data={dataAlbum} listType='tracksAlbum' indexList={0} tabValues={0}/>
				</Fragment>
			)}
		</Fragment>
	)
}