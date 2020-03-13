import axios from 'axios'
import Qs from 'qs'
var instance = axios.create({
	baseURL: window.GOAPI,
	changeOrigin: true,
	withCredentials: true,
	headers: {
	  'Content-Type': 'application/x-www-form-urlencoded'
	}
  })
export default{
    get:function(url,params){
        return new Promise((resolve, reject) => {
			instance.get(url, {
					params: params
				})
				.then(response => {
					resolve(response.data);
				})
				.catch(err => {
					reject(err)
				})
		})
    },
    post:function(url,data){
        for(var key in data) {
			if(typeof data[key] == "object") {
				data[key] = JSON.stringify(data[key]);
			}
		}
		return new Promise((resolve, reject) => {
			instance.post(url, Qs.stringify(data)).then(response => {
				resolve(response.data);
			}, err => {
				reject(err)
			});
		})
    }
}