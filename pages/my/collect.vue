<template>
	<view>
		<view style="margin-top: 30rpx;">
			<u-empty text="收藏列表为空" :show="collect.list.length == 0" mode="list"></u-empty>
			<view v-for="(item, index) in collect.list" :key="index" @click="toDetail(item.id)">
				<view class="content">
					<view class="content-image">
						<image class="img-item" mode="widthFix"
							:src="item.images == null || item.images.length == 0 ? '../../static/img/noLoginAvatar.png':filters['appendUrlPrefix'](item.images[0])" />
					</view>
					<view class="content-item">
						<view class="content-header">
							<text class="content-title">{{ item.name }}</text>
						</view>
						<view class="content-text">{{ '￥' + item.price }}</view>
						<view class="content-time">
							<u-avatar class="avatar"
								:src="!item.userInfo.avatar ?'../../static/img/noLoginAvatar.png':filters['appendUrlPrefix'](item.userInfo.avatar)"
								size="50"></u-avatar>
							<text>{{ item.userInfo.username }}</text>
							<u-button style="float: right;margin-right: 30rpx;" @click="cancelCollect(item.id,index)" shape="circle" size="mini" >取消收藏</u-button>
						</view>
					</view>
				</view>
				<u-divider :use-slot="false" half-width="100%"></u-divider>

			</view>
			<view class="more">
				<u-loadmore @loadmore="loadmore()" :status="collect.more" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				collect: {
					list: [],
					more: 'loadmore',
					show: false
				},
				current: 1,
				size: 10,
				num:0
			};
		},
		watch: {
			'collect.list': {
				handler(data) {
					if (data.length === 0) {
						this.collect.show = true;
					} else {
						this.collect.show = false;
					}
				}
			}
		},
		methods: {
			async cancelCollect(id,index){
				let result = await this.$u.api.cancelCollect({
					id: id,
					userId: this.$u.getUserId(),
				})
				this.collect.list.splice(index,1)
			},
			toDetail(id){
				this.$router.push({name:"dynamicdetail",params:{id:id}})
			},
			async loadmore(){
				await this.getList()
			},
			toCollect(e) {
				uni.navigateTo({
					url: '../dynamic/dynamicdetail?dynamicId=' + e
				});
			},
			async getList() {
				this.collect.more = 'loading';
				let list = this.collect.list;
				let result = await this.$u.api.collect({
					current:this.current,
					size:this.size,
					userId:this.$u.getUserId()
				});
				list.push(...result.records)
				this.num = result.total
				if (list.length >= this.num) {
					this.collect.more = 'nomore';
				} else {
					this.collect.more = 'loadmore';
				}
			}
		},
		async onLoad(e) {
			await this.getList()
		},
		//加载更多
		async onReachBottom() {
			await this.getList()
		},
		onReady() {}
	};
</script>

<style>
	.more {
		margin-top: 50rpx;
	}

	.content {
		display: flex;
		margin-top: 15rpx;
	}

	.content-image {
		margin-left: 40rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}

	.img-item {
		width: 150rpx;
		height: 150rpx;
		border-top-left-radius: 6px;
		border-top-right-radius: 6px;
	}

	.content-item {
		width: 100%;
		margin-top: 15rpx;
	}

	.content-title {
		font-weight: 600;
		font-size: 35rpx;

	}

	.content-item .content-header {
		margin-left: 30upx;
		margin-top: 10upx;
		display: flex;
		justify-content: flex-start;
	}

	.content-item .avatar {
		vertical-align: middle;
		margin-right: 10rpx;
		
	}

	.content-item .content-text {
		width: 90%;
		color: #ff0000;
		margin: 0 auto;
		margin-top: 5rpx;
		font-size: 30rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: bolder;
	}

	.content-item .content-time {
		width: 90%;
		margin: 0 auto;
		margin-top: 25rpx;
		text-align: left;
		font-size: 25upx;
		color: #909399;
	}
</style>
