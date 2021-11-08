//定义统一请求url
const BASE_URL = 'http://localhost:5678'
//暴露一个myRequest方法，使用options接受传过来的参数
export const myRequest = (options) => {
	//异步封装接口，使用promise处理异步请求
	return new Promise((resolve,reject)=>{
		uni.request({
			url: BASE_URL + options.url, //接受请求的url
			method: options.method || 'GET', //接受请求的类型，如果不传默认为get
			data: options.data || {}, //接受请求的data
			header: options.header || {},
			success: (res)=>{
				if(res.data.code !== 200){
					return uni.showToast({
						title:res.data.msg
					})
				}
				resolve(res) //成功，将数据返回
			},
			fail: (err) => {
				uni.showToast({
					title: "请求接口失败"
				})
				reject(err)
			}
		})
	})
}