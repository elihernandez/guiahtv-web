import React from 'react'
import { Link } from '../../../../components/Link/index'
import { Button } from '../../../../components/Button/index'
import './styles.css'

export function PlansPrices(){
	return (
		<div className="plans-prices-wrapper">
			<div className="plans">
				<div className="card-plan price-month">
					<Link className="link-register" href="https://cuenta.guiah.tv/Login">
						<Button type="button" uppercase={true} color="gradient" classes="btn-register body-3">Pruébalo sin costo</Button>
					</Link>
				</div>
                        
			</div>
			<p>*7 días de prueba, cancela cuando quieras, acceso desde web, aplicaciones móviles y smart tv.</p>
		</div>
	)
}

// <h3 className="price-plan">MXN 89 <span>/mensual</span></h3>
// <div className="card-plan year-month">
//       <h3 className="price-plan">MXN 890 <span>/año</span></h3>
//       <Link className="link-register" href="https://guiah.tv/axs/registro">
//             <Button type="button" uppercase={true} color="primary" classes="btn-register body-2">Pruebalo sin costo</Button>
//       </Link>
// </div>