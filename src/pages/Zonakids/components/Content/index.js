import React, { useContext, useEffect } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import VodContext from '../../../../context/VodContext'
import { VideoVod } from '../../../Video'
import { Catalogue } from '../Catalogue'
import { InfoContent } from '../../../../components/Catalogue'
import { LoaderSpinnerMUI } from '../../../../components/Loader'
import { useAxios } from '../../../../hooks/useAxios'

export function Content() {
	const { url } = useRouteMatch()
	const { stateVod, dispatchVod } = useContext(VodContext)
	const { loading, data, error } = useAxios('catalogue-zonakids')
	
	useEffect(() => {
		dispatchVod({ type: 'setData', payload: data })
	}, [data])

	return (
		<Switch>
			<Route exact path={`${url}`} >
				{loading &&
                    <LoaderSpinnerMUI />
				}
                        
				{!loading && data &&
                    <Catalogue data={data} error={error} />
				}
			</Route>
			<Route exact path={`${url}/:contentType/:contentId`} >
				<InfoContent />
			</Route>
			<Route exact path={`${url}/:contentType/:contentId/video`} >
				<VideoVod state={stateVod} dispatchVod={dispatchVod} />
			</Route>
		</Switch>
	)
}