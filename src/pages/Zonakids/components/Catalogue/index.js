import React, { Fragment } from 'react'
import { LoaderSpinnerMUI } from '../../../../components/Loader'
import { List } from '../../../../components/List'
import { CSSTransition } from 'react-transition-group'
import './styles.css'

export function Catalogue({ loading, data }) {

	return (
		<Fragment>
			<CSSTransition in={loading} timeout={300} classNames="fade" unmountOnExit>
				<LoaderSpinnerMUI />
			</CSSTransition>
			<CSSTransition in={!loading} timeout={300} classNames="fade" unmountOnExit>
				<div className="content-catalogue zonakids">
					{!loading && data &&
                                    data.map((category) => {
                                    	return <List key={category.category} data={category} listType="catalogue" />
                                    })
					}
				</div>
			</CSSTransition>
		</Fragment>
	)
}