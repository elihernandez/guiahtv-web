import React, { useEffect, useState } from 'react'
import { useAxios } from '../../hooks/useAxios'
import { getSpotlight, getSpotlight2 } from '../../services/getSpotlight'
// import { Slider, SliderContent, SliderIndicators } from '../Slider'
// import { CSSTransition } from 'react-transition-group'
import { LazyImage } from '../Image'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './styles.css'

function SamplePrevArrow(props) {
    const { className, onClick } = props

    return (
        <div className={className} onClick={onClick}>
            <button type="button" aria-label="angle-left">
                <i className="fas fa-angle-left" />
            </button>
        </div>
    )
}

function SampleNextArrow(props) {
    const { className, onClick } = props

    return (
        <div className={className} onClick={onClick}>
            <button type="button" aria-label="angle-right">
                <i className="fas fa-angle-right" />
            </button>
        </div>
    )
}

export function Spotlight() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    // const { data, error, onClickRequest } = useAxios('/sl/leon/home_spotlight')
    // console.log(data, error)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 6000,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false,
        pauseOnHover: true,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />
    }

    useEffect(() => {
        const requestSpotlight = async () => {
            try {
                setLoading(true)
                const response = await getSpotlight2()
                console.log(response) 
                setData(response)
                setLoading(false)
            } catch (e) {
                console.log('No se pudo obtener la información.')
            }
        }

        requestSpotlight()
    }, [])

    // if(error){
    //     return <button type="button" onClick={onClickRequest}>Volver a hacer request</button>
    // }

    return (
        <div className="spotlight-wrapper">
            <Slider {...settings}>
                {
                    data.map(({ Registro, ImgLandscape }, index) =>
                        <div key={Registro} style={{ width: '100%' }}>
                            <LazyImage img={ImgLandscape} alt={`spotlight-image-${index}`} type="webp" recoverType="png" />
                        </div>
                    )
                }
            </Slider>
        </div>
    )
}