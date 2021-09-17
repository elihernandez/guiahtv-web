import React, { Fragment } from 'react'
import { useAxios } from '../../../../../../hooks/useAxios'
import { List } from '../../../../../../components/List'
import { LoaderSpinnerMUI } from '../../../../../../components/Loader'

export function Home(){
	const { loading, data } = useAxios('music-home')

	if(loading){
		return <LoaderSpinnerMUI />
	}

	return (
		<Fragment>
			{   data?.musicSections &&
				data.musicSections.map((sectionData, index) => {
					return <List key={`${sectionData.title}-${index}`} data={sectionData} listType={sectionData.contentType} indexList={0} tabValues={0}/>
				})
			}
		</Fragment>
	)
}