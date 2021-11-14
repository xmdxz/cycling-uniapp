import {
	RouterMount,
	createRouter
} from 'uni-simple-router';

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
			path:'/pages/my/myPost',
			name:'myPost'
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
			path:'/pages/running/prepare',
			name:'prepare'
		},
		{
			path:'/pages/running/run',
			name:'run'
		},
		
	]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
})

export {
	router,
	RouterMount
}
