// import {fetch as fetchPolyfill} from 'whatwg-fetch'
import fetch from 'unfetch'

export default function getSpotlight(){
    return fetch(`https://lap55.com/json/api/sl/leon/home_spotlight`)
    .then(res => res.json())
    .then(data => {
      return data
    })
}