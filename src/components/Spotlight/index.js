import React from 'react'
import { useAxios } from '../../hooks/useAxios'
import { LazyImage } from '../Image'
import { SlickSlider } from '../SlickCarousel'
import './styles.css'

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
	}

	return (
		<div className="spotlight-wrapper">
			{data.length > 0 && (
				<SlickSlider settings={settings}>
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
				</SlickSlider>
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