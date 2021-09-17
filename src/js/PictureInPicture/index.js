const pip = require('picture-in-picture')

export function exitPip(element){
	if( element && pip.supported && pip.isActive(element)){
		pip.exit(element)
	}
}

export function togglePip(element){
	if(pip.isActive(element)){
		pip.exit(element)
	}else{
		pip.request(element)
	}
}

export function isPipSupported(){
	if(pip.supported){
		return true
	}

	return false
}