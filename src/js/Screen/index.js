import screenfull from 'screenfull'
import { isFirefox } from 'react-device-detect'

export function enterFullScreen() {
	document.getElementById('top-menu').style.display = 'none'
	screenfull.request()
}

export function toggleFullScreen(){
	screenfull.toggle()
}

export function changeFullScreen() {
	screenfull.on('change', () => {
		if(isFirefox){
			if (!window.screenTop && !window.screenY) {
				console.log('change 1')
				document.getElementById('top-menu').style.display = 'none'
			} else {
				console.log('change 2')
				document.getElementById('top-menu').style.display = ''
			}
		}else{
			if (!window.screenTop && !window.screenY) {
				console.log('change 1')
				document.getElementById('top-menu').style.display = ''
			} else {
				console.log('change 2')
				document.getElementById('top-menu').style.display = 'none'
			}
		}
	})
}

export function isFullScreenElement() {
	if (screenfull.isFullscreen) {
		return true
	}
		
	return false
}

export function exitFullScreen() {
	if(isFullScreenElement()){
		document.getElementById('top-menu').style.display = ''
		screenfull.exit()
	}
}


export default screenfull