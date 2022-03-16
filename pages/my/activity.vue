<template>
	<view>
		<view class="u-card-wrap">
			<!--一下是单独一个card-->
			<u-card v-for="(item, index) in list" :key="index" :title="item.depart + '--->' + item.end" :sub-title="item.activityTime" :padding="20" :border="true">
				<view class="" slot="body">
					<view>地点：{{ item.depart + '->' + item.end }}</view>
					<view>开始时间：{{ item.activityTime }}</view>
					<view>冠军奖品:</view>
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item map"><image :src="item.price.images | appendUrlPrefix"></image></view>
						<view class="u-body-item-title u-line-2">{{ item.price.title }}</view>
					</view>
				</view>
				<view class="foot" slot="foot">
					<view class="seckill">
						<u-button v-if="item.status == 1" :disabled="true" size="medium" shape="circle">已参加</u-button>
						<u-button v-else-if="item.voerdue" :disabled="true" size="medium" shape="circle">已结束</u-button>
						<u-button v-else-if="item.remain <= 0" :disabled="true" size="medium" shape="circle">名额已满</u-button>
						<u-button v-else :disabled="!item.start" @click="start(index)" size="medium" shape="circle">
							<view v-if="item.timestamp > 0 && item.status == -1"><u-count-down @end="startSek(index)" :timestamp="item.timestamp"></u-count-down></view>
							<view v-else>
								<u-loading :show="item.loading" style="margin-right: 20rpx;" mode="circle"></u-loading>
								点击参加
							</view>
						</u-button>
					</view>
				</view>
			</u-card>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				// {
				// 	id:1,
				// 	depart: '山西',
				// 	end: '北京',
				// 	startTime: '2022-3-15 13:58:00',
				// 	endTime:'2022-3-15 14:00:00',
				// 	activityTime: '2022-3-16 00:00:00',
				// 	avatar: '60e2d1c87fa84850b79daf5a790cbc3f.png',
				// 	remain: 1,
				// 	price: {
				// 		id:1,
				// 		images: '60e2d1c87fa84850b79daf5a790cbc3f.png',
				// 		title: 'IQOO7，参与活动，冠军送。'
				// 	},
				// 	loading: false,
				// 	status:0,
				// 	timestamp: 5,
				// 	start:false
				// }
			]
		};
	},
	methods: {
		startSek(index) {
			this.list[index].start = true;
			this.list[index].status = -1;
		},
		async start(index) {
			this.list[index].loading = true;
			let result = await this.$u.api.seckill({ id: this.list[index].id });
			if (result === -2) {
				this.$refs.uToast.show({
					title: '请勿重复点击!',
					type: 'error'
				});
				this.list[index].loading = false;
				this.list[index].status = 1;
				this.list[index].start = false;
			} else if (result === -1) {
				this.$refs.uToast.show({
					title: '你已经参与过秒杀,请勿重复秒杀！',
					type: 'error'
				});
				this.list[index].loading = false;
				this.list[index].status = 1;
				this.list[index].start = false;
			} else if (result === 0) {
				this.$refs.uToast.show({
					title: '抱歉,名额已满!',
					type: 'warning'
				});
				this.list[index].loading = false;
				this.list[index].status = -1;
				this.list[index].remain = -1;
			} else {
				this.getResult(index, this.list[index].id);
			}
		},
		async getResult(index, id) {
			let result = await this.$u.api.getResult({ id: id });
			if (result == 0) {
				setTimeout(getResult(id), 50);
			} else if (result == 1) {
				this.$refs.uToast.show({
					title: '参与成功!',
					type: 'success'
				});
				this.list[index].status = 1;
				this.list[index].remain--;
				this.list[index].loading = false;
			} else {
				this.$refs.uToast.show({
					title: '很抱歉，名额已满!',
					type: 'error'
				});
				this.list[index].start = false;
				this.list[index].status = -1;
				this.list[index].loading = false;
				this.list[index].remain = 0;
			}
		}
	},

	async onLoad() {
		let activities = await this.$u.api.getLimitActivity();
		activities.forEach(value => {
			value.loading = false;
			let now = new Date();
			let start = new Date(value.startTime);
			let end = new Date(value.endTime);
			if (now < end && now > start) {
				value.start = true;
			} else {
				value.start = false;
			}
			// console.log((new Date(value.startTime).getTime() - new Date().getTime()) / 1000)
			// console.log(new Date(value.startTime))
			// console.log(new Date(value.startTime).getTime())
			// console.log(new Date())
			// console.log(new Date().getTime())
			value.timestamp = (start.getTime() - new Date().getTime()) / 1000;
			value.voerdue = new Date() >= end;
			if (value.status == null || typeof value.status == 'undefined') {
				value.status = -1;
			}
		});
		this.list = [...activities, ...this.list];
		console.log(this.list);
	}
};
</script>

<style scoped lang="scss">
.u-search {
	padding-bottom: 20rpx;
	padding-left: 20rpx;
}
.u-demo {
	padding-top: 0;
}
.seckill {
	float: right;
	margin-bottom: 20rpx;
}

.u-card-wrap {
	background-color: $u-bg-color;
	padding: 1px;
}

.u-body-item {
	font-size: 32rpx;
	color: #333;
	padding: 20rpx 10rpx;
	flex-direction: column;
}

.u-body-item image {
	width: 120rpx;
	flex: 0 0 120rpx;
	height: 120rpx;
	border-radius: 8rpx;
	margin-left: 12rpx;
}

.u-body-item .map {
	text-align: center;
	width: 95%;
}

.u-body-item .map map {
	text-align: center;
	width: 95%;
}
.more {
	float: right;
	text-align: right;
	padding-right: 10rpx;
}
.tags {
	margin-right: 20rpx;
}
.pickers {
	height: 80rpx;
	display: flex;
	flex-direction: row;
}
.pickers-text {
	margin-top: 20rpx;
	margin-left: 60rpx;
	color: #c8c9cc;
}
.areabutton {
	font-size: 30rpx;
	margin-left: 300rpx;
	margin-top: 20rpx;
}
.search {
	background-color: #ffffff;
}
</style>
