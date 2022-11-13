<template>
	<view class="page" :style="!isLogin?'background-color:#F6F6F6':''">
		<view class="my-top bg-topic-theme">
			<!-- head -->

			<view class="user-info" @click="onUserInfo">
				<view class="portrait">
					<image
						:src="!user.avatar ?'../../static/img/noLoginAvatar.png':filters['appendUrlPrefix'](user.avatar)">
					</image>
					<!-- 					<view v-if="isLogin" class="userLevel round shadow">
						<text class="text-yellow text-Abc text-sm">lv 1</text>
					</view> -->
				</view>
				<view v-if="!isLogin" class="info" @tap="hrefLogin">
					<text class="text-black text-bold text-lg">未登录，点击登录~</text>
				</view>
				<view v-if="isLogin" class="info">
					<view class="nickname">
						<text>{{user.username || '未设置昵称'}}</text>
					</view>
					<view class="rank">
						<!-- <view class="cu-progress round ">
							<view class="bg-olive" :style="[{ width:progressWidth}]"></view>
						</view> -->
						<view class="grow round marginLeft">
							<!-- <text class="text-white text-xs">成长值</text> -->
							<text class="text-white marginLeft text-xs">{{user.mark || '未设置个人简介'}}</text>
							<!-- <text class="text-white marginLeft cuIcon-right text-xs"></text> -->
						</view>

					</view>
				</view>
				<view class="mystore">

				</view>
			</view>



			<!-- 关注区 -->
			<!-- 
			<view v-if="isLogin" class="focus-area">
				<view class="list" @click="follow">
					<view class="num">
						<text class="text-black text-bold">{{user.follow}}</text>
					</view>
					<view class="title">
						<text class="text-black">关注</text>
					</view>
				</view>
				<view class="list" @click="fans">
					<view class="num">
						<text class="text-black text-bold">{{user.fans}}</text>
					</view>
					<view class="title">
						<text class="text-black">粉丝</text>
					</view>
				</view>
				<view class="list">
					<view class="num">
						<text class="text-black text-bold">{{user.hot}}</text>
					</view>
					<view class="title">
						<text class="text-black">热度</text>
					</view>
				</view>
			</view>
 -->
			<!-- 			<view v-if="isLogin" class="my-card" @click="showCard" :style="isShowCard?'bottom:0rpx':'-70rpx'">
				<image class="bg-card" src="../../static/img/card_son.jpg"></image>
				<view class="label-name">
					<text class="text-white">我的名片</text>
					<text class="text-white" style="margin-left: auto;">查看</text>
				</view>

			</view> -->
		</view>

		<view v-if="!isLogin" class="noLogin-img">
			<image src="../../static/empty/empty_groupon.png"></image>
		</view>
		<view v-if="!isLogin" class="noLogin-text" @tap="hrefLogin">
			<text class="text-gray text-lg">请先登陆~</text>
		</view>
		<view v-if="isLogin" class="wallet-info">
			<view class="list" @click="collection">
				<view class="icon">
					<text class=" number">{{user.collect}}</text>
				</view>
				<view class="title">
					<text>收藏</text>
				</view>
			</view>
			<view class="list" @click="Unused">
				<view class="icon">
					<text class="number">{{user.dynamic}}</text>
				</view>
				<view class="title">
					<text>帖子</text>
				</view>
			</view>

		</view>
		<!-- 九宫格-begin -->
		<view class="myoperate" v-if="isLogin">
			<Gridme @hrefSort="hrefSort" :gridCol="gridCol" :cuIconList="cuIconList"></Gridme>
		</view>

		<!-- 九宫格-end -->
		<!-- 订单信息 -->
		<view v-if="isLogin" class="order-info">
			<view class="desc-text">
				<text class="text-black text-bold text-lg">我有需求</text>
				<text class="text-gray text-sm">闲置出售？</text>
			</view>
			<view class="issueView">
				<button class="cu-btn round lg bg-topic-theme" @tap="issue">立即发布</button>
			</view>
			<!-- <view class="list" @click="issue">
				<view class="icon">
					<text class="cuIcon-roundaddfill"></text>
				</view>
				<view class="title">
					<text>发布</text>
				</view>
			</view> -->
			<!-- <view class="list" @click="onSkipOrder(3)">
				<view class="icon">
					<text class="iconfont icon-daishouhuo"></text>
					
				</view>
				<view class="title">
					<text>清华大学</text>
				</view>
			</view> -->
		</view>
		<!-- 钱包 -->
		<!-- 	积分，付款码
		<view v-if="isLogin" class="integral-payment">
			<view class="list" @click="SignIn">
				<view class="title">
					<text class="iconfont icon-qiandao" style="font-weight: bold;"></text>
					<text>签到</text>
				</view>
				<view class="mess">
					<text>每日签到 领取积分</text>
				</view>
			</view>
			<view class="list" @click="ToCode">
				<view class="title">
					<text class="iconfont icon-fukuanma"></text>
					<text>收款码/联系方式</text>
				</view>
				<view class="mess">
					<text>一键推送 快捷收款</text>
				</view>
			</view>
		</view> -->
		<!-- 我的服务 -->
		<!-- <view v-if="isLogin" class="my-service">
			<view class="title">
				<text>我的服务</text>
			</view>
			<view class="service-list">
				<view class="list">
					<view class="thumb">
						<text class="cuIcon-writefill"></text>
					</view>
					<view class="name">
						<text>意见反馈</text>
					</view>
				</view>
				<view class="list" @click="onServer('serve')">
					<view class="thumb">
						<text class="cuIcon-commandfill"></text>
					</view>
					<view class="name">
						<text>客服交流</text>
					</view>
				</view>

			</view>
		</view>
 -->
		<!-- 客服热线 -->
		<!-- <view class="serve-hotline" @click="isHotline = false">
			<view class="cu-modal bottom-modal" :class="{'show':isHotline}">
				<view class="cu-dialog">
					<view class="contact-list">
						<view class="list">
							<text>群号</text>
						</view>
						<view class="list">
							<text style="color: #959595;">40574850</text>
						</view>
						<view class="list">
							<text>取消</text>
						</view>
					</view>
				</view>
			</view>
		</view> -->

		<u-tabbar v-model="tabBarCurrent" :list="tabBarList" :mid-button="true" mid-button-size="90"></u-tabbar>
	</view>
