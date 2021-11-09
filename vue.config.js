// 配置路由拦截
const TransformPages = require('uni-read-pages')
const {
	webpack
} = new TransformPages()
module.exports = {
	// 配置路径别名
	configureWebpack: {
		plugins: [
			new webpack.DefinePlugin({
				ROUTES: webpack.DefinePlugin.runtimeValue(() => {
					const tfPages = new TransformPages({
						includes: ['path', 'name', 'aliasPath']
					});
					return JSON.stringify(tfPages.routes)
				}, true)
			})
		],
		devServer: {
			// 调试时允许内网穿透，让外网的人访问到本地调试的H5页面
			disableHostCheck: true
		}
	},
	//productionSourceMap: false,
}
