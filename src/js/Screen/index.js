export function exitFullScreen(){
      document.getElementById('top-menu').style.display = ""
      if (document.exitFullscreen) {
            document.exitFullscreen()
      } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen()
      }
}

export function enterFullScreen(){
      document.getElementById('top-menu').style.display = "none"
      if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
      } else if (!document.webkitRequestFullscreen) { /* Safari */
            document.documentElement.webkitRequestFullscreen()
      } else if (!document.msRequestFullscreen) { /* IE11 */
            document.documentElement.msRequestFullscreen()
      }
}

export function exitHandler(e){
      if (!window.screenTop && !window.screenY) {
            document.getElementById('top-menu').style.display = ""
      } else {
            document.getElementById('top-menu').style.display = "none"
      }
}

export function isFullScreenElement(){
      if (document.fullscreenElement) {
            return true
      } else if (document.webkitRequestFullscreen) { /* Safari */
            return true
      } else if (document.msRequestFullscreen) { /* IE11 */
            return true
      }
      
      return false
}