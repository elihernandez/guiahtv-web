import { replaceString } from '../../js/String'

function findTrack(data, trackId){
	let dataTrack
	let listTrack
	
	data.map((category) => {
		category.tracks.map((track) => {
			if((track.regID == trackId) && !listTrack){
				dataTrack = track
				listTrack = category
			}
		})
	})
	return { dataTrack, listTrack }
}

function resetTrack(audioRef){
	audioRef.current.currentTime = 0
}

function findIndexTrack(data, trackId){
	let indexTrack
	data.tracks.map((track, index) => {
		if(track.regID == trackId){
			indexTrack = index
		}
	})

	return indexTrack
}

function isLastTrack(data, indexTrack){
	const length = data.tracks.length - 1

	if(indexTrack == length){
		return true
	}

	return false
}

function isFirstTrack(indexTrack){
	if(indexTrack == 0){
		return true
	}

	return false
}

function findNextTrack(data, trackId){
	let nextTrack
	data.tracks.map((track, index) => {
		if(track.regID == trackId){
			if(isLastTrack(data, index)){
				nextTrack = data.tracks[0]
			}else{
				nextTrack = data.tracks[index + 1]
			}
		}
	})

	return nextTrack
}

function findPrevTrack(data, trackId){
	let prevTrack
	data.tracks.map((track, index) => {
		if(track.regID == trackId){
			if(isFirstTrack(index)){
				prevTrack = data.tracks[data.tracks.length - 1]
			}else{
				prevTrack = data.tracks[index - 1]
			}
		}
	})

	return prevTrack
}

function getNextTrack(listTrack, trackId, track, match){
	let url
	let isTheLastTrack = false
	const indexTrack = findIndexTrack(listTrack, trackId)
	
	if(!isLastTrack(listTrack, indexTrack)){
		const nextTrack = findNextTrack(listTrack, trackId)
		url = getUrlString(match, track, nextTrack)
	}else{
		const nextTrack = findNextTrack(listTrack, trackId)
		url = getUrlString(match, track, nextTrack)
		isTheLastTrack = true
	}
	
	return { url, isTheLastTrack }
}

function getPrevTrack(listTrack, trackId, track, match){
	let url
	let isTheFirstTrack = false
	const indexTrack = findIndexTrack(listTrack, trackId)
	
	if(!isFirstTrack(indexTrack)){
		const prevTrack = findPrevTrack(listTrack, trackId)
		url = getUrlString(match, track, prevTrack)
	}else{
		const prevTrack = findPrevTrack(listTrack, trackId)
		url = getUrlString(match, track, prevTrack)
		isTheFirstTrack = true
	}
	
	return { url, isTheFirstTrack }
}

function getUrlString(match, track, nextTrack){
	return replaceString(match.url, `${track.regID}`, nextTrack.regID)
}

function listIsEmpty(list){
	if(list.length === 0){
		return true
	}

	return false
}

function listIsFull(listTrack, listRandom){
	if(listTrack.tracks.length === listRandom.length){
		return true
	}

	return false
}

function getRandomTrack(listTrack, track, listRandom, match){
	let numRandom
	let randomTrack
	const indexTrack = findIndexTrack(listTrack, track.regID)
    
	if(listIsEmpty(listRandom)){
		numRandom = getRandomNum(0, listTrack.tracks.length)
		while(numRandom === indexTrack){
			numRandom = getRandomNum(0, listTrack.tracks.length)
		}

		randomTrack = listTrack.tracks[numRandom]
	}else{
		if(listIsFull(listTrack, listRandom)){
			listRandom.splice(0, listRandom.length)
			numRandom = getRandomNum(0, listTrack.tracks.length)
			while(numRandom === indexTrack){
				numRandom = getRandomNum(0, listTrack.tracks.length)
			}

			randomTrack = listTrack.tracks[numRandom]
		}else{
			numRandom = getRandomNum(0, listTrack.tracks.length)
			let selectedTrack = listTrack.tracks[numRandom]
			while(listRandom.includes(selectedTrack)){
				numRandom = getRandomNum(0, listTrack.tracks.length)
				selectedTrack = listTrack.tracks[numRandom]
			}
			randomTrack = selectedTrack
		}
	}

	listRandom.push(randomTrack)
	const url = getUrlString(match, track, randomTrack)

	return { url, listRandom }
}

function getRandomNum(min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}

export {
	resetTrack,
	findTrack,
	findIndexTrack,
	isLastTrack,
	findNextTrack,
	getNextTrack,
	isFirstTrack,
	findPrevTrack,
	getPrevTrack,
	getUrlString,
	listIsEmpty,
	getRandomTrack
}