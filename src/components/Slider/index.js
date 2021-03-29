import React, { useEffect, useState, useRef } from 'react'
import { Carousel as SliderCenter } from '../../classes/carouselCenterClass'
import { CSSTransition } from 'react-transition-group'
import { imgSourceSetPng } from '../../js/Image'

function IndicatorsItem({ index }) {
	var className = index == 0 ? 'carousel-item active' : 'carousel-item no-active'

	return (
		<li className={className} tabIndex="-1"></li>
	)
}

export function SliderIndicators({ data }) {
	return (
		<div className="carousel-indicators">
			{data &&
                        <ul className="carousel-indicators-list">
                        	{data.map(({ Registro }, index) => <IndicatorsItem key={Registro} index={index} />)}
                        </ul>
			}
		</div>
	)
}

function ContentItem({ img, index }) {
	const className = index == 0 ? 'carousel-item active' : 'carousel-item no-active'
	const altImg = `spotlight-image-${index}`
	return (
		<li className={className}>
			<img className="carousel-image" src={img} alt={altImg} />
                  
		</li>
	)
	// <picture>
	//       <source srcSet={img} type="image/webp" />
	//       <source srcSet={imgSourceSetPng(img, 'webp')} type="image/png" />
	// </picture>
	// <LazyImage img={img} alt={altImg} type="webp" recoverType="png" />
}

export function SliderContent({ data }) {
	const [show, setShow] = useState(false)

	useEffect(() => {
		setShow(true)
	}, [])

	return (
		<CSSTransition in={show} timeout={300} classNames="fade">
			<div className="carousel-content">
				{data &&
                              <ul className="carousel-content-list">
                              	{data.map(({ Registro, ImgLandscape }, index) => <ContentItem key={Registro} img={ImgLandscape} index={index} />)}
                              </ul>
				}
			</div>
		</CSSTransition>
	)
}

export function Slider({ children, controls = false, mode = 'normal' }) {
	const sliderRef = useRef(null)

	useEffect(() => {
		if (mode == 'center') {
			sliderRef.current = new SliderCenter(sliderRef, 4000)
		}
	}, [])

	function handleClickControlPrev() {
		sliderRef.current.prev()
	}

	function handleClickControlNext() {
		sliderRef.current.next()
	}

	return (
		<div className="slider" ref={sliderRef}>
			{ children}
			{controls &&
                        <div>
                        	<div className="carousel-control-prev" onClick={handleClickControlPrev}>
                        		<i className="fas fa-angle-left"></i>
                        	</div>
                        	<div className="carousel-control-next" onClick={handleClickControlNext}>
                        		<i className="fas fa-angle-right"></i>
                        	</div>
                        </div>
			}
		</div>
	)
}