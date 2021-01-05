import React, { useEffect, useState } from 'react'
import getSpotlight from '../../services/getSpotlight'
import CarouselClass from '../../classes/carouselCenterClass'
import { LoaderSpinnerPurple } from '../Loaders/Loaders'
import 'dom-node-polyfills'
import './styles.css'

function Content({data, index}){
    var className = index == 0 ? 'active' : 'no-active'
    return (
        <li className={className}>
            <img src={data.ImgLandscape}/>
        </li> 
    )
}

function Indicator({data, index}){
    var className = index == 0 ? 'active' : 'no-active'

    return (
        <li className={className} tabIndex="-1"></li>
    )
}

export default function Spotlight(){
    const [spotlight, setSpotlight] = useState(null)
    var carouselSpotlight;

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500
    };

    useEffect(() => {
        getSpotlight().then(spotlight => {
            setSpotlight(spotlight)
            console.log(spotlight)
        })

    }, [])

    useEffect(() => {
        if(spotlight){
            carouselSpotlight = new CarouselClass('carousel-spotlight', 6500)
            carouselSpotlight.init()
        }
    })

    function handleClickControlPrev(){
        carouselSpotlight.prev()
    }
    
    function handleClickControlNext(){
        carouselSpotlight.next()
    }

    return (
        <>
        {
            spotlight 
            ?   <div className="carousel-spotlight">
                    <div className="carousel-content">
                        <ul>
                            {
                                spotlight.map((item, index) => (
                                    <Content key={item.Registro} data={item} index={index} />
                                ))
                            }
                        </ul>
                    </div>
                    <div className="carousel-indicators">
                        <ul>
                            {
                                spotlight.map((item, index) => (
                                    <Indicator key={item.Registro} data={item} index={index} />
                                ))
                            }
                        </ul>
                    </div>
                    <div className="carousel-control-prev" onClick={handleClickControlPrev}>
                        <i className="fas fa-angle-left"></i>
                    </div>
                    <div className="carousel-control-next" onClick={handleClickControlNext}>
                        <i className="fas fa-angle-right"></i>
                    </div>
                </div> 
            // ?   <LoaderSpinnerPurple/>
            :  ""
        }
        </>
    )
}