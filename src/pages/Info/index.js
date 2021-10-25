import React from 'react'
import { Header } from './components/Header'
import { LazyImage } from '../../components/Image'
import Logo from '../../components/Logo/index'
import { PlansPrices } from './components/Plans'
import { Footer } from '../../components/Footer/index'
import backgroundHome from '../../assets/images/backgrounds/background-login.jpg'
import './styles.css'

export function InfoPage() {
	return (
		<div className="wrapper-main-home">
			<Header />
			<div className="main-section">
				<div className="wrapper-background">
					<LazyImage img={backgroundHome} alt='Background contenido de app' type="jpg" recoverType="jpg" />
				</div>
				<div className="gradient-overlay" />
				<div className="main-info">
					<Logo color="blue" size="md" />
					<h1 className="title-text large-title-1">El mejor contenido espiritual y de valores reunidos en una sola plataforma para toda la familia.</h1>
					<h2 className="subtitle-text title-3">Disfruta en donde quieras, cancela cuando quieras.</h2>
					<PlansPrices />
				</div>
			</div>
			<Footer />
		</div>
	)
}