import {
	RouterMount,
	createRouter
} from 'uni-simple-router';
import store from "@/store";

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	//配置别名，方便识别
	routes: [
		{
			path:'/pages/my/my',
			name:'my'
		},
		{
			path:'/pages/my/account',
			name:'account'
		},
		{
			path:'/pages/my/collect',
			name:'collect'
		},
		{
			path:'/pages/my/info',
			name:'info'
		},
		{
			path:'/pages/my/person',
			name:'person'
		},
		{
			path:'/pages/my/setting',
			name:'setting'
		},
		{
			path:'/pages/my/thirdBind',
			name:'thirdBind'
		},
		{
			path:'/pages/activity/index',
			name:'activity'
		},
		{
			path:'/pages/activity/addactivity',
			name:'addactivity'
		},
		{
			path:'/pages/dynamic/index',
			aliasPath:'/',
			name:'dynamic'
		},
		{
			path:'/pages/dynamic/dynamicdetail',
			name:'dynamicdetail'
		},
		{
			path:'/pages/dynamic/publicdynamic',
			name:'publicdynamic'
		},
		{
			path: '/pages/dynamic/public',
			name: 'public'
		},
		{
			path:'/pages/dynamic/search',
			name:'search'
		},
		{
			path:'/pages/login/index',
			name:'login'
		},
		{
			path:'/pages/login/index2',
			name:'login2'
		},
		{
			path:'/pages/ride/finish',
			name:'finish'
		},
		{
			path:'/pages/ride/run',
			name:'run'
		},
		{
			path:'/pages/ride/prepare',
			name:'prepare'
		},
		
	]
});
const needTokenPages = [
	'my','account','collect','info','person','setting','thirdBing'
]
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	if(needTokenPages.indexOf(to.name) != -1 && to.name != 'login'){
		let token = store.state.vuex_token
		if(token === null || token === '' || typeof token === 'undefined'){
			uni.showToast({
				title:'asdasd',
				duration:20000
			})
			next({
				path:'/pages/login/index',
				NAVTYPE:'replace'
			})
		}
	}
	next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
})

export {
	router,
	RouterMount
}
