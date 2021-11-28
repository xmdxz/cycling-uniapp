import App from '../App.vue'

let filters = {
	appendUrlPrefix(url){
		return App.globalData.imageUrlPrefix + url
	}
}

export default filters