<script>
export default {
	// 此处globalData为了演示其作用，不是uView框架的一部分
	globalData: {
		windowWidth: 0,
		windowHeight: 0,
		imageUrlPrefix: 'http://r8mockxu2.bkt.clouddn.com/'
	},
	onShow() {
		//应用生命周期 onShow	当 uni-app 启动，或从后台进入前台显士
		let that = this;
		let token = that.$u.getToken();
		if(token == null || token == "" || token == '' || typeof token == "undefined"){
			return;
		}
		let userString = decodeURIComponent(escape(window.atob(token.split('.')[1])));
		let id = JSON.parse(userString).id;
		console.log(id)
		if (!that.$websocket.getters.open && id != -1) {
			that.$websocket.commit('setUid', id);
			that.$websocket.dispatch('webSocketInit');
		}
	},
	onLaunch() {
		let that = this;
		// // 获取本地存储的token
		// let token = uni.getStorageSync('lifeData').vuex_token;
		// if (token) {
		// 	//存在则关闭启动页进入首页
		// 	this.$Router.replace({name:'dynamic'})
		// } else {
		// 	//不存在则跳转至登录页
		// 	this.$Router.replaceAll({name:'login'})
		// }
		// 1.1.0版本之前关于http拦截器代码，已平滑移动到/common/http.interceptor.js中
		// 注意，需要在/main.js中实例化Vue之后引入如下(详见文档说明)：
		// import httpInterceptor from '@/common/http.interceptor.js'
		// Vue.use(httpInterceptor, app)
		// process.env.VUE_APP_PLATFORM 为通过js判断平台名称的方法，结果分别如下：
		/**
		 * h5，app-plus(nvue下也为app-plus)，mp-weixin，mp-alipay......
		 */
		uni.getSystemInfo({
			success(e) {
				that.globalData.windowHeight = e.windowHeight;
				that.globalData.windowWidth = e.windowWidth;
			}
		});
	}
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
@import 'common/demo.scss';
</style>
