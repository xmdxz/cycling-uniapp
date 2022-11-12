<template>
	<view style="margin-top: 30rpx">
		<u-empty text="收藏帖子列表为空" :show="data.length == 0" mode="list"></u-empty>
		<customWaterfallsFlow ref="waterfallsFlowRef" @imageClick="showImage" :value="show">
			<!-- #ifdef MP-WEIXIN -->
			<view class="item" v-for="(item,index) in data" :key="index" slot="slot{{index}}">
				<view class="content">
					<view class="text">{{ item.mark || ''}}</view>
					<view class="user">
						<u-avatar class="avatar" :src="!item.userInfo.avatar ?'../../static/img/noLoginAvatar.png':filters['appendUrlPrefix'](item.userInfo.avatar)" size="45"></u-avatar>
						<view class="shop-name">{{item.userInfo.username}}</view>
					</view>
				</view>
				<!--      <view class="desc">{{ item.desc }}</view>-->
			</view>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<template v-slot:default="item">
				<view class="content">
					<view class="text">{{ item.mark || ''}}</view>
					<view class="user">
						<u-avatar class="avatar" :src="!item.userInfo.avatar ?'../../static/img/noLoginAvatar.png':filters['appendUrlPrefix'](item.userInfo.avatar)" size="45"></u-avatar>
						<view class="shop-name">{{item.userInfo.username}}</view>
					</view>
				</view>
			</template>
			<!-- #endif -->
		</customWaterfallsFlow>
		<u-toast ref="uToast"></u-toast>
		<u-loadmore @loadmore="loadMore" :status="load.status" loadingIcon="semicircle" />
	</view>
</template>
<script>
	import customWaterfallsFlow from "@/components/custom-waterfalls-flow/custom-waterfalls-flow";
	export default {
		components: {
			customWaterfallsFlow,
		},
		data() {
			return {
				data: [],
				show: [],
				body: {
					page:{
						current: 1,
						size: 10
					}
				},
				load: {
					status: 'nomore',
					total: 0
				}
			}
		},
		watch: {
			'data': {
				async handler(newL, oldL) {
					if (newL.length < this.load.total) {
						this.load.status = 'loadmore'
					} else {
						this.load.status = 'nomore'
					}
					this.show = newL.map(e => {
						let obj = {}
						obj.image = e.images == null || e.images.length == 0 ? null : this.filters['appendUrlPrefix'](e.images[0])
						return obj
					})
				}
			}
		},
		methods: {
			showToast(params) {
				this.$refs.uToast.show({
					...params
				})
			},
			showImage(item) {
				uni.previewImage({
					urls: [].concat(item.image)
				})
			},
			toUploadPhoto() {
				if (this.body.id == null) {
					this.showToast({
						type: 'error',
						message: '请等待数据加载完成'
					})
					return
				}
				this.$Router.push({
					name: 'upload-photo',
					params: {
						id: this.body.id
					}
				})
			},
			async loadMore() {
				if (this.load.total <= this.data.length) {
					this.load.status = 'nomore'
					return
				}
				this.body.page.current++
				await this.getData(this.body, false)
			},
			async getData(body, clear) {
				this.load.status = 'loading'
				let userId = this.$u.getUserId()
				let data = await uni.$u.api.dynamicCollect({...this.body.page,userId})
				if (clear) {
					this.data = [].concat(data.records)
				} else {
					this.data = [...this.data, ...data.records]
				}
				if (data.records.length < 1) {
					this.load.status = 'nomore'
				}
				this.load.total = data.total
			}
		},
		async onLoad(options) {
			this.body.id = options.id
			await this.getData(this.body, true)
		},
		async onReachBottom() {
			await this.loadMore()
		},
		async onPullDownRefresh() {
			this.body.page.current = 1
			await this.getData(this.body, true)
			this.$refs.waterfallsFlowRef.refresh()
			uni.stopPullDownRefresh();
		},
	}
</script>
<style>
	.content {
		margin: 16rpx;
	}

	.user {
		margin-top: 15rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	/*.money{*/
	/*  color: #fa3534;*/
	/*  margin-top: 8rpx;*/
	/*}*/

	/*.label{*/
	/*  background-color: #fa3534;*/
	/*  color: #fff;*/
	/*  font-size: 20rpx;*/
	/*  padding: 4rpx 16rpx;*/
	/*  border-radius: 20rpx;*/
	/*}*/
	.avatar {
		margin: 20rpx;
	}

	.shop-name {
		font-size: 25rpx;
		color: #999;
	}
</style>
