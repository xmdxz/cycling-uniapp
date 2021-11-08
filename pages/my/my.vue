<template>
	<view>
		<view>
			<view class="img">
				<u-avatar :src="src" size="200" :show-sex="true" :show-level="true" @click="toPerson()"></u-avatar>
				<view class="username">向恶势力低头！</view>
				<view class="personnSign">这个人很懒，什么也没留下.....</view>
			</view>
			<u-gap height="20" bg-color="#e2e2e2"></u-gap>
			<u-grid :col="4">
				<u-grid-item>
					<view class="grid-text">0</view>
					<view class="grid-text">获赞</view>
				</u-grid-item>
				<u-grid-item @click="info(1)">
					<view class="grid-text">0</view>
					<view class="grid-text">关注</view>
				</u-grid-item>
				<u-grid-item @click="info(2)">
					<view class="grid-text">0</view>
					<view class="grid-text">粉丝</view>
				</u-grid-item>
				<u-grid-item>
					<view class="grid-text">0</view>
					<view class="grid-text">访客</view>
				</u-grid-item>
			</u-grid>
			<u-gap height="20" bg-color="#e2e2e2"></u-gap>
			<u-cell-group>
				<!-- <u-cell-item icon="level" title="成就"></u-cell-item>
				<u-cell-item icon="order" title="路书"></u-cell-item> -->
				<u-cell-item icon="star" title="收藏" @click="toOther('collect')"></u-cell-item>
				<u-cell-item icon="list" title="我发布的" @click="toOther('myPost')"></u-cell-item>
				<!-- <u-cell-item icon="car" title="车队"></u-cell-item> -->
				<u-cell-item icon="account" title="个人与设置" @click="toSetting()"></u-cell-item>
			</u-cell-group>
		</view>
		<u-tabbar v-model="tabBarCurrent" :list="tabBarList" :mid-button="true" mid-button-size="90"></u-tabbar>
	</view>
</template>

<script>
import store from '../../store/index.js';
export default {
	data() {
		return {
			src: '../../static/img/1.jpg',
			tabBarCurrent: 0,
			tabBarList: []
		};
	},
	onLoad(){
		this.tabBarList = store.state.vuex_tabbar
	},
	methods: {
		toOther(e){
			uni.navigateTo({
				url: './' + e
			})
		},
		toSetting() {
			uni.navigateTo({
				url: './setting'
			});
		},
		toPerson: function() {
			uni.navigateTo({
				url: './person'
			});
			// let that = this
			// uni.chooseImage({
			// 	count: 1,
			// 	sizeType: 'original',
			// 	success(e){
			// 		/**
			// 		 * 后端写好后，这里写上传
			// 		 * uni.uploadFile({
			// 			url:'路径',
			// 			name:'想当于表单name',
			// 			fileType:'image',
			// 			filePath:e.tempFilePaths[0],
			// 			header:{
			// 				//用户唯一标识。
			// 			}
			// 			success(e){

			// 			}
			// 		})
			// 		 */
			// 		console.log(e.tempFilePaths[0])
			// 		that.src = e.tempFilePaths[0]
			// 	}
			// })
		},
		info: function(e) {
			uni.navigateTo({
				url: './info?type=' + e
			});
		}
	}
};
</script>

<style scoped>
.img {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	flex-direction: column;
	margin: 50rpx auto;
}
.username {
	font-size: larger;
	font-weight: bold;
	margin-top: 10rpx;
	margin-left: 40rpx;
}
.personnSign{
	font-size: small;
	margin: 10rpx auto;
	margin-bottom: 0;
	color: #909399;
}
</style>
