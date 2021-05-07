import { replaceString, createStringParam } from '../../js/String'

function findTrack(data, collectionID, trackId){
	let dataTrack
	let listTrack
	
	data.map((category) => {
		if(createStringParam(category.title) == collectionID){
			category.tracks.map((track) => {
				if((track.regID == trackId) && !listTrack){
					dataTrack = track
					listTrack = category
				}
			})
		}
	})

	return { dataTrack, listTrack }
}

function resetTrack(audioRef){
	audioRef.current.currentTime = 0
}

function findIndexTrack(data, trackId){
	let indexTrack
	data.map((track, index) => {
		if(track.regID == trackId){
			indexTrack = index
		}
	})

	return indexTrack
}

function isLastTrack(data, indexTrack){
	const length = data.length - 1

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
	data.map((track, index) => {
		if(track.regID == trackId){
			if(isLastTrack(data, index)){
				nextTrack = data[0]
			}else{
				nextTrack = data[index + 1]
			}
		}
	})

	return nextTrack
}

function findPrevTrack(data, trackId){
	let prevTrack
	data.map((track, index) => {
		if(track.regID == trackId){
			if(isFirstTrack(index)){
				prevTrack = data[data.length - 1]
			}else{
				prevTrack = data[index - 1]
			}
		}
	})

	return prevTrack
}

function getNextTrack(listTrack, trackId){
	let isTheLastTrack = false
	const indexTrack = findIndexTrack(listTrack, trackId)
	const nextTrack = findNextTrack(listTrack, trackId)
	
	if(isLastTrack(listTrack, indexTrack)){
		isTheLastTrack = true
	}
	
	return { nextTrack, isTheLastTrack }
}

function getPrevTrack(listTrack, trackId){
	let isTheFirstTrack = false
	const indexTrack = findIndexTrack(listTrack, trackId)
	const prevTrack = findPrevTrack(listTrack, trackId)
	
	if(isFirstTrack(indexTrack)){
		isTheFirstTrack = true
	}
	
	return { prevTrack, isTheFirstTrack }
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
	if(listTrack.length === listRandom.length){
		return true
	}

	return false
}

function getRandomTrack(listTrack, track, listRandom){
	let numRandom
	let randomTrack
	const indexTrack = findIndexTrack(listTrack, track.regID)
    
	if(listIsEmpty(listRandom)){
		numRandom = getRandomNum(0, listTrack.length)
		while(numRandom === indexTrack){
			numRandom = getRandomNum(0, listTrack.length)
		}

		randomTrack = listTrack[numRandom]
	}else{
		if(listIsFull(listTrack, listRandom)){
			listRandom.splice(0, listRandom.length)
			numRandom = getRandomNum(0, listTrack.length)
			while(numRandom === indexTrack){
				numRandom = getRandomNum(0, listTrack.length)
			}

			randomTrack = listTrack[numRandom]
		}else{
			numRandom = getRandomNum(0, listTrack.length)
			let selectedTrack = listTrack[numRandom]
			while(listRandom.includes(selectedTrack)){
				numRandom = getRandomNum(0, listTrack.length)
				selectedTrack = listTrack[numRandom]
			}
			randomTrack = selectedTrack
		}
	}

	listRandom.push(randomTrack)
	// const url = getUrlString(match, track, randomTrack)
	console.log(randomTrack)
	return { randomTrack, listRandom }
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