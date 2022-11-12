<script>
export default {
	// 此处globalData为了演示其作用，不是uView框架的一部分
	globalData: {
		windowWidth: 0,
		windowHeight: 0,
		imageUrlPrefix: 'http://localhost:10086/',
		uploadUrl:'http://localhost:10086/upload'
	},
	onShow() {
		//应用生命周期 onShow	当 uni-app 启动，或从后台进入前台显士
		let that = this;
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
		/* color-ui库 */
		@import "colorui/main.css";
		@import "colorui/icon.css";
		@import "colorui/animation.css";
	
		/*每个页面公共css */
		page {
			background-color: #FFFFFF;
			overflow-x: hidden;
			
		}
	
		.Messange-box {
			position: fixed;
			right: 0;
			top: 50%;
			background: #272822;
			width: 30px;
			height: 50px;
			z-index: 99999;
		}
</style>
