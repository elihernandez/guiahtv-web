import React from 'react'
import Logo from '../Logo'
import { Link } from '../Link'
import './styles.css'

function Links() {
	return (
		<ul className="footer-links">
			<li className="footer-link-item">
				<Link className="footer-link" href="https://guiah.tv/privacidad/">
					<span className="title-link caption">Política de privacidad</span>
				</Link>
			</li>
			<li className="footer-link-item">
				<Link className="footer-link" href="https://guiah.tv/terminos/">
					<span className="title-link caption">Términos de uso</span>
				</Link>
			</li>
			<li className="footer-link-item">
				<Link className="footer-link" href="https://guiah.tv/">
					<span className="title-link caption">Contáctanos</span>
				</Link>
			</li> 
		</ul>
	)
}

function SocialMedia() {
	return (
		<div className="social-media-wrapper">    
			<ul className="social-media-list">
				<li className="social-media-item">
					<Link className="social-media-link" href="https://www.facebook.com/GuiahTv">
						<i className="fab fa-facebook-f"></i>
					</Link>
				</li>
				<li className="social-media-item">
					<Link className="social-media-link" href="https://www.instagram.com/guiah.tv/">
						<i className="fab fa-instagram"></i>
					</Link>
				</li>
				<li className="social-media-item">
					<Link className="social-media-link" href="https://twitter.com/GuiahTv">
						<i className="fab fa-twitter"></i>
					</Link>
				</li>
				<li className="social-media-item">
					<Link className="social-media-link" href="https://www.youtube.com/channel/UCsMh8HRQ4-GsEE1BIGzVtIQ">
						<i className="fab fa-youtube"></i>
					</Link>
				</li>
			</ul>
		</div>
	)
}

export function Footer() {
	return (
		<div className="footer-app">
			<div className="footer-wrapper">
				<Logo color="blue" size="sm" />
				<h5 className="services-text body-3">
                              MÚSICA | TV EN VIVO | PELÍCULAS | CONCIERTOS | CLÍNICAS | SERIES |
                              ZONA KIDS | PPV Y MUCHO MÁS
				</h5>
				<Links />
				<SocialMedia />
			</div>
		</div>
	)
}