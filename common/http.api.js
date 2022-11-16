// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
// let uploadTokenUrl = '/utils/getUploadToken';
// let publicDynamicUrl = '/dynamic/publicDynamic'
// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	let publishGoods = (params = {}) => vm.$u.post("/goods/publish",params)
	//用户登录
	let userLogin = (params = {}) => vm.$u.post("/login/phone", params)
	
	let imagesList = (params = {}) => vm.$u.get("/index/images",params)
	
	let dynamicPage = (params = {}) => vm.$u.get("/dynamic/page",params)
	
	let publishDynamic = (params = {}) => vm.$u.post("/dynamic/publish",params)
	
	let noticeList = (params = {}) => vm.$u.get("/notice/list",params)
	
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
	//获取用户信息
	let getUserInfo = (params = {}) => vm.$u.get("/user/basicInfo", params)

	//更新信息
	let updateInfo = (params = {}) => vm.$u.post("/user/update", params)
	
	let insertChat = (params = {}) => vm.$u.post("/chat",params)
	
	let buy = (params = {}) => vm.$u.post("/chat/buy",params)	
	
	let chatList = (params = {}) => vm.$u.get("/chat/chatList/"+params.goodsId)
	
	let allChatList = (params = {}) => vm.$u.get("/chat/chatList",params)
	
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
		insertChat,
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
		noticeList,
		imagesList,
		getUserInfo,
		updateInfo,
		chatList,
		allChatList,
		buy
	};
}

export default {
	install,
}
