import React, { useContext } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import VodContext from '../../../../context/VodContext'
import { useRequest } from '../../../../hooks/useRequest'
import { VideoVod } from '../../../Video'
import { Catalogue } from '../Catalogue'
import { InfoContent } from '../../../../components/Catalogue'
import { CSSTransition } from 'react-transition-group'
import { LoaderSpinnerMUI } from '../../../../components/Loader'

export function Content() {
	const { url } = useRouteMatch()
	const { stateVod, dispatchVod } = useContext(VodContext)
	const { dataVod } = stateVod
	const { loading, data } = useRequest('alacarta', dispatchVod, dataVod)
     
	return (
		<Switch>
			<Route exact path={`${url}`} >
				{loading &&
                    <LoaderSpinnerMUI />
				}
                        
				{!loading && data &&
                    <Catalogue data={data} />
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