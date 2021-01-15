export function createUrlString(string) {
      let href = string.toLowerCase()
      href = href.replace(/ /g, '')

      return href
}