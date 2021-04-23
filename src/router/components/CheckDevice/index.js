import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom' 
import { isBrowser, isMobile } from 'react-device-detect'

const CheckDevice = ({ children }) => {
	return (
		<Fragment>
			{isBrowser &&
                children
			}
			{isMobile &&
                <Redirect to="/obtener-app" />
			}
		</Fragment>
	)
}

export { CheckDevice }