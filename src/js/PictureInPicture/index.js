const pip = require('picture-in-picture')

export function exitPip(element){
	if( pip.supported && pip.isActive(element)){
		pip.exit(element)
	}
}