export function createUrlString(string) {
      let href = string.toLowerCase()
      href = href.replace(/ /g, '')

      return href
}

export function shortString(string) {
      if (string.length > 80) {
            string = string.substring(0, 80)
            string = string + "..."
      }

      return string
}

export function limitString(string, limit){
      if (string.length > limit) {
            string = string.substring(0, limit)
            string = string + "..."
      }

      return string
}

export function isShortString(string) {
      if (string.length > 60) {
            return true
      }

      return false
}

export function replaceString(string, replace, newReplace) {
      console.log(string)
      let newString = ""
      newString = string.replace(",","+")
      return newString
}

export function capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isSerie(str) {
      if (str.includes('series')) {
            return true
      }

      return false
}

export function typeContent(str) {
      if (str.includes('series')) {
            return 'serie'
      } else {
            return 'pelicula'
      }
}