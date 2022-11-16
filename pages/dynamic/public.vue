<template>
	<view>
		<u-action-sheet :list="list" :mask-close-able="false" @close="toBack()" @click="to" v-model="show">
		</u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				list: [{
					text: '发布商品',
					color: 'black',
					fontSize: 50,
					subText: '30s发布宝贝'
				}, {
					text: '发布动态',
					color: 'blue',
					fontSize: 50,
					subText: '让更多人看见你'
				}],
			}
		},
		onLoad() {
			this.show = true
		},
		onShow() {
			this.show = true
		},
		methods: {
			to(index) {
				if (index == 0) {
					this.toPublicDynamic()
				} else {
					this.toPublicAcDynamic()
				}
			},
			toBack() {
				uni.switchTab({
					url: './index'
				})
			},
			toPublicDynamic() {
				uni.redirectTo({
					url: './publicdynamic'
				})
			},
			toPublicAcDynamic() {
				uni.navigateTo({
					url: "/pages/activity/addactivity"
				})
			}
		}
	}
</script>

<style>
	.public-mask {
		width: 90%;
		height: 100%;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		background-color: #ffffff;
		padding-top: 200rpx;
		padding-bottom: 200rpx;
	}

	.public-mask .public-dynamic,
	.public-activity {
		width: 60%;
		height: 400rpx;
		border-radius: 129px;
		background: #f3f2f2;
		box-shadow: 22px 22px 44px #e0dfdf,
			-22px -22px 44px #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 50rpx;
	}
</style>
