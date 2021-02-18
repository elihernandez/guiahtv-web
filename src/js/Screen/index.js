import screenfull from 'screenfull'

export function exitFullScreen() {
	document.getElementById('top-menu').style.display = ""
	screenfull.exit()
}

export function enterFullScreen() {
	document.getElementById('top-menu').style.display = "none"
	screenfull.request()
}

export function toggleFullScreen(){
	screenfull.toggle()
}

export function changeFullScreen() {
	screenfull.on('change', () => {
		if (!window.screenTop && !window.screenY) {
			document.getElementById('top-menu').style.display = ""
		} else {
			document.getElementById('top-menu').style.display = "none"
		}
	})
}

export function isFullScreenElement() {
	if (screenfull.isFullscreen) {
		return true
	}
		
	return false
}

export default screenfull