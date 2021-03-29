import React from 'react'
import './styles.css'

function Item({data}){
	const {HDPosterUrlLandscape} = data

	return (
		<div className="chapter-item">
			<img className="" src={HDPosterUrlLandscape} />
		</div>
	)
}

export function Chapters({data}){

	return (
		<div className="chapters-wrapper">
			{
				data.cmData.map((chapter) => {
					return <Item key={chapter.Registro} data={chapter}/>
				})
			}
		</div>
	)
}