
import axios from 'axios'
import { isEmptyArray } from '../Array'

const instance = axios.create({
	timeout: 10000
})

instance.interceptors.request.use(
	function (config) {
    	return config
	}, 
	function (error) {
		return Promise.reject(error)
	}
)

instance.interceptors.response.use(
	function (response) {
		if(response.status === 200){
			if(response?.length || response.data.length === 0 || isEmptyArray(response.data)){
				throw new Error(1)
			}
		}

		if(response.status >= 400 && response.status <= 499){
			throw new Error(2)
		}

		if(response.status >= 500 && response.status <= 599){
			throw new Error(3)
		}

		return response.data
	}, 
	function (e) {
		const { message } = e
		
		if(message === 'Network Error'){
			throw new Error(4)
		}

		if(message === 'Request aborted'){
			throw new Error(5)
		}

		if(message.includes('timeout')){
			throw new Error(6)
		}

		return Promise.reject(e)
	}
)

export default instance