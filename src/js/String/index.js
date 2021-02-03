export function createUrlString(string) {
      let href = string.toLowerCase()
      href = href.replace(/ /g, '')

      return href
}

export function shortString(string) {
      if (string.length > 60) {
            string = string.substring(0, 60)
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