import React from 'react'
import { useAxios } from '../../hooks/useAxios'
// import { getSpotlight, getSpotlight2 } from '../../services/getSpotlight'
import { LazyImage } from '../Image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
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
	const { data } = useAxios('/sl/leon/home_spotlight')

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
		swipeToSlide: true,
		prevArrow: <SamplePrevArrow />,
		nextArrow: <SampleNextArrow />,
	}

	return (
		<div className="spotlight-wrapper">
			{data.length > 0 && (
				<Slider {...settings}>
					{data.map(({ Registro, ImgLandscape }, index) => {
						return (
							<div key={Registro} style={{ width: '100%' }}>
								<LazyImage
									img={ImgLandscape}
									alt={`spotlight-image-${index}`}
									type="webp"
									recoverType="png"
								/>
							</div>
						)
					})}
				</Slider>
			)}
		</div>
	)
}

// const [loading, setLoading] = useState(true)
// const [data, setData] = useState([])

// useEffect(() => {
//     const requestSpotlight = async () => {
//         try {
//             setLoading(true)
//             const response = await getSpotlight2()
//             console.log(response)
//             setData(response)
//             setLoading(false)
//         } catch (e) {
//             console.log('No se pudo obtener la información.')
//         }
//     }

//     requestSpotlight()
// }, [])
