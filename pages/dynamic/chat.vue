<template>
	<view>
<!-- 		<view class="tips color_fff size_12 align_c" :class="{ show: ajax.loading }" @tap="getHistoryMsg">{{ ajax.loadText }}</view> -->
		<view class="box-1" id="list-box">
			<view class="talk-list">
				<view v-for="(item, index) in talkList" :key="index" :id="`msg-${item.id}`">
					<view class="item flex_col" :class="item.userId == id ? 'push' : 'pull'">
						<image :src="'http://localhost:10086/'+item.userInfo.avatar" mode="aspectFill" class="pic"></image>
						<view class="content">{{ item.content }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="box-2">
			<view class="flex_col">
				<view class="flex_grow">
					<input type="text" class="content" v-model="content" placeholder="请输入聊天内容" placeholder-style="color:#DDD;" :cursor-spacing="6" />
				</view>
				<button class="send" @tap="send">发送</button>
				<button class="send" @tap="buy">立即购买</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: -1,
			talkList: [],
			ajax: {
				receiver: -1,
				rows: 20, //每页数量
				page: null, //页码
				flag: true, // 请求开关
				loading: true, // 加载中
				loadText: '正在获取消息'
			},
			content: '',
			socket: null,
			senderPic: '',
			receiverPic: '',
			goodsId:'',
		};
	},
	mounted() {
		let receiver = this.$Route.query.receiver;
		this.goodsId = this.$Route.query.goodsId;
		// if(receiveId == null || typeof receiveId == "undefined" || parseInt(receiveId) < 0){
		// 	uni.navigateBack()
		// 	return
		// }
		this.id = this.$u.getUserId();
		this.$nextTick(() => {
			let result = this.$u.api.chatList({
				goodsId: this.goodsId
			});
			result.then((res) =>{
				this.talkList = [...res, ...this.talkList];
			})
		});
		this.ajax.receiver = receiver
		let that = this
		// this.$u.api.getAvatar({id:this.ajax.receiver}).then(res => {that.receiverPic = that.filters['appendUrlPrefix'](res.msg)})
		// this.$u.api.getAvatar({id:this.id}).then(res => {that.senderPic = that.filters['appendUrlPrefix'](res.msg)})
		// this.socket = this.$websocket.getters.socket;
		// this.$nextTick(() => {
		// 	this.getHistoryMsg();
		// });
	},
	onPageScroll(e) {
		// if (e.scrollTop < 5) {
		// 	this.getHistoryMsg();
		// }
	},
	computed: {
		//监听接收到的消息
		// socketMsgs() {
		// 	return this.$websocket.getters.socketMsgs;
		// }
	},
	watch: {
		'$websocket.state.msg': {
			//处理接收到的消息
			handler: function() {
				let that = this;
				let sMsg = that.$websocket.getters.socketMsgs;		
				if(sMsg.type == 0){
					that.talkList.push(sMsg)
				}
			}
		},
		
	},
	methods: {
		// 获取历史消息
		getHistoryMsg() {
			if (!this.ajax.flag) {
				return; //
			}
			
			// 此处用到 ES7 的 async/await 知识，为使代码更加优美。不懂的请自行学习。
			let get = async () => {
				this.hideLoadTips();
				this.ajax.flag = false;
				let data = await this.joinHistoryMsg();


				if(data.length <= 0){
					this.hideLoadTips(true);
					return;
				}
				// 获取待滚动元素选择器，解决插入数据后，滚动条定位时使用
				let selector = '';

				if (this.ajax.page > 1) {
					// 非第一页，则取历史消息数据的第一条信息元素
					selector = `#msg-${this.talkList[0].id}`;
				} else {
					// 第一页，则取当前消息数据的最后一条信息元素
					selector = `#msg-${data[data.length - 1].id}`;
				}

				// 将获取到的消息数据合并到消息数组中
				this.talkList = [...data, ...this.talkList];
				// 数据挂载后执行，不懂的请自行阅读 Vue.js 文档对 Vue.nextTick 函数说明。
				this.$nextTick(() => {
					// 设置当前滚动的位置
					this.setPageScrollTo(selector);

					this.hideLoadTips(true);

					if (data.length < this.ajax.rows) {
						// 当前消息数据条数小于请求要求条数时，则无更多消息，不再允许请求。
						// 可在此处编写无更多消息数据时的逻辑
					} else {
						this.ajax.page++;

						// 延迟 200ms ，以保证设置窗口滚动已完成
						setTimeout(() => {
							this.ajax.flag = true;
						}, 200);
					}
				});
			};
			get();
		},
		// 拼接历史记录消息，正式项目可替换为请求历史记录接口
		async joinHistoryMsg() {
			let that = this;
			let join = async function() {
				let arr = [];

				//通过当前页码及页数，模拟数据内容
				let result = await that.$u.api.chatList({
					userId: this.$u.getUserId(),
				});
				if(result > 0){
					that.ajax.page = result[0].id
				}
				arr = [...result];

				/*
						颠倒数组中元素的顺序。将最新的数据排在本次接口返回数据的最后面。
						后端接口按 消息的时间降序查找出当前页的数据后，再将本页数据按消息时间降序排序返回。
						这是数据的重点，因为页面滚动条和上拉加载历史的问题。
					 */
				arr.reverse();

				return arr;
			};

			// 此处用到 ES6 的 Promise 知识，不懂的请自行学习。
			return new Promise((done, fail) => {
				// 无数据请求接口，由 setTimeout 模拟，正式项目替换为 ajax 即可。
				let data = join();
				done(data);
			});
		},
		// 设置页面滚动位置
		setPageScrollTo(selector) {
			let view = uni
				.createSelectorQuery()
				.in(this)
				.select(selector);
			view.boundingClientRect(res => {
				uni.pageScrollTo({
					scrollTop: res.top - 30, // -30 为多显示出大半个消息的高度，示意上面还有信息。
					duration: 0
				});
			}).exec();
		},
		// 隐藏加载提示
		hideLoadTips(flag) {
			if (flag) {
				this.ajax.loadText = '消息获取成功';
				setTimeout(() => {
					this.ajax.loading = false;
				}, 300);
			} else {
				this.ajax.loading = true;
				this.ajax.loadText = '正在获取消息';
			}
		},
		// 发送信息
		async send() {
			if (!this.content) {
				uni.showToast({
					title: '请输入有效的内容',
					icon: 'none'
				});
				return;
			}

			uni.showLoading({
				title: '正在发送'
			});
			let that = this;
			// 将当前发送信息 添加到消息列表。

			let result = await this.$u.api.insertChat({
				userId: this.$u.getUserId(),
				content: this.content,
				goodsId:this.goodsId,
			});
			if(result){
				that.content = '';
				uni.pageScrollTo({
					scrollTop: 999999, // 设置一个超大值，以保证滚动条滚动到底部
					duration: 0
				});
				let result = this.$u.api.chatList({
					goodsId: this.goodsId
				});
				result.then((res) =>{
					this.talkList = [...res];
				})
			}
			uni.hideLoading();
		},
		async buy(){

			let result = await this.$u.api.buy({
				userId: this.$u.getUserId(),
				goodsId:this.goodsId,
			});
			if(result){
				this.$u.toast("购买成功！")
				setTimeout(() => {
					this.$Router.push({name:"my"})
				}, 400);
			}
			uni.hideLoading();
		},
	},
	activated(){
		this.goodsId = this.$Route.query.goodsId;
		let result = this.$u.api.chatList({
			goodsId: this.goodsId
		});
		result.then((res) =>{
			this.talkList = res;
		})
	},
};
</script>	

