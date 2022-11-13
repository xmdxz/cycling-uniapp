<template>
	<view>
		<view style="margin-top: 30rpx;">
			<u-empty :text="empty" :show="data.list.length == 0" mode="list"></u-empty>
			<view v-for="(item, index) in data.list" :key="index" @click="todata(item.id)">
				<view class="content">
					<view class="content-image">
						<image class="img-item" mode="widthFix"
							:src="item.images == null || item.images.length == 0 ? '../../static/img/noLoginAvatar.png':filters['appendUrlPrefix'](item.images[0])" />
					</view>
					<view class="content-item">
						<view class="content-header">
							<text style="float: left;" class="content-title">{{ item.name }}</text>
							<text v-if="type != 0" style="float: right;margin-right: 30rpx;font-size: 20rpx;color: coral;" >{{ '交易完成' }}</text>
						</view>
						<view style="display: flex;">
							<view style="margin-left: 25rpx;" class="content-text">{{ '￥' + item.price }}</view>
							<view v-if="type!= 0" class="content-text" style="float:  right;">
								{{ '成交价:￥' + item.amount }}
							</view>

						</view>
						<view v-if="type != 0" class="content-time">
							<u-avatar class="avatar"
								:src="!item.userInfo.avatar ?'../../static/img/noLoginAvatar.png':filters['appendUrlPrefix'](item.userInfo.avatar)"
								size="50"></u-avatar>
							<text>{{ item.userInfo.username }}</text>
							<u-button style="float: right;margin-right: 30rpx; margin-bottom: 30rpx;" shape="circle"
								@click="deleteData(item.id,index)" size="mini">删除订单
							</u-button>
						</view>
						<view v-else class="content-time">
							<text>{{ item.content  }}</text>
							<u-button style="float: right;margin-right: 30rpx; margin-bottom: 30rpx;"
								@click="deleteData(item.id,index)" shape="circle" size="mini">删除
							</u-button>
						</view>
					</view>
				</view>
				<u-divider :use-slot="false" half-width="100%"></u-divider>

			</view>
			<view class="more">
				<u-loadmore @loadmore="loadmore()" :status="data.more" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {
					list: [],
					more: 'loadmore',
					show: false
				},
				current: 1,
				size: 10,
				num: 0,
				type: 0,
				interface: 'userPublish',
				empty: "您还没有发布宝贝呢",
				deleteType: null,
				show: false
			};
		},
		watch: {
			'data.list': {
				handler(data) {
					if (data.length === 0) {
						this.data.show = true;
					} else {
						this.data.show = false;
					}
				}
			}
		},
		methods: {
			async deleteData(id, index) {
				console.log(id)
				let result = await this.$u.api.deleteData({
					id: id,
					type: this.deleteType
				})
				if (result) {
					this.data.list.splice(index, 1)
				}
			},
			async loadmore() {
				await this.getList()
			},
			todata(e) {
				uni.navigateTo({
					url: '../dynamic/dynamicdetail?dynamicId=' + e
				});
			},
			async getList() {
				this.data.more = 'loading';
				let list = this.data.list;
				let body = {
					current: this.current,
					size: this.size,
					userId: this.$u.getUserId()
				}
				if (this.type == 1) {
					body.type = "SOLD"
				} else if (this.type == 2) {
					body.type = "BUY"
				}
				let result = await this.$u.api[this.interface](body);
				list.push(...result.records)
				this.num = result.total
				if (list.length >= this.num) {
					this.data.more = 'nomore';
				} else {
					this.data.more = 'loadmore';
				}
			}
		},
		async onLoad(e) {
			this.type = this.$Route.query.type
			let title
			switch (this.type) {
				case 0:
					title = "我发布的"
					this.interface = "userPublish"
					this.empty = "您还没有发布过宝贝呢"
					this.deleteType = "GOODS"
					break;
				case 1:
					title = "我卖出的"
					this.interface = "userOrder"
					this.empty = "您还没有卖出过宝贝呢"
					this.deleteType = "ORDER"
					break;
				case 2:
					title = "我买到的"
					this.interface = "userOrder"
					this.empty = "您还没有买过宝贝呢"
					this.deleteType = "ORDER"
					break;
			}
			uni.setNavigationBarTitle({
				title: title
			})
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

	}

	.content-title {
		font-weight: 600;
		font-size: 30rpx;

	}

	.content-item .content-header {
		margin-left: 30upx;
		margin-top: 10upx;
		display: flex;
		justify-content: space-between;
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
