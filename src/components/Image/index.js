import React from 'react'
import { isIE, isSafari, isEdge, isFirefox, isChrome, isOpera, browserVersion } from 'react-device-detect'
import {imgTypeReplace} from '../../js/Image'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css'

export function LazyImage({img, alt, type, recoverType, imgError}){
	let src = img

	if(isIE){
		src = imgTypeReplace(img, type, recoverType)
	}

	if(isEdge && browserVersion < 18){
		src = imgTypeReplace(img, type, recoverType)
	}

	if(isFirefox && browserVersion < 65){
		src = imgTypeReplace(img, type, recoverType)
	}

	if(isChrome && browserVersion < 8){
		src = imgTypeReplace(img, type, recoverType)
	}

	if(isSafari && browserVersion <= 14){
		src = imgTypeReplace(img, type, recoverType)
	}

	if(isOpera && browserVersion < 11){
		src = imgTypeReplace(img, type, recoverType)
	}

	const onError = (e) => {
		e.preventDefault()
		e.target.src = imgError
	}

	return (
		<LazyLoadImage
			alt={alt}
			effect="opacity"
			src={src}
			placeholder={null}
			onError={onError}
		/>
	)
}