</template>

<script>
	import Gridme from "@/components/gridme.vue"
	import {
		mapMutations
	} from "vuex"
	export default {
		components: {
			Gridme
		},
		data() {
			return {
				tabBarCurrent: 0,
				scrollTop: 0,
				isHotline: false,
				progressWidth: "0%",
				isShowCard: false,
				isLogin: true,
				user: {},
				gridCol: 3,
				cuIconList: [{
						cuIcon: 'shopfill',
						color: 'orange',
						badge: '',
						name: '我发布的',
						type: 0
					},
					{
						cuIcon: 'roundcheckfill',
						color: 'orange',
						badge: '',
						name: '我卖出的',
						type: 1
					},
					{
						cuIcon: 'writefill',
						color: 'orange',
						badge: '',
						name: '我买到的',
						type: 2
					}
				]
			}
		},
		async onShow() {
			// //每次显示本界面时都会更新最新数据（不访问数据库）
			// try {
			// 	const Auth = uni.getStorageSync('Auth');
			// 	if (Auth.isLogin) {
			// 		this.isLogin = true
			// 		this.user = this.$store.state.user.user
			// 		this.progressWidth = this.user.grow + "%"
			// 		this.isShowCard = true
			// 	} else {
			// 		this.isLogin = false
			// 	}
			// } catch (e) {
			// 	uni.showToast({
			// 		title: "数据异常，请重试~",
			// 		duration: 1500
			// 	})
			// }

			let userInfo = await this.$u.api.userInfo({
				userId: this.$u.getUserId()
			})
			this.user = userInfo.userInfo
			this.user.collect = userInfo.collect
			this.user.dynamic = userInfo.dynamic
			this.cuIconList[0].badge = userInfo.publish === 0 ? "" : userInfo.publish
			this.cuIconList[1].badge = userInfo.sold === 0 ? "" : userInfo.sold
			this.cuIconList[2].badge = userInfo.buy === 0 ? "" : userInfo.buy
		},
		onHide: function() {
			this.isShowCard = false
		},
		mounted() {
			// //第一次进入本界面时都会更新最新数据（访问数据库）
			// try {
			//     const Auth = uni.getStorageSync('Auth');
			//     if (Auth.isLogin) {
			// 		uni.showLoading({})
			// 		uniCloud.callFunction({
			// 			name: 'selectUser',
			// 			data: {
			// 				phone: Auth.phone
			// 			}
			// 		}).then((res) => {
			// 			this.user = res.result.data[0]
			// 			this.isLogin=true
			// 			this.progressWidth = this.user.grow+"%"
			// 			this.isShowCard=true
			// 			this.$store.commit("user/setUser", this.user)
			// 			uni.hideLoading()
			// 		}).catch((err) => {
			// 			uni.hideLoading()
			// 			uni.showModal({
			// 				content: `操作失败：${err.message}`,
			// 				showCancel: false
			// 			})
			// 		})
			//     }
			// 	else{
			// 		this.isLogin=false
			// 	}
			// } catch (e) {
			// 	uni.showToast({
			// 		title:"数据异常，请重试~",
			// 		duration:1500
			// 	})
			// }
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad() {
			this.tabBarList = this.$u.getTabList();
		},
		methods: {
			issue(){
				this.$Router.push({name:"publicdynamic"})
			},
			hrefSort(item) {
				this.$router.push({
					name: "order",
					params: {
						type: item.type
					}
				})
			},
			collection() {
				this.$router.push({
					name: "collect"
				})
			},
			Unused() {
				this.$router.push({
					name: "collect-dynamic"
				})
			},
			/**
			 * 用户信息点击
			 * @param {Number} type
			 */
			onUserInfo() {
				this.$router.push({
					name: "person"
				})
			},
			//登陆
			hrefLogin() {
				this.$router.push({
					name: "login"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'my.scss';

	.marginLeft {
		margin-left: 2px;
	}

	.myoperate {
		width: 94%;
		margin: 20rpx auto;
		margin-left: 3%;
		border-radius: 20rpx;
		overflow: hidden;
	}
</style>
