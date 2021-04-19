export function validateSuscription(response, dispatch){
	let data = response
	let suscriptionStatus

	if(response.suscriptionStatus){
		suscriptionStatus = response.suscriptionStatus
	}else{
		suscriptionStatus = response[0].SuscriptionStatus
	}

	switch(suscriptionStatus) {
	case 0:
		// Suscripción expirada
		// setCookie('memclid', "", { path: '/' })
		// location.reload()
		dispatch({ type: 'setSuscriptionStatus', payload: suscriptionStatus})
		data = 'error'
		break
	case 1:
		// Suscripción válida
		dispatch({ type: 'setSuscriptionStatus', payload: suscriptionStatus})
		data = response     
		break
	case 2:
		// Suscripción periodo de gracia
		dispatch({ type: 'setSuscriptionStatus', payload: suscriptionStatus})
		data = response
		break
	case 3:
		// Suscripción gratuita
		dispatch({ type: 'setSuscriptionStatus', payload: suscriptionStatus})
		data = response
		break
	case 4:
		// Sesión no válida
		// setCookie('memclid', "", { path: '/' })
		// location.reload()
		dispatch({ type: 'setSuscriptionStatus', payload: suscriptionStatus})
		dispatch({ type: 'setErrorAuth', payload: 'Ocurrió un problema, vuelve a iniciar sesión'})
		break
	default:
		data = response
		break
	}

	return data
}