<template>
	<view>
		<u-navbar back-text="返回" title="发布商品" :is-back="true" :custom-back="toBackPage"></u-navbar>
		<view class="public-content">
			<view class="public-title">
				<u-input v-model="title" type="text" placeholder="写标题,能吸引更多人看哦" maxlength="20" />
			</view>
			<view class="content">
				<u-input type="textarea" v-model="content" placeholder="描述一下商品吧" maxlength="500" :clearable="false"
					height="100" :autoHeight="false"></u-input>
				<u-upload ref="uUpload" :action="action" :auto-upload="true"></u-upload>
			</view>
			<view class="tags">
				<u-field type="text" label="价格" :placeholder="'￥ ' + priceValue"
					placeholder-style="font-weight:bolder;color:red" @click="popupShowPrice = true" disabled
					right-icon="arrow-right" icon="rmb-circle-fill" input-align="right"></u-field>
			</view>
			<view class="btn-pub">
				<u-button type="primary" shape="circle" @click="public()">发布</u-button>
			</view>
		</view>

		<u-toast ref="noDataToast"></u-toast>

		<u-popup v-model="popupShowPrice" mode="bottom" border-radius="10" :closeable="true" close-icon-pos="top-left"
			close-icon-size="30">
			<view @click="popupShowPrice = false" class="reply"><text>出价</text></view>
			<view class="popup-comment">
				<u-input v-model="priceValue" type="textarea" :border="true" :autoHeight="true" />
			</view>

		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popupShowPrice: false,
				priceValue: 0.00,
				title: "",
				content: "",
				action: ""
			};
		},
		onLoad() {
			let title = this.$Route.query.name
			if(title != null && typeof title != 'undefined'){
				this.title = title
			}
			this.action = getApp().globalData.uploadUrl
		},
		methods: {
			// 发布动态
			async public() {
				uni.showLoading({
					title: "正在发布中～",
				});
				let files = this.$refs.uUpload.lists;
				let images = []
				for (let index = 0; index < files.length; index++) {
					images.push(files[index].response.data)
				}
				if (images.length < 1) {
					this.$u.toast("至少上传一张图片")
					return
				}
				if (this.title == null || this.title.length <= 0) {
					this.$u.toast("请填写标题")
					return
				}
				if (this.priceValue == null || this.priceValue.length <= 0 || this.priceValue <= 0) {
					this.$u.toast("请填写正确价格")
					return
				}
				let result = await this.$u.api.publishGoods({
					userId: this.$u.getUserId(),
					name: this.title,
					content: this.content,
					price: this.priceValue,
					images: images
				})
				if (result) {
					this.$refs.noDataToast.show({
						title: '发布成功',
						type: 'success',
						isTab: true,
						url: '/pages/dynamic/index'
					})
				}
			},
			// 页面返回处理
			toBackPage() {
				uni.switchTab({
					url: "./index",
				});
			},
		},
	};
</script>

<style>
	.public-content {
		width: 90%;
		margin: 0 auto;
	}

	.public-content .public-title {
		margin-top: 10upx;
		border-bottom: 1upx solid #ecf5ff;
		padding-bottom: 10upx;
	}

	.public-content .content {
		margin-top: 20upx;
		border-bottom: 1upx solid #ecf5ff;
		padding-bottom: 10upx;
	}

	.btn-pub {
		position: fixed;
		width: 90%;
		bottom: 150upx;
	}

	.topic-search {
		width: 90%;
		margin: 0 auto;
		margin-top: 20rpx;
	}

	.popup-comment {
		margin-top: 80upx;
	}

	.reply {
		position: fixed;
		top: 30upx;
		right: 20upx;
		color: #2B85E4;
	}

	.topic-content {
		width: 90%;
		margin: 0 auto;
		margin-top: 20rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.topic {
		position: relative;
		height: 100%;
	}

	.new-topic {
		margin: 10rpx 0;
		/* margin-bottom: 10rpx; */
	}

	.next-topic {
		margin: 10rpx 0;
	}

	.topic-content .topic-item {
		margin: 10rpx 10rpx 10rpx 0;
		/* margin-bottom: 10rpx; */
	}

	.topic-selected {
		padding-top: 5rpx;
		padding-left: 5rpx;
		padding-bottom: 20rpx;
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 130rpx;
		background-color: #f9f9f9;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.topic-selected .topic-item {
		margin: 0rpx 5rpx 0 0;
		height: 40rpx;
	}
</style>
