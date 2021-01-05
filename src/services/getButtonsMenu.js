import {fetch as fetchPolyfill} from 'whatwg-fetch'

export default function getButtonsMenu(){
    return fetchPolyfill(`https://lap55.com/json/api/cs/leon_home_bm`)
    .then(res => res.json())
    .then(data => {
      return data
    })
}