import React, {useContext} from 'react'
import VodContext from '../../context/VodContext'
import LinearProgress from '@material-ui/core/LinearProgress'
import { getProgressMovie } from '../../js/Time'
import { useHistory, useRouteMatch } from 'react-router-dom'

export function ButtonResume ({data}) {
    const { Length, ResumePos } = data
    const { url } = useRouteMatch()
    const history = useHistory()
	const { stateVod, dispatchVod } = useContext(VodContext)

    const textButton = ResumePos == '' ? 'Ver ahora' : 'Reanudar'

    const handleClick = () => {
		history.push(`${url}/video`)
	}

    const handleClickBeginning = () => {
		stateVod.movieVod.ResumePos = 0 
		dispatchVod({ type: 'setMovie', payload: stateVod.movieVod })
		history.push(`${url}/video`)
	}

    return (
        <>
            <button type="button" className="button-watch" onClick={handleClick}>
                <i className="fas fa-play" />{textButton}
                <div className="progress-bar-content">
                    <LinearProgress variant="determinate" value={getProgressMovie(ResumePos, Length)} />
                </div>
            </button>
            {ResumePos != '' &&
            <button type="button" className="button-cw" onClick={handleClickBeginning}>
                Desde el comienzo
            </button>
            }
        </>
    )
}