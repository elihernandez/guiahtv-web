import React, { Fragment, useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import MusicContext from '../../../../../../context/MusicContext'
import { useAxios } from '../../../../../../hooks/useAxios'
import { List } from '../../../../../../components/List'
import { LoaderSpinnerMUI } from '../../../../../../components/Loader'
import './styles.css'

export function Artist(){
	const { artistID } = useParams()
	const params = { artistID: artistID }
	const { stateMusic, dispatchMusic } = useContext(MusicContext)
	const { artist } = stateMusic
	const [dataArtist, setDataArtist] = useState([])
	const sendRequestArtist = artist?.artistID == artistID ? false : true
	const { loading, data } = useAxios('music-artist', sendRequestArtist, params)

	useEffect(() => {
		if(artist?.artistID == artistID){
			setDataArtist(artist)
		}else{
			if(data.albums){
				data.artistID = parseInt(artistID)
				// data.id = uuid()
				dispatchMusic({ type: 'setArtist', payload: data })
				setDataArtist(data)
			}
		}
	}, [data])

	if(loading){
		return <LoaderSpinnerMUI />
	}

	return (
		<Fragment>
			{   dataArtist.albums && (
				<Fragment>
					<div className="artist-info">
						<div className="artist-info-wrapper">
							<div className="cover-artist">
								<img className="cover-img" src={dataArtist.portadaURL} />
							</div>
							<div className="info-artist">
								<h2 className="text-artist">Artista</h2>
								<h3 className="name-artist">{dataArtist.title}</h3>
							</div>
						</div>
					</div>
					<List data={dataArtist} listType='albums' indexList={0} tabValues={0}/>
					<div className="about-artist-info">
						<h2 className="text-artist">Acerca de {dataArtist.title}</h2>
						<div className="about-artist-info-wrapper">
							<div className="cover-artist">
								<img className="cover-img" src={dataArtist.portadaURL} />
							</div>
							<div className="info-artist">
								<h3 className="description-artist">{dataArtist.description}</h3>
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	)
}