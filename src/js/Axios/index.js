
import axios from 'axios'
import config from '../../../config.js'
import { isEmptyArray } from '../Array'

const instance = axios.create({
	baseURL: config.API_URL,
	timeout: 10000
})

instance.interceptors.response.use(
	function (response) {
		if(response.status === 200){
			if(isEmptyArray(response.data)){
				throw new Error()
			}

			return response.data
		}
	}, 
	function () {
		throw new Error()
	}
)


export default instance