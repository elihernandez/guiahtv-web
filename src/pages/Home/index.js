import React, {useEffect, useState} from 'react'
import { useAxios } from '../../hooks/useAxios'
import { Spotlight } from '../../components/Spotlight/index'
import { ButtonsMenu } from '../../components/ButtonsMenu/index'
import './styles.css'

export function Home() {

	const [spotlightData, setSpotlightData] = useState(null)
	const [buttonsMenuData, setButtonsMenu] = useState(null)
	const dataSpotlight = useAxios('spotlight')
	const dataButtonsMenu = useAxios('buttons-menu')

	const { error, count } = dataSpotlight

	useEffect(() => {

		Promise.all([dataSpotlight.getData(), dataButtonsMenu.getData()])
			.then( values => {
				console.log(values)
				setSpotlightData(values[0])
				setButtonsMenu(values[1])
			})
			
	}, [count])

	if(error){
		return error
	}
	
	return (
		<div className="wrapper-home">
			{ error ? (error) : (
				<>
					<div>{
						spotlightData && <Spotlight data={spotlightData}/>
					}</div>
					<div>{
						buttonsMenuData && <ButtonsMenu data={buttonsMenuData}/>
					}</div>
				</>
			)}
		</div>
	)
}