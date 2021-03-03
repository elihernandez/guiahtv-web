import React, { useEffect, useState, useRef } from 'react'
import { getSpotlight } from '../../services/getSpotlight'
import { Slider, SliderContent, SliderIndicators } from '../Slider'
import { CSSTransition } from 'react-transition-group'
import './styles.css'

export function Spotlight(){
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)

    useEffect(() => {
        const requestSpotlight = async () => {
            try{
                setLoading(true)
                const response = await getSpotlight()
                if(!response.length) throw new Error('No se pudo obtener la información.')
                setData(response)
                setLoading(false)
            }catch(e){
                console.log(e)
            }
        }

        requestSpotlight()
    }, [])

    return (
        <div className="spotlight-wrapper">
            <CSSTransition in={!loading} timeout={100} classNames="fade">
                <div className="slider-spotlight">
                    {data &&
                        <Slider controls={true} mode="center">
                            <SliderContent data={data}/>
                            <SliderIndicators data={data}/>
                        </Slider>
                    }
                </div>
            </CSSTransition>
        </div>
    )
}