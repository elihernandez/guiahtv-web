

function validateLogin(){
    

	// Cookies.set('memclid', response.SuscriberID, { expires: 7 })
	// Cookies.set('memclem', username, { expires: 7 })

	if(typeof(Storage) !== undefined) {
		setCookie('memclid', 'Eliezer', { path: '/' })
		setCookie('memclem', '1234', { path: '/' })
		return 
		// localStorage.setItem('suscriberId', 'Eliezer')
		// localStorage.setItem('suscriberEmail', '1234')
		// const suscriberId = localStorage.getItem('suscriberId');
		// const suscriberEmail = localStorage.getItem('suscriberEmail');

		// if(suscriberId){

		// // getInfoTv();
		// // addUserInformation();
		// // return true;
		//  return [suscriberId, suscriberEmail]
		// }
	}
    
	return false
}

export { validateLogin }