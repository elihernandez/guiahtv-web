export function imgSourceSetJpg(img, type){
      return img.replace(type, 'jpg')
}

export function imgSourceSetPng(img, type){
      return img.replace(type, 'png')
}

export function imgTypeReplace(img, typeReplace, newType){
      return img.replace(typeReplace, newType)
}