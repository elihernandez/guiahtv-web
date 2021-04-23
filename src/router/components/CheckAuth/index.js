import React from 'react'
import { Redirect } from 'react-router-dom' 
import { CheckDevice } from '../CheckDevice'
import { Main } from '../../../components/Main'

const CheckAuth = ({ children, credentials }) => {
	return (
		<CheckDevice>
			{	credentials.memclid
				? 	<Main>{children}</Main>
				: 	<Redirect to='/login' />
			}
		</CheckDevice>
	)
}

export { CheckAuth }