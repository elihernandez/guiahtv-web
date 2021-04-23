import React, { Fragment, useEffect, useContext } from 'react'
import AudioContext from '../../../../../../context/AudioContext'
import { useAxios } from '../../../../../../hooks/useAxios'
import { List } from '../../../../../../components/List'
import { LoaderSpinnerMUI } from '../../../../../../components/Loader'

export function Home(){
	const { loading, data } = useAxios('music-home')
	const { dispatchAudio } = useContext(AudioContext)

	useEffect(() => {
		if(data.musicSections){
			dispatchAudio({ type: 'setData', payload: data.musicSections })
		}
	}, [data])

	if(loading){
		return <LoaderSpinnerMUI />
	}

	return (
		<Fragment>
			{   data?.musicSections &&
				data.musicSections.map((sectionData) => {
					return <List key={sectionData.title} data={sectionData} listType={sectionData.contentType} indexList={0} tabValues={0}/>
				})
			}
		</Fragment>
	)
}