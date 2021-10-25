import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { SongMenu } from '../../../SongMenu'
import './styles.css'

export function Extras() {
	return (
		<div className="adds">
			<ul>
				{/* <li>
					<i className="far fa-heart"></i>
				</li> */}
				<Tooltip title="Más opciones">
					<li>
						<i className="fas fa-ellipsis-h" />
						{/* <SongMenu /> */}
					</li>
				</Tooltip>
			</ul>
		</div>
	)
}
