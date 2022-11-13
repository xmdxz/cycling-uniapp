<template>
	<view v-if="info != null">
		<u-navbar back-text="返回" title="商品详情"></u-navbar>
		<view class="content-item">
			<view class="content-header">
				<u-avatar
					:src="!info.userInfo.avatar ?'../../static/img/noLoginAvatar.png':filters['appendUrlPrefix'](info.userInfo.avatar)"
					style="vertical-align: middle;" size="large"></u-avatar>
				<view class="content-authorinfo">
					<text class="content-user">{{info.userInfo.username}}</text>
					<text class="content-mark">{{info.userInfo.mark || ''}}</text>
					<!-- <text class="content-level">{{ilevel}}</text> -->
				</view>
			</view>
			<view class="content-price">
				{{ '￥' + info.price}}
			</view>
			<view class="content-text" style="font-weight: bolder;">
				{{info.name}}
			</view>
			<view class="content-content">
				{{info.content}}
			</view>
			<view class="content-imgs">
				<image v-for="(item,index) in info.images"
					:src="!item ?'../../static/img/noLoginAvatar.png':filters['appendUrlPrefix'](item)" :key="index"
					@tap="preview(!item ?'../../static/img/noLoginAvatar.png':filters['appendUrlPrefix'](item))"
					class="content-img"></image>
			</view>
			<view class="content-time">
				<text>{{info.createTime}}</text>
			</view>
			<view class="content-menu">

			</view>
			<view class="diver" style="width: 100%;height: 10upx;background-color: #DCDFE6;"></view>
			<view class="comment">
				<view class="comment-title u-m-l-30 u-m-t-10 u-m-r-30">
					<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
				</view>
				<view v-if="current == 0" class="comment-items">
					<view class="comment-item" v-for="(item,index) in info.comments" :key="index">
						<view class="comment-header">
							<u-avatar
								:src="!item.userInfo.avatar ?'../../static/img/noLoginAvatar.png':filters['appendUrlPrefix'](item.userInfo.avatar)"
								style="vertical-align: middle" size="mini"></u-avatar>
							<text class="comment-user">{{item.userInfo.username}}</text>
							<!-- <view style="float: right;margin-top: 15upx;margin-right: 45upx;">
								<u-icon name="thumb-up" size="35"></u-icon>
							</view> -->
						</view>
						<view class="comment-text">
							{{item.content}}
						</view>
						<view class="comment-time">
							{{item.createTime}}
						</view>
					</view>
				</view>
				<view v-if="current == 1" class="comment-items">
					<view class="comment-item" v-for="(item,index) in info.publishPrice" :key="index">
						<view class="comment-header">
							<u-avatar
								:src="!item.userInfo.avatar ?'../../static/img/noLoginAvatar.png':filters['appendUrlPrefix'](item.userInfo.avatar)"
								style="vertical-align: middle" size="mini"></u-avatar>
							<text class="comment-user">{{item.userInfo.username}}</text>
							<!-- <view style="float: right;margin-top: 15upx;margin-right: 45upx;">
								<u-icon name="thumb-up" size="35"></u-icon>
							</view> -->
						</view>
						<view style="margin-left: 100rpx;" class="content-price">
							{{ '￥' + item.price}}
						</view>
						<view class="comment-time">
							{{item.createTime}}
						</view>
					</view>
				</view>
			</view>
		</view>


		<view class="comment-edit">
			<view style="display: flex;">
				<u-icon style="margin:0 20upx;" name="rmb-circle" @click="popupShowPrice = true" size="50"></u-icon>
				<u-icon style="margin:0 20upx;" name="chat" @click="popupShow=true" size="50"></u-icon>
				<u-icon v-if="!isCollect" style="margin:0 20upx;" name="star" @click="collect" size="50"></u-icon>
				<u-icon v-else style="margin:0 20upx;" name="star" color="#f8d347" @click="cancelCollect" size="50">
				</u-icon>
			</view>
			<view style="display: flex;">
				<view style="margin: 0 20upx;">
					<u-button @click="sold" size="medium" :hair-line="false" shape="circle" :ripple="true" :custom-style="{
						backgroundColor:'#f7f7f7',
						fontSize:'30upx',
						width:'150upx'
					}">卖同款</u-button>
				</view>

				<view style="margin: 0 20upx;">
					<u-button size="medium" :hair-line="false" shape="circle" :ripple="true" :custom-style="{
						backgroundColor:'#f8d347',
						fontSize:'30upx',
						fontWeight:'bolder',
						fontColor:'black',
						width:'150upx'
					}">我想要</u-button>
				</view>

			</view>

		</view>

		<view>
			<u-popup v-model="popupShow" mode="bottom" border-radius="10" :closeable="true" close-icon-pos="top-left"
				close-icon-size="30">
				<view @click="comment" class="reply"><text>留言</text></view>
				<view class="popup-comment">
					<u-input v-model="commentValue" type="textarea" :border="true" :autoHeight="true" />
				</view>

			</u-popup>
			<u-popup v-model="popupShowPrice" mode="bottom" border-radius="10" :closeable="true"
				close-icon-pos="top-left" close-icon-size="30">
				<view @click="chujia" class="reply"><text>出价</text></view>
				<view class="popup-comment">
					<u-input v-model="priceValue" type="textarea" :border="true" :autoHeight="true" />
				</view>

			</u-popup>
		</view>
	</view>
