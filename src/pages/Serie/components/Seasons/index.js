import React, { useState, useContext, useEffect } from 'react'
import UserContext from '../../../../context/UserContext'
import VodContext from '../../../../context/VodContext'
import { getChapters } from '../../../../services/getChapters'
import { PopperMenu } from '../../../../components/PopperMenu'
import { List } from '../../../../components/List'
import { LoaderSpinnerMUI } from '../../../../components/Loader'
import './styles.css'

export function Seasons({ seasons, serieId }) {
	const [chapters, setChapters] = useState({ cmData: [] })
	const { stateUser } = useContext(UserContext)
	const { dispatchVod } = useContext(VodContext)
	const { credentials } = stateUser
	const [loading, setLoading] = useState(false)
	const textButton = <span>Temporadas&nbsp;&nbsp;&nbsp;<i className='fas fa-caret-down' /></span>
	const itemsMenu = []

	seasons.map(({ Title, TitleSeason }) => {

		const requestData = async () => {
			try {
				const response = await getChapters(serieId, TitleSeason, credentials)
				setChapters({
					category: Title,
					poster_type: 1,
					cmData: response
				})
				dispatchVod({
					type: 'setSeason', payload: {
						id: TitleSeason,
						category: Title,
						poster_type: 1,
						cmData: response
					}
				})
				setLoading(false)
			} catch (e) {
				console.log(e)
			}
		}

		const handleClick = (e) => {
			e.preventDefault()
			requestData()
			setLoading(true)
			setChapters({ cmData: [] })
		}

		itemsMenu.push({ title: Title, href: '#', func: handleClick })
	})

	useEffect(() => {
		const firstSeason = seasons[0]
		const { Title, TitleSeason } = firstSeason

		const requestData = async () => {
			setLoading(true)
			try {
				const response = await getChapters(serieId, TitleSeason, credentials)
				setChapters({
					category: Title,
					poster_type: 1,
					cmData: response
				})
				dispatchVod({
					type: 'setSeason', payload: {
						id: TitleSeason,
						category: Title,
						poster_type: 1,
						cmData: response
					}
				})
				setLoading(false)
			} catch (e) {
				console.log(e)
			}
		}

		requestData()
	}, [])

	return (
		<div className="seasons-content-wrapper">
			{seasons.length > 1 &&
				<div className="seasons-menu">
					<PopperMenu textButton={textButton} itemsMenu={itemsMenu} />
				</div>
			}
			{loading &&
                <LoaderSpinnerMUI />
			}
			{chapters &&
                <List data={chapters} listType="season" />
			}
		</div>
	)
}