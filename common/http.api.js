// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
// let uploadTokenUrl = '/utils/getUploadToken';
// let publicDynamicUrl = '/dynamic/publicDynamic'
// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	let publishGoods = (params = {}) => vm.$u.post("/goods/publish",params)
	//用户登录
	let userLogin = (params = {}) => vm.$u.post("/login/phone", params)
	
	let dynamicPage = (params = {}) => vm.$u.get("/dynamic/page",params)
	
	let publishDynamic = (params = {}) => vm.$u.post("/dynamic/publish",params)
	
	let isCollect = (params = {}) => vm.$u.get("/user/isCollect",params)
	
	let collectSave = (params = {}) => vm.$u.get("/user/save/collect",params)
	
	let cancelCollect = (params = {}) => vm.$u.get("/user/cancel/collect",params)
	
	let collectDySave = (params = {}) => vm.$u.get("/user/save/dyCollect",params)
	
	let cancelDyCollect = (params = {}) => vm.$u.get("/user/cancel/dyCollect",params)
	
	let publishPrice = (params = {}) => vm.$u.get("/user/publishPrice",params)
	
	let publishComment = (params = {}) => vm.$u.post("/user/comment",params)
	
	let goodsDetail = (params = {}) => vm.$u.get("/goods/detail",params)
	
	let commentList = (params = {}) => vm.$u.get("/comment",params)
	
	let priceList  = (params = {}) => vm.$u.get("/publishPrice",params)
	
	let goodsPage = (params = {}) => vm.$u.get("/goods/page",params)
	
	let deleteData = (params = {}) => vm.$u.get("/user/delete",params)
	
	let upload = (params = {}) => vm.$u.post("/upload",params)
	//用户登录
	let registry = (params = {}) => vm.$u.post("/login/registry", params)
	
	let dynamicCollect = (params = {}) => vm.$u.get("/user/dynamic",params)
	//用户信息
	let userInfo = (params = {}) => vm.$u.get("/user/data", params)
	
	let collect = (params = {}) => vm.$u.get("/user/collect",params)
	
	let userOrder = (params = {}) => vm.$u.get("/user/order",params)
	
	let userPublish = (params = {}) => vm.$u.get("/user/publish",params)
	//获取验证码
	let getCode = (params = {}) => vm.$u.get("/code?phone="+params, null)
	// 动态相关Api
	// 获取七牛云上传token
	let getUploadToken = (params = {}) => vm.$u.get(uploadTokenUrl, params)

	// 发布动态
	let publicDynamic = (params = {}) => vm.$u.post(publicDynamicUrl,params)
	
	// 获取推荐动态
	let getDynamicByRecommend = (params = {}) => vm.$u.post('/dynamic/getDynamicRecommend',params)

	// 获取关注的人的动态
	let getDynamicByAttention = (params = {}) => vm.$u.post('/dynamic/getDynamicByAttention',params)
	
	// 根据动态id获取动态详情
	let getDynamicById = (params = {}) => vm.$u.post('/dynamic/getDynaminById',params)
	
	// 根据动态内容搜索
	let getDynamicByContent = (params = {}) => vm.$u.post('/dynamic/getDynamicByContent',params)

	// 获取所有话题
	let getAllTopic = (params = {}) => vm.$u.get('/topic/findAll',params)
	
	// 搜索话题
	let getTopicByName = (params = {}) => vm.$u.get('/topic/findByTopicName',params)

	//获取用户信息
	let getUserInfo = (params = {}) => vm.$u.get("/user/basicInfo", params)

	//获取我的界面的用户信息
	let getOwnInfo = (params = {}) => vm.$u.get("/user/getOwnInfo", null)

	//获取各类统计数
	let getRelatedCount = (params = {}) => vm.$u.get("/user/getRelatedCount", null)

	//更新信息
	let updateInfo = (params = {}) => vm.$u.post("/user/update", params)

	//获取粉丝
	let getFansOrFocusedAndSimple = (params = {}) => vm.$u.get(params.url, {
		minId: params.minId,
		num: params.num
	})
	
	let getChatHistory = (params = {}) => vm.$u.get("/user/getChatHistory",params);

	let cancelFocused = (params = {}) => vm.$u.delete("/user/cancelFocused?" + putAndDeleteParams(params), null)

	let focus = (params = {}) => vm.$u.put("/user/focus?focusedUserId=" + params, null)
	
	//用户注销
	let accountCancellation = (params = {}) => vm.$u.delete("/user/accountCancellation",params)
	let putAndDeleteParams = (params) => { 
		let result = ""
		for(let i in params){
			result += "&" + i + "=" + params[i]
		}
		return result
	}
	
	//获取我的发布
	let getPublish = (params = {}) => vm.$u.get("/user/getPublish",params)
	
	//获取我的收藏
	let getCollect = (params = {}) => vm.$u.get("/user/getCollect",params)
	
	//获取本次骑行的路线数组
	let getRideRoute = (params = {}) => vm.$u.get("/ride/route",params)
	
	//保存骑行记录
	let rideFinish = (params = {}) => vm.$u.post("/ride/finish",params)
	
	let getAvatar = (params = {}) => vm.$u.get("/user/getAvatar",params)
	
	let getLimitActivity = (params = {}) => vm.$u.get("/active/getLimitActivity",params)
	
	let seckill = (params = {}) => vm.$u.get("/active/secKill",params)

	let getResult = (params = {}) => vm.$u.get("/active/getResult",params)
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		userLogin,
		registry,
		userInfo,
		collect,
		dynamicCollect,
		upload,
		userOrder,
		userPublish,
		deleteData,
		goodsPage,
		goodsDetail,
		commentList,
		collectSave,
		cancelCollect,
		publishPrice,
		isCollect,
		publishComment,
		priceList,
		publishGoods,
		publishDynamic,
		dynamicPage,
		cancelDyCollect,
		collectDySave,
		
		
		
		
		getCode,
		getUploadToken,
		publicDynamic,
		getAllTopic,
		getTopicByName,
		getDynamicByRecommend,
		getDynamicByAttention,
		getDynamicById,
		getDynamicByContent,
		getUserInfo,
		getOwnInfo,
		getRelatedCount,
		updateInfo,
		getFansOrFocusedAndSimple,
		cancelFocused,
		focus,
		getPublish,
		getCollect,
		accountCancellation,
		getRideRoute,
		rideFinish,
		getChatHistory,
		getAvatar,
		getLimitActivity,
		seckill,
		getResult
	};
}

export default {
	install,
}
