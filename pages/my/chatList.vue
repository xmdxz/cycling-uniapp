<template>
	<view>
		<u-empty text="聊天列表为空" :show="show" mode="list"></u-empty>
		<u-card @click="toChat(item.id)" v-for="(item, index) in list" :key="index" margin="1rpx 1rpx 0rpx 0rpx" :show-head="false" :show-foot="false" :border="false">
			<view slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0 card">
					<u-avatar class="img" :src="item.avatar | appendUrlPrefix" size="100"></u-avatar>
					<view class="u-body-item-title u-line-2 card-content">
						<view style="font-weight: bold;font-size: larger;">{{ item.username }}</view>
						<view style="color:#82848A;font-size: smaller;margin-top: 10rpx">{{ item.introduction }}</view>
					</view>
				</view>
			</view>
		</u-card>
		
		<!-- <view class="more"><u-loadmore @loadmore="loadmore(0)" :status="more" /></view> -->

		<u-card ref="card" style="visibility: hidden;" margin="1rpx 1rpx 0rpx 0rpx" :show-head="false" :show-foot="false" :border="false">
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
			list: [
			],
			// more: 'loadmore',
			show: false
		};
	},
	// watch: {
	// 	list: {
	// 		handler(newVal) {
	// 			if (newVal.length === 0) {
	// 				this.fans.show = true;
	// 			} else {
	// 				this.fans.show = false;
	// 			}
	// 		}
	// 	}
	// },
	methods: {
		toChat(index){
			this.$Router.push({name:'chat',params:{receiver:index}})
		},
		// loadmore(e) {
		// 	this.getList();
		// },
		// async getList(typeInfo) {
		// 	// 	let that = this;
		// 	// 	that[typeInfo.type].more = 'loading';
		// 	// 	let list = this[typeInfo.type].list;
		// 	// 	let minId = list.length === 0 ? null : list[0].id;
		// 	// 	let result = await this.$u.api.getFansOrFocusedAndSimple({ url: typeInfo.url, minId: minId, num: that.num });
		// 	// 	list.push(...result);
		// 	// 	if (list != null && list.length > 0) {
		// 	// 		this[typeInfo.type].show = false;
		// 	// 	}
		// 	// 	if (result.length <= that.num) {
		// 	// 		that[typeInfo.type].more = 'nomore';
		// 	// 	}
		// 	// }
		// },
		// onReachBottom() {
		// 	this.getList();
		// },
		onLoad() {
			this.windowWidth = getApp().globalData.windowWidth;
			let x = this.$u.getChatList()
			this.list = [...x,...this.list]
			if(this.list.length == 0){
				this.show = true;
			}
		},
		onReady() {
			// this.num = Math.round(getApp().globalData.windowHeight / this.$refs.card.$el.scrollHeight + 10);
			this.$refs.card.$el.remove();
		}
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
