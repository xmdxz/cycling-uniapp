<template>
	<view>
		
		<u-cell-group title="账户与安全" >
			<u-cell-item title="第三方绑定" @click="toSetting(0)"  ></u-cell-item>
			<u-cell-item title="账户安全" @click="toSetting(1)"></u-cell-item>
		</u-cell-group>
		<u-gap height="10" bg-color="#e2e2e2"></u-gap>
		<u-cell-group title="通用">
			<!-- <u-cell-item title="离线地图下载"></u-cell-item> -->
			<u-cell-item title="通知"></u-cell-item>
		</u-cell-group>
		<u-gap height="10" bg-color="#e2e2e2"></u-gap>
		<u-cell-group title="其他">
			<u-cell-item title="关于"></u-cell-item>
			<u-cell-item title="反馈"></u-cell-item>
		</u-cell-group>
		<view id="blank"></view>
		<view class="logout"><u-button size="default" shape="circle" @click="logOut()" >退出登录</u-button></view>
	</view> 
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			logOut(){
				uni.showModal({
					title:"您确定退出登录?",
					success(res) {
						if(res.confirm){
							//退出登录逻辑
						}
					}
				})
			},
			toSetting(type){
				let url = ""
				console.log(type)
				switch(type){
					case 0:
						url = "./thirdBind"
						break;
					case 1:
						url = "./account"
						break;
				}
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style scoped>
#blank{
	height: 50rpx;
	margin: 20rpx;
}
.logout {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	margin: 50rpx auto;
	
}
</style>
