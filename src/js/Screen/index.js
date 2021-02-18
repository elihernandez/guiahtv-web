import screenfull from 'screenfull'

export function exitFullScreen() {
	document.getElementById('top-menu').style.display = ""
	// if (document.exitFullscreen) {
	// 	document.exitFullscreen()
	// } else if (document.webkitExitFullscreen) { /* Safari */
	// 	document.webkitExitFullscreen()
	// } else if (document.msExitFullscreen) { /* IE11 */
	// 	document.msExitFullscreen()
	// }
	screenfull.exit()
}

export function enterFullScreen() {
	document.getElementById('top-menu').style.display = "none"
	screenfull.request()
	// if (!document.fullscreenElement) {
	// 	document.documentElement.requestFullscreen()
	// } else if (!document.webkitRequestFullscreen) { /* Safari */
	// 	document.documentElement.webkitRequestFullscreen()
	// } else if (!document.msRequestFullscreen) { /* IE11 */
	// 	document.documentElement.msRequestFullscreen()
	// }
}

export function exitHandler() {
	if (!window.screenTop && !window.screenY) {
		document.getElementById('top-menu').style.display = ""
	} else {
		document.getElementById('top-menu').style.display = "none"
	}
}

export function isFullScreenElement() {
	if (screenfull.isFullscreen) {
		return true
	}

	return false
}