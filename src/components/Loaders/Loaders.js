import React from 'react'
import './styles.css'

function LoaderSpinnerBlue(){
    return (
        <div className="section-content">
            <div className="loader-spinner blue">
                <div className="spinner"></div>
            </div>
        </div>
    )
}

function LoaderSpinnerPurple(){
    return (
        <div className="section-content">
            <div className="loader-spinner purple">
                <div className="spinner"></div>
            </div>
        </div>
    )
}

function LoaderLogoBlue(){
    return (
        <div className="section-content">
            <div className="loader-logo">
                <img className="logo" src="../src/assets/images/logos/guiahtv/guiahtv-logo-blue.png"></img>
            </div>
        </div>
    )
}

function LoaderLogoSpinnerBlue(){
    return (
        <div className="section-content">
            <div className="loader-logo">
                <img className="logo" src="../src/assets/images/logos/guiahtv/guiahtv-logo-blue.png"></img>
            </div>
            <div className="loader-logo-spinner blue">
                <div className="spinner"></div>
            </div>
        </div>
    )
}

function LoaderLogoPurple(){
    return (
        <div className="section-content">
            <div className="loader-logo">
                <img className="logo" src="../src/assets/images/logos/guiahtv/guiahtv-logo-purple.png"></img>
            </div>
        </div>
    )
}

function LoaderLogoSpinnerPurple(){
    return (
        <div className="section-content">
            <div className="loader-logo">
                <img className="logo" src="../src/assets/images/logos/guiahtv/guiahtv-logo-purple.png"></img>
            </div>
            <div className="loader-logo-spinner purple">
                <div className="spinner"></div>
            </div>
        </div>
    )
}

export { 
    LoaderSpinnerBlue, 
    LoaderSpinnerPurple, 
    LoaderLogoBlue, 
    LoaderLogoPurple, 
    LoaderLogoSpinnerBlue, 
    LoaderLogoSpinnerPurple 
}


