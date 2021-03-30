import React, { useState, useContext, useEffect } from 'react'
import { CatalogueRadio } from '../../../../components/Catalogue'
import { LoaderSpinnerMUI } from '../../../../components/Loader'
import RadioContext from '../../../../context/RadioContext'
import { useRequest } from '../../../../hooks/useRequest'
import { CustomTabs } from '../../../../components/Tabs'
import { List } from '../../../../components/List'
import './styles.css'

export function Guide(){
	const { stateRadio, dispatchRadio } = useContext(RadioContext)
	const { dataRadio } = stateRadio 
	const { loading, data } = useRequest('radio', dispatchRadio, dataRadio)
	const [ info, setInfo ] = useState(null)
	// console.log(info.length)

	useEffect(() => {
		if(data){
			let dataTabs = []
			data.map((category, index) => {
				dataTabs.push(
					{
						title: category.category,
						content:  <List key={category.category} data={category} listType="radio" listStyle=""/>
					}
				)
			})

			setInfo(dataTabs)
		}
	}, [loading])

	return (
		<div className="guide-radio">
			{loading &&
                        <LoaderSpinnerMUI />
			}
			{info &&
                        <CustomTabs data={info} />
			}
		</div>
	)
}
// <CatalogueRadio requestApi="radio"/>

// <div className="list landscape">
//       <div className="list-content">
//             <div className="list-items">
//                   {
//                         category.cmData.map((item) => {
//                               console.log(item)
//                               return <div className="item-link">
//                                     <div className="item">
//                                           <div className="background-item">
//                                                 <img src={item.HDPosterUrlLandscape}></img>
//                                           </div>
//                                     </div>
//                               </div>
//                         })
//                   }
//             </div>
//       </div>
// </div>