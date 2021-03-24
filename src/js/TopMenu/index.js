export function hideTopMenuNavbar(){
	if(document.querySelector('.navbar-top-menu')){
		document.querySelector('.navbar-top-menu').style.opacity = 0
		document.querySelector('.navbar-top-menu').style.display = 'none'
		document.querySelector('.top-menu').classList.remove('bggradient')
	}
}

export function showTopMenuNavbar(){
	if(document.querySelector('.navbar-top-menu')){
		document.querySelector('.navbar-top-menu').style.opacity = 1
		document.querySelector('.navbar-top-menu').style.display = ''
		document.querySelector('.top-menu').classList.add('bggradient')
	}
}

export function hideTopMenu(){
	if(document.querySelector('.top-menu')){
		document.querySelector('.top-menu').style.opacity = 0
		document.querySelector('.top-menu').style.display = 'none'
		document.querySelector('.top-menu').classList.remove('bggradient')
	}
}

export function showTopMenu(){
	if(document.querySelector('.top-menu')){
		document.querySelector('.top-menu').style.opacity = 1
		document.querySelector('.top-menu').style.display = ''
		document.querySelector('.top-menu').classList.add('bggradient')
	}
}