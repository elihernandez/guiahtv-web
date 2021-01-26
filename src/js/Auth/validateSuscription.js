export function validateSuscription(response, dispatch){ 
      switch(response.data[0].SuscriptionStatus) {
            case 0:
                  // Suscripción expirada
                  // setCookie('memclid', "", { path: '/' })
                  // location.reload()
                  return "error"
                  break
            case 1:
                  // Suscripción válida
                  return response.data
                  break
            case 2:
                  // Suscripción periodo de gracia
                  return response.data
                  break
            case 3:
                  // Suscripción gratuita
                  return response.data
                  break
            case 4:
                  // Sesión no válida
                  // setCookie('memclid', "", { path: '/' })
                  // location.reload()
                  dispatch({ type: 'setErrorAuth', payload: 'Ocurrió un problema, vuelve a iniciar sesión'})
                  break
            default:
                  return response.data
                  break
      }
      // switch(response.data[0].SuscriptionStatus) {
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