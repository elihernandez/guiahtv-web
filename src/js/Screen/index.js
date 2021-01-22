export function exitFullScreen(){
      if (document.exitFullscreen) {
            document.exitFullscreen()
      } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen()
      }

      document.querySelector('.top-menu').style.opacity = 1
}

export function enterFullScreen(){
      if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
      } else if (!document.webkitRequestFullscreen) { /* Safari */
            document.documentElement.webkitRequestFullscreen()
      } else if (!document.msRequestFullscreen) { /* IE11 */
            document.documentElement.msRequestFullscreen()
      }

      document.querySelector('.top-menu').style.opacity = 0
}