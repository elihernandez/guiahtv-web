import React, { useState, useEffect } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { isPipSupported, togglePip } from '../../../../../../js/PictureInPicture'
import pipIcon from '../../../../../../assets/icons/noun_pip.png'

export function ButtonPip(){
	const [active, setActive] = useState(false)

	const handleClick = () => {
		togglePip(document.querySelector('video'))
	}

	const onEnterPip = () => {
		setActive(true)
	}
      
	const onExitPip = () => {
		setTimeout(() => {
			document.querySelector('video').play()
		}, 1000)
		setActive(false)
	}

	useEffect(() => {
		document.querySelector('video').addEventListener('enterpictureinpicture', onEnterPip, false)
		document.querySelector('video').addEventListener('leavepictureinpicture', onExitPip, false)
            
		return () => {
			document.querySelector('video').removeEventListener('enterpictureinpicture', onEnterPip, false)
			document.querySelector('video').removeEventListener('leavepictureinpicture', onExitPip, false)
		}
	}, [])

	if(!isPipSupported()){
		return null
	}

	return (
		<Tooltip title={active ? 'Reproducción en pestaña' : 'Reproducción en segundo plano'} placement="top-start">
			<span className="pip-icon icon" onClick={handleClick}>
				<img alt="Icono de pantalla en pantalla" src={pipIcon} />
			</span>
		</Tooltip>
	)
}