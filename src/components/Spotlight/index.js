import React, { useEffect, useState } from 'react'
import { getSpotlight } from '../../services/getSpotlight'
import CarouselClass from '../../classes/carouselCenterClass'
import './styles.css'

function IndicatorsItem({index}){
    var className = index == 0 ? 'carousel-item active' : 'carousel-item no-active'

    return (
        <li className={className} tabIndex="-1"></li>
    )
}

function CarouselIndicators({data}){
    return (
        <div className="carousel-indicators">
            <ul className="carousel-list">
                { data.map(({Registro}, index) => <IndicatorsItem key={Registro} index={index} /> ) }
            </ul>
        </div>
    )
}

function ContentItem({img, index}){
    const className = index == 0 ? 'carousel-item active' : 'carousel-item no-active'
    const altImg = `spotlight-image-${index}`
    return (
        <li className={className}>
            <img className="carousel-image" src={img} alt={altImg}/>
        </li> 
    )
}

function CarouselContent({data}){
    return(
        <div className="carousel-content">
            <ul className="carousel-list">
                { data.map(({Registro, ImgLandscape}, index) => <ContentItem key={Registro} img={ImgLandscape} index={index} /> ) }
            </ul>
        </div>
    )
}

export function Spotlight(){
    let carouselSpotlight
    const [spotlight, setSpotlight] = useState(null)

    useEffect(() => {
        const requestSpotlight = async () => {
            try{
                const response = await getSpotlight()
                if(!response.length) throw new Error('No se pudo obtener la información.')
                setSpotlight(response)
                carouselSpotlight = new CarouselClass('carousel-spotlight', 6500)
                carouselSpotlight.init()
            }catch(e){
                console.log(e)
            }
        }

        requestSpotlight()
    }, [])

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
            ?   <div className="spotlight">
                    <div className="carousel-spotlight">
                        <CarouselContent data={spotlight}/>
                        <CarouselIndicators data={spotlight}/>
                        <div className="carousel-control-prev" onClick={handleClickControlPrev}>
                            <i className="fas fa-angle-left"></i>
                        </div>
                        <div className="carousel-control-next" onClick={handleClickControlNext}>
                            <i className="fas fa-angle-right"></i>
                        </div>
                    </div> 
                </div>
            :  null
        }
        </>
    )
}