<style lang="scss">
@import '../../lib/global.scss';
page {
	background-color: #f3f3f3;
	font-size: 28rpx;
}

/* 加载数据提示 */
.tips {
	position: fixed;
	left: 0;
	top: var(--window-top);
	width: 100%;
	z-index: 9;
	background-color: rgba(0, 0, 0, 0.15);
	height: 72rpx;
	line-height: 72rpx;
	transform: translateY(-80rpx);
	transition: transform 0.3s ease-in-out 0s;

	&.show {
		transform: translateY(0);
	}
}

.box-1 {
	width: 100%;
	height: auto;
	padding-bottom: 100rpx;
	box-sizing: content-box;

	/* 兼容iPhoneX */
	margin-bottom: 0;
	margin-bottom: constant(safe-area-inset-bottom);
	margin-bottom: env(safe-area-inset-bottom);
}
.box-2 {
	position: fixed;
	left: 0;
	width: 100%;
	bottom: 0;
	height: auto;
	z-index: 2;
	border-top: #e5e5e5 solid 1px;
	box-sizing: content-box;
	background-color: #f3f3f3;

	/* 兼容iPhoneX */
	padding-bottom: 0;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);

	> view {
		padding: 0 20rpx;
		height: 100rpx;
	}

	.content {
		background-color: #fff;
		height: 64rpx;
		padding: 0 20rpx;
		border-radius: 32rpx;
		font-size: 28rpx;
	}

	.send {
		background-color: #42b983;
		color: #fff;
		height: 64rpx;
		margin-left: 20rpx;
		border-radius: 32rpx;
		padding: 0;
		width: 120rpx;
		line-height: 62rpx;

		&:active {
			background-color: #5fc496;
		}
	}
}

.talk-list {
	padding-bottom: 20rpx;

	/* 消息项，基础类 */
	.item {
		padding: 20rpx 20rpx 0 20rpx;
		align-items: flex-start;
		align-content: flex-start;
		color: #333;

		.pic {
			width: 92rpx;
			height: 92rpx;
			border-radius: 50%;
			border: #fff solid 1px;
		}

		.content {
			padding: 20rpx;
			border-radius: 4px;
			max-width: 500rpx;
			word-break: break-all;
			line-height: 52rpx;
			position: relative;
		}

		/* 收到的消息 */
		&.pull {
			.content {
				margin-left: 32rpx;
				background-color: #fff;

				&::after {
					content: '';
					display: block;
					width: 0;
					height: 0;
					border-top: 16rpx solid transparent;
					border-bottom: 16rpx solid transparent;
					border-right: 20rpx solid #fff;
					position: absolute;
					top: 30rpx;
					left: -18rpx;
				}
			}
		}

		/* 发出的消息 */
		&.push {
			/* 主轴为水平方向，起点在右端。使不修改DOM结构，也能改变元素排列顺序 */
			flex-direction: row-reverse;

			.content {
				margin-right: 32rpx;
				background-color: #a0e959;

				&::after {
					content: '';
					display: block;
					width: 0;
					height: 0;
					border-top: 16rpx solid transparent;
					border-bottom: 16rpx solid transparent;
					border-left: 20rpx solid #a0e959;
					position: absolute;
					top: 30rpx;
					right: -18rpx;
				}
			}
		}
	}
}
</style>
