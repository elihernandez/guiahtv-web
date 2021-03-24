export function validateSuscription(response, dispatch){ 
	switch(response[0].SuscriptionStatus) {
	case 0:
		// Suscripción expirada
		// setCookie('memclid', "", { path: '/' })
		// location.reload()
		dispatch({ type: 'setSuscriptionStatus', payload: response[0].SuscriptionStatus})
		return 'error'
		break
	case 1:
		// Suscripción válida
		dispatch({ type: 'setSuscriptionStatus', payload: response[0].SuscriptionStatus})
		return response
                  
		break
	case 2:
		// Suscripción periodo de gracia
		dispatch({ type: 'setSuscriptionStatus', payload: response[0].SuscriptionStatus})
		return response
		break
	case 3:
		// Suscripción gratuita
		dispatch({ type: 'setSuscriptionStatus', payload: response[0].SuscriptionStatus})
		return response
		break
	case 4:
		// Sesión no válida
		// setCookie('memclid', "", { path: '/' })
		// location.reload()
		dispatch({ type: 'setSuscriptionStatus', payload: response[0].SuscriptionStatus})
		dispatch({ type: 'setErrorAuth', payload: 'Ocurrió un problema, vuelve a iniciar sesión'})
		break
	default:
		return response
		break
	}
	// switch(response[0].SuscriptionStatus) {
	//       case 0:
	//             // Suscripción expirada
	//             setCookie('memclid', "", { path: '/' })
	//             location.reload()
	//             break
	//       case 1:
	//             // Suscripción válida
	//             setData(response.data)
	//             setLoading(false)
	//             break
	//       case 2:
	//             // Suscripción periodo de gracia
	//             setData(response.data)
	//             setLoading(false)
	//             break
	//       case 3:
	//             // Suscripción gratuita
	//             setData(response.data)
	//             setLoading(false)
	//             break
	//       case 4:
	//             // Sesión no válida
	//             setCookie('memclid', "", { path: '/' })
	//             location.reload()
	//             break
	//       default:
	//             setData(response.data)
	//             setLoading(false)
	//             break
	// }
}