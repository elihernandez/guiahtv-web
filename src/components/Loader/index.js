import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import './styles.css'

export function LoaderSpinner({ color }) {
    const className = `loader-spinner ${color}`

    return (
        <div className="section-content">
            <div className={className}>
                <div className="spinner" />
            </div>
        </div>
    )
}

export function LoaderLogo({ color }) {
    const imgSrc = `../src/assets/images/logos/guiahtv/guiahtv-logo-${color}.png`

    return (
        <div className="section-content">
            <div className="loader-logo">
                <img className="logo" src={imgSrc} alt="guiahtv-logo" />
            </div>
        </div>
    )
}

export function LoaderLogoSpinner({ color }) {
    const imgSrc = `../src/assets/images/logos/guiahtv/guiahtv-logo-${color}.png`
    const className = `loader-logo-spinner ${color}`

    return (
        <div className="section-content">
            <div className="loader-logo">
                <img className="logo" src={imgSrc} alt="guiahtv-logo" />
            </div>
            <div className={className}>
                <div className="spinner" />
            </div>
        </div>
    )
}

export function LoaderSpinnerMUI({ text, placementText }) {
    const classText = text != undefined ? placementText : ""
    const classContent = placementText == "top" || "bottom" ? "column" : "row"

    return (
        <div className={`spinner-mui ${classContent}`}>
            <CircularProgress disableShrink />
            {text &&
                <p className="text-loading">{text}</p>
            }
        </div>
    )
}