</template>

<script>
	import filters from '../../common/filters.js'
	export default {
		data() {
			return {
				list: [{
						name: '留言'
					},
					{
						name: "出价"
					}
				],
				info: null,
				popupShow: false,
				popupShowPrice: false,
				commentValue: '',
				isCollect: false,
				priceValue: 0.0,
				id: 0,
				current: 0
			}
		},
		async onLoad() {
			let that = this
			this.id = this.$Route.query.id
			this.info = await this.$u.api.goodsDetail({
				id: this.id
			})
			this.$u.api.isCollect({
				goodsId: this.info.id,
				userId: this.$u.getUserId()
			}).then(res => {
				//不知道为啥这里一定走catch回调，我不理解
				that.isCollect = res
			}).catch(res => {
				that.isCollect = res.data.data
			})
		},
		methods: {
			sold(){
				this.$Router.push({name:"publicdynamic",params:{name:this.info.name}})
			},
			change(index) {
				this.current = index
			},
			preview(url) {
				uni.previewImage({
					urls: [].concat(url)
				})
			},
			async collect() {
				let result = await this.$u.api.collectSave({
					id: this.info.id,
					userId: this.$u.getUserId()
				})
				if (result) {
					this.isCollect = true
					this.$u.toast("收藏成功")
				}
			},
			async cancelCollect() {
				let result = await this.$u.api.cancelCollect({
					id: this.info.id,
					userId: this.$u.getUserId()
				})
				if (result) {
					this.isCollect = false
				}
			},
			async chujia() {
				if (this.priceValue == null && this.priceValue <= 0) {
					this.$u.toast("请输入出价")
				}
				let result = await this.$u.api.publishPrice({
					userId: this.$u.getUserId(),
					goodsId: this.info.id,
					price: this.priceValue
				})
				if (result) {
					this.$u.toast("出价成功")
					this.popupShowPrice = false
					let price = await this.$u.api.priceList({
						id: this.info.id
					})
					if (price) {
						this.info.publishPrice = [].concat(price)
					}
				}
			},
			async comment() {
				if (this.commentValue == null && this.commentValue.length == 0) {
					this.$u.toast("请输入评论内容")
				}
				let result = await this.$u.api.publishComment({
					userId: this.$u.getUserId(),
					id: this.info.id,
					type: 'GOODS',
					content: this.commentValue
				})
				if (result) {
					this.$u.toast("留言成功")
					this.popupShow = false
					let comment = await this.$u.api.commentList({
						id: this.info.id,
						type: 'GOODS'
					})
					if (comment) {
						this.info.comments = [].concat(comment)
					}
				}
			}
		}
	}
</script>

<style>
	.content-item {
		width: 100%;
	}

	.content-item .content-header {
		margin-left: 30upx;
		margin-top: 10upx;
		display: flex;
		justify-content: flex-start;
	}

	.content-header .content-authorinfo {
		margin-top: 20upx;
		margin-left: 20upx;
		display: flex;
		flex-direction: column;
	}

	.content-header .content-authorinfo .content-user {
		font-size: 35upx;
		font-weight: bolder;
	}

	.content-header .content-authorinfo .content-mark {
		font-size: 25upx;
		color: #82848A;
	}

	.content-item .content-text {
		width: 90%;
		font-size: 37upx;
		margin: 0 auto;
		margin-top: 10upx;
	}

	.content-item .content-price {
		margin-left: 95upx;
		width: 90%;
		font-size: 50upx;
		font-weight: bolder;
		color: red;
		margin: 0 auto;
		margin-top: 10upx;
	}

	.content-item .content-content {
		width: 90%;
		font-size: 30upx;
		margin: 0 auto;
		margin-top: 10upx;
	}

	.content-item .content-imgs {
		width: 90%;
		margin: 0 auto;
		margin-top: 10upx;
		height: 202upx;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;

	}

	.content-imgs .content-img {
		width: 30%;
		height: 200upx;

	}

	.content-item .content-imgs::after {
		content: "";
		width: 30%;
	}

	.content-item .content-time {
		width: 90%;
		margin: 0 auto;
		margin-bottom: 10upx;
		margin-top: 10upx;
		text-align: right;
		font-size: 25upx;
		color: #909399;
	}

	.content-item .content-comment {
		width: 100%;
		margin-top: 10upx;
		padding: 10upx 40upx;
		background-color: rgb(245, 250, 250);
	}

	.comment {
		width: 100%;
		padding-bottom: 80upx;
	}

	.comment .comment-items {
		margin-top: 10upx;
		display: flex;
		flex-direction: column;
	}

	.comment-items .comment-item .comment-header {
		width: 95%;
		margin: 0 auto;
		margin-top: 10upx;
	}

	.comment-header .comment-user {
		margin-left: 10upx;
		font-size: 30upx;
		font-weight: bold;
		color: #2979FF;
	}

	.comment-item .comment-text {
		width: 80%;
		font-size: 33upx;
		margin-left: 95upx;

	}

	.comment-item .comment-time {
		margin-top: 20upx;
		margin-left: 95upx;
		color: #909399;
	}

	.comment-edit {
		position: fixed;
		display: flex;
		/* 	justify-content: center; */
		justify-content: space-around;
		bottom: 0%;
		right: 0;
		left: 0;
		background-color: white;
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
</style>
