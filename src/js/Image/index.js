import { isIE, isSafari, isEdge, isFirefox, isChrome, isOpera, browserVersion } from "react-device-detect"

export function imgSourceSetJpg(img, type){
      return img.replace(type, 'jpg')
}

export function imgSourceSetPng(img, type){
      return img.replace(type, 'png')
}

export function imgTypeReplace(img, typeReplace, newType){
      return img.replace(typeReplace, newType)
}

export function isWebpBrowserCompatible(){
      if(isIE){
            return false
      }

      if(isEdge && browserVersion < 18){
            return false
      }

      if(isFirefox && browserVersion < 65){
            return false
      }

      if(isChrome && browserVersion < 8){
            return false
      }

      if(isSafari && browserVersion <= 14){
            return false
      }

      if(isOpera && browserVersion < 11){
            return false
      }
}