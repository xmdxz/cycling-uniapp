<template>
	<view>
		<u-mask :show="show" @click="toBack()">
			<view class="public-mask">
				<view class="public-dynamic" @click.stop="toPublicDynamic()">
					发布商品
				</view>
				<view class="public-activity" @click.stop="toPublicAcDynamic()">
					发布帖子
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true
			}
		},
		methods: {
			toBack() {
				uni.switchTab({
					url: './index'
				})
			},
			toPublicDynamic(){
				uni.redirectTo({
					url: './publicdynamic'
				})
			},
			toPublicAcDynamic(){
				uni.navigateTo({
					url:"/pages/activity/addactivity"
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
