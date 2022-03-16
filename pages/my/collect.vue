<template>
	<view>
		<u-sticky><u-tabs :list="list" :current="current" :is-scroll="false" :item-width="windowWidth" @change="changeTabs"></u-tabs></u-sticky>
		<view v-if="current == 0">
			<u-empty text="动态列表为空" :show="dynamic.show" mode="list"></u-empty>
			<view v-for="(item, index) in dynamic.list" :key="index" @click="toDynamic(item.id)">
				<view class="content-item">
					<view class="content-header">
						<text class="content-title">{{ item.title }}</text>
					</view>
					<view class="content-text">{{ item.body }}</view>
					<view class="content-time">
						<u-avatar class="avatar" :src="item.avatar | appendUrlPrefix" size="50"></u-avatar>
						<text>{{ item.username }}</text>
						<text>{{ item.time }}</text>
					</view>
					<u-divider :use-slot="false" height="60" half-width="100%"></u-divider>
				</view>
			</view>
			<view class="more"><u-loadmore @loadmore="loadmoreByDynamic()" :status="dynamic.more" /></view>
		</view>
		<view v-if="current == 1">
			<u-empty text="活动列表为空" :show="activity.show" mode="list"></u-empty>
			<view v-for="(item, index) in activity.list" :key="index" @click="toDynamic(item.id)">
				<view class="content-item">
					<view class="content-header">
						<text class="content-title">{{ item.title }}</text>
					</view>
					<view class="content-text">{{ item.body }}</view>
					<view class="content-time">
						<u-avatar class="avatar" :src="item.avatar | appendUrlPrefix" size="50"></u-avatar>
						<text>{{ item.username }}</text>
						<text>{{ item.time }}</text>
					</view>
					<u-divider :use-slot="false" height="60" half-width="100%"></u-divider>
				</view>
			</view>
			<view class="more"><u-loadmore @loadmore="loadmoreByActive()" :status="activity.more" /></view>
		</view>
		<view ref="card" style="visibility: hidden;">
			<view class="content-item">
				<view class="content-header"><text class="content-title">测试</text></view>
				<view class="content-text">测试</view>
				<view class="content-time">
					<u-avatar class="avatar" size="50"></u-avatar>
					<text>测试</text>
					<text>测试</text>
				</view>
				<u-divider :use-slot="false" height="60" half-width="100%"></u-divider>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					name: '动态'
				},
				{
					name: '活动'
				}
			],
			dynamic: {
				list: [],
				more: 'loadmore',
				show: true
			},
			activity: {
				list: [],
				more: 'loadmore',
				show: true
			},
			current: 0,
			num: 0,
			current: 0,
			windowWidth: 0,
			interface: null
		};
	},
	watch: {
		'dynamic.list': {
			handler(data) {
				if (data.length === 0) {
					this.dynamic.show = true;
				} else {
					this.dynamic.show = false;
				}
			}
		},
		'active.list': {
			handler(data) {
				if (data.length === 0) {
					this.activity.show = true;
				} else {
					this.activity.show = false;
				}
			}
		}
	},
	methods: {
		changeTabs(e) {
			this.current = e;
			let x = this.current === 0 ? 'dynamic' : 'activity';
			if (this[x].list.length === 0) {
				this.getList();
			}
		},
		toDynamic(e) {
			uni.navigateTo({
				url: '../dynamic/dynamicdetail?dynamicId=' + e
			});
		},
		loadmoreByActive() {
			this.getList()
		},
		//点击加载更多
		loadmoreByDynamic() {
			this.getList()
		},
		async getList() {
			let type = this.current === 0 ? 'dynamic' : 'activity';
			this[type].more = 'loading';
			let list = this[type].list;
			let minId = list.length === 0 ? null : list[0].id;
			let result = await this.$u.api[this.interface]({ minId: minId, num: this.num, type: this.current });
			list.push(...result)
			if (result.length <= this.num) {
				this[type].more = 'nomore';
			} else {
				this[type].more = 'loadmore';
			}
		}
	},
	onLoad(e) {
		let type = this.$Route.query.type;
		if (typeof type === 'undefined') {
			uni.showToast({
				title: '非法跳转',
				icon: 'error',
				success(e) {
					uni.navigateBack();
				}
			});
		}
		this.windowWidth = getApp().globalData.windowWidth;
		let title = type === 0 ? '我的收藏' : '我的发布';
		if (type === 0) {
			(title = '我的收藏'), (this.interface = 'getCollect');
		} else if (type === 1) {
			(title = '我的发布'), (this.interface = 'getPublish');
		} else {
			uni.showToast({
				title: '非法跳转',
				icon: 'error',
				success(e) {
					uni.navigateBack();
				}
			});
		}
		uni.setNavigationBarTitle({
			title: title
		});
	},
	//加载更多
	onReachBottom() {
		this.getList();
	},
	onReady() {
		let that = this;
		this.num = Math.round(getApp().globalData.windowHeight / this.$refs.card.$el.scrollHeight + 10);
		this.$refs.card.$el.remove();
		this.getList();
	}
};
</script>

<style>
.more {
	margin-top: 50rpx;
}
.content-item {
	width: 100%;
}
.content-title {
	font-weight: 600;
	font-size: 35rpx;
	margin-right: 30rpx;
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
	color: #999999;
	margin: 0 auto;
	margin-top: 10rpx;
	font-size: 30rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.content-item .content-time {
	width: 90%;
	margin: 0 auto;
	margin-top: 10upx;
	text-align: left;
	font-size: 25upx;
	color: #909399;
}
</style>
