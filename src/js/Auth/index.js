export function isAuth(credentials){
	if(credentials.memclid){
		return true
	}

	return false
}

export function isSuscribed(credentials){
	if(credentials.susmes && parseInt(credentials.susmes) !== 1){
		return false
	}

	return true
}