import React, { useEffect, useState } from 'react'
import { getSpotlight } from '../../services/getSpotlight'
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
        <div
            className={className}
            onClick={onClick}
        >
            <button><i className="fas fa-angle-left"></i></button>
        </div>
    )
}

function SampleNextArrow(props) {
    const { className, onClick } = props

    return (
        <div
            className={className}
            onClick={onClick}
        >
            <button><i className="fas fa-angle-right"></i></button>
        </div>
    )
}


export function Spotlight() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)

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
                const response = await getSpotlight()
                if (!response.length) throw new Error('No se pudo obtener la información.')
                setData(response)
                setLoading(false)
            } catch (e) {
                console.log(e)
            }
        }

        requestSpotlight()
    }, [])

    return (
        <div className="spotlight-wrapper">
            {data &&
                <Slider {...settings}>
                    {
                        data.map(({ Registro, ImgLandscape }, index) =>
                            <div key={Registro} style={{ width: '100%' }}>
                                <LazyImage img={ImgLandscape} alt={`spotlight-image-${index}`} type="webp" recoverType="png" />
                            </div>
                        )
                    }
                </Slider>
            }
        </div>
    )
}