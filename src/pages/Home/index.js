import React, { useEffect } from 'react'
import { Spotlight } from '../../components/Spotlight/index'
import { ButtonsMenu } from '../../components/ButtonsMenu/index'
import './styles.css'

export function Home() {

    useEffect(() => {
        document.querySelector('.navbar-top-menu').style.opacity = 0
    }, [])

    return (
        <div className="section-content w-padding-top">
            <div className="wrapper-home">
                <Spotlight />
                <ButtonsMenu />
            </div>
        </div>
    )
}