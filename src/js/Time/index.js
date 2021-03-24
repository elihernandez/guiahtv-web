const moment = require('moment')

export function getEventTime(inicio, fin) {
	// var resolvedOptions = Intl.DateTimeFormat().resolvedOptions();
	// var timezone = resolvedOptions.timeZone;
	var d = moment(inicio)

	var hh = moment(d).hours()
	var m = moment(d).minutes()
	var s = moment(d).seconds()
	var dd = ' AM'
	var h = hh

	if (h >= 12) {
		h = hh - 12
		dd = ' PM'
	}
	if (h == 0) {
		h = 12
	}

	// h = h < 10 ? "0" + h : h;

	m = m < 10 ? '0' + m : m

	s = s < 10 ? '0' + s : s

	var StartTime = h + ':' + m + dd

	var d = moment(fin)
	var hh = moment(d).hours()
	var m = moment(d).minutes()
	var s = moment(d).seconds()
	var dd = ' AM'
	var h = hh

	if (h >= 12) {
		h = hh - 12
		dd = ' PM'
	}
	if (h == 0) {
		h = 12
	}

	// h = h < 10 ? "0" + h : h;

	m = m < 10 ? '0' + m : m

	s = s < 10 ? '0' + s : s

	var EndTime = h + ':' + m + dd

	return `${StartTime} - ${EndTime}`
}

export function isLive(inicio, fin){
	let startDate = moment(inicio)
	let endDate = moment(fin)

	if(moment().isSameOrAfter(startDate) && moment().isSameOrBefore(endDate)){
		return true
	}

	return false
}

export function timerEvent(Inicio, Fin){
	var startTime = moment(Inicio)
	var actualTime = moment()
	var h = startTime.diff(actualTime, 'hours')
	var minutes = startTime.diff(actualTime, 'minutes')
	var m = minutes - (h * 60)

	if(h == 0 && m == 0){
		var time = 'Un momento'
	}else{
		if(h > 0){
			if(m > 0){
				if(h == 1){
					var time = h+' hora y '+m+' minutos'
				}else{
					var time = h+' horas y '+m+' minutos'
				}
                        
			}else{
				var time = h+' horas'
			}
		}else{
			var time = m+' minutos'
		}
	}
     
	return time
}

export function getProgressTimeEvent(Inicio, Fin){
	var startTime = moment(Inicio)
	var endTime = moment(Fin)
	var duration = endTime.diff(startTime, 'm')
	var actualTime = moment()
	var position = actualTime.diff(startTime, 'm')
	var time = ((position * 100) / duration)+'%'
	return time
}

export function getUtcOffsetLocal(){
	let utcOffsetLocal = 'UTC'+(moment().utcOffset()/60)
  
	return utcOffsetLocal
}

export function getProgressMovie(ResumePos, Length){
	let position = ResumePos / 1000
	let duration = (Length).replace(' min', '')
	duration = parseInt(duration, 10) * 60
	let time = (position * 100) / duration

	return time
}

function updateData(movieId, data, positionVideoMil){
	data.map(({cmData}, indexC) => {
		cmData.map(({Registro}, indexM) => {
			if(movieId == Registro){
				data[indexC].cmData[indexM].ResumePos = positionVideoMil
			}
		})
	})

	return data
}

export function setProgressMovie(currentTime, movie, data, dispatch){
	const movieId = movie.Registro
	let positionVideoMil = Math.round(currentTime * 1000)
	dispatch({type: 'setData', payload: updateData(movieId, data, positionVideoMil)})
}