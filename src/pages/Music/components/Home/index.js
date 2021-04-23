import React, { Fragment, useEffect, useContext } from 'react'
import AudioContext from '../../../../context/AudioContext'
import { useAxios } from '../../../../hooks/useAxios'
import { List } from '../../../../components/List'

export function Home(){
	const { data } = useAxios('music-home')
	const { dispatchAudio } = useContext(AudioContext)

	useEffect(() => {
		if(data.musicSections){
			dispatchAudio({ type: 'setData', payload: data.musicSections })
		}
	}, [data])

	return (
		<Fragment>
			{   data.musicSections &&
				data.musicSections.map((sectionData) => {
					return <List key={sectionData.title} data={sectionData} listType={sectionData.contentType} indexList={0} tabValues={0}/>
				})
			}
		</Fragment>
	)
}