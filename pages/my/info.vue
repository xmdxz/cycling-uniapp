<template>
	<view>
		<u-sticky>
			<u-tabs ref="tabs" :list="list" :current="current" :is-scroll="false" :item-width="windowWidth"
				@change="changeTabs"></u-tabs>
		</u-sticky>
		<view v-if="current == 0">
			<u-empty text="关注列表为空" :show="focused.show" mode="list"></u-empty>
			<u-card v-for="(item, index) in focused.list" :key="index" margin="1rpx 1rpx 0rpx 0rpx" :show-head="false"
				:show-foot="false" :border="false">
				<view slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0 card">
						<u-avatar class="img" :src="item.avatar" size="100" :show-sex="true"></u-avatar>
						<view class="u-body-item-title u-line-2 card-content">
							<view style="font-weight: bold;font-size: larger;">{{ item.username }}</view>
							<view style="color:#82848A;font-size: smaller;margin-top: 10rpx">{{ item.introduction }}
							</view>
						</view>
						<u-button class="attention" :type="item.mutualConcern ? 'success' : 'default'" shape="circle"
							size="default" @click="focusedOperation(index, item.mutualConcern)">
							{{ item.mutualConcern ? '互相关注' : '取消关注' }}
						</u-button>
					</view>
				</view>
			</u-card>
			<view class="more">
				<u-loadmore @loadmore="loadmore(0)" :status="focused.more" />
			</view>
		</view>
		<view v-if="current == 1">
			<u-empty text="粉丝列表为空" :show="fans.show" mode="list"></u-empty>
			<u-card v-for="(item, index) in fans.list" :key="index" margin="1rpx 1rpx 0rpx 0rpx" :show-head="false"
				:show-foot="false" :border="false">
				<view slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0 card">
						<u-avatar class="img" :src="item.avatar" size="100" :show-sex="true"></u-avatar>
						<view class="u-body-item-title u-line-2 card-content">
							<view style="font-weight: bold;font-size: larger;">{{ item.username }}</view>
							<view style="color:#82848A;font-size: smaller;margin-top: 10rpx">{{ item.introduction }}
							</view>
						</view>
						<u-button class="attention" :type="item.mutualConcern ? 'success' : 'default'" shape="circle"
							size="default" @click="fansOperation(index, item.relatedUserId, item.mutualConcern)">
							{{ item.mutualConcern ? '互相关注' : '回关' }}
						</u-button>
					</view>
				</view>
			</u-card>
			<view class="more">
				<u-loadmore @loadmore="loadmore(1)" :status="fans.more" />
			</view>
		</view>
		<u-card ref="card" style="visibility: hidden;" margin="1rpx 1rpx 0rpx 0rpx" :show-head="false"
			:show-foot="false" :border="false">
			<view slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0 card">
					<u-avatar class="img" size="100" :show-sex="true"></u-avatar>
					<view class="u-body-item-title u-line-2 card-content">
						<view style="font-weight: bold;font-size: larger;">调试</view>
						<view style="color:#82848A;font-size: smaller;margin-top: 10rpx">调试</view>
					</view>
					<u-button class="attention" shape="circle" size="default">互相关注</u-button>
				</view>
			</view>
		</u-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: null,
				fans: {
					list: [],
					more: 'loadmore',
					show: true
				},
				focused: {
					list: [],
					more: 'loadmore',
					show: true
				},
				list: [{
						name: '关注'
					},
					{
						name: '粉丝'
					}
				],
				current: 0,
				num: 0
			};
		},
		watch: {
			fans: {
				handler(newVal) {
					console.log(newVal);
				},
				deep: true
			},
			focus: {
				handler(e) {
					console.log(e);
				},
				deep: true
			}
		},
		methods: {
			loadmore(e) {
				this.getList(this.getTypeInfo(this.current));
			},
			changeTabs(e) {
				this.current = e;
				let typeInfo = this.getTypeInfo(this.current);
				uni.setNavigationBarTitle({
					title: typeInfo.title
				});
				let list = this[typeInfo.type].list;
				if (list.length === 0) {
					this.getList(typeInfo);
				}
			},
			async fansOperation(index, userId, mutualConcern) {
				if (mutualConcern) {
					let that = this;
					let instead = this.fans.list;
					
					console.log(instead,index)
					uni.showModal({
						content: '不再关注?',
						async success(res) {
							if (res.confirm) {
								uni.showLoading();
								
								let result = await that.$u.api.cancelFocused(instead[index].id)
								
								if (result > 0) {
									
									instead[index].mutualConcern = false;
									let index2 = that.focused.list.findIndex(e => {
										return e.id === instead[index].id;
									});
									if (index2 != -1) {
										that.focused.list.splice(index2, 1);
									}
									uni.hideLoading();
								} else {
									uni.hideLoading();
									uni.showToast({
										title: '取关失败，请重试!',
										icon: 'none'
									});
								}

							}
						}
					});
				} else {
					uni.showLoading();
					let result = await this.$u.api.focus(userId);
					if (result > 0) {
						this.fans.list[index].mutualConcern = true;
						this.focused.list.unshift(this.fans.list[index]);
						uni.hideLoading();
					} else {
						uni.hideLoading();
						uni.showToast({
							title: '关注失败，请重试!',
							icon: 'none'
						});
					}
				}
			},
			async focusedOperation(index, userId, mutualConcern) {
				let that = this;
				let instead = this.focused.list;
				uni.showModal({
					content: '不再关注?',
					success(res) {
						if (res.confirm) {
							uni.showLoading();
							that.$u.api.cancelFocused(instead[index].id).then(result => {
								if (result > 0) {
									console.log(index)
									instead.splice(index, 1);
									let index = that.fans.list.findIndex(e => {
										return e.id === instead[index].id;
									});
									if (index != -1) {
										that.fans.list[index].mutualConcern = false;
									}
									uni.hideLoading();
								} else {
									uni.hideLoading();
									uni.showToast({
										title: '取关失败，请重试!',
										icon: 'none'
									});
								}
							});
						}
					}
				});
			},
			getTypeInfo(type) {
				let typeInfo = {};
				switch (type) {
					case 0:
						typeInfo.title = '关注';
						typeInfo.url = '/user/getFocusedAndSimple';
						typeInfo.type = 'focused';
						break;
					case 1:
						typeInfo.title = '粉丝';
						typeInfo.url = '/user/getFansAndSimple';
						typeInfo.type = 'fans';
						break;
					default:
						uni.showToast({
							title: '未知错误',
							success() {
								uni.navigateBack();
							}
						});
						return null;
				}
				return typeInfo;
			},
			async getList(typeInfo) {
				let that = this;
				that[typeInfo.type].more = 'loading';
				let list = this[typeInfo.type].list;
				let minId = list.length === 0 ? null : list[list.length - 1].id;
				let result = await this.$u.api.getFansOrFocusedAndSimple({
					url: typeInfo.url,
					minId: minId,
					num: that.num
				});
				list.push(...result);
				if (list != null && list.length > 0) {
					this[typeInfo.type].show = false;
				}
				if (result.length <= that.num) {
					that[typeInfo.type].more = 'nomore';
				}
			}
		},
		onReachBottom() {
			this.getList(this.getTypeInfo(this.current));
		},
		onLoad(options) {
			let type = options.type;
			this.windowWidth = getApp().globalData.windowWidth;
			if (type == null || typeof type == 'undefined' || type === '') {
				uni.showToast({
					title: '未知错误',
					success() {
						uni.navigateBack();
					}
				});
			} else {
				this.current = parseInt(type);
			}
		},
		onReady() {
			this.num = Math.round(getApp().globalData.windowHeight / this.$refs.card.$el.scrollHeight + 10);
			this.$refs.card.$el.remove();
			let typeInfo = this.getTypeInfo(this.current);
			uni.setNavigationBarTitle({
				title: typeInfo.title
			});
			this.getList(typeInfo);
		}
	};
</script>

<style scoped lang="scss">
	.more {
		margin-top: 50rpx;
	}

	.card {
		display: flex;
		justify-content: space-around;
		align-items: center;
		align-content: center;
	}

	.img {
		flex: 3;
		margin: 10rpx;
	}

	.card-content {
		flex: 7;
		margin: 10rpx;
	}

	.attention {
		flex: 2;
		margin: 10rpx;
	}
</style>
