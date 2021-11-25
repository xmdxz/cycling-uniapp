<template>
	<view class="wrap">
		<view class="top" style="height: 120rpx;"></view>
		<view class="content">
			<view class="title">欢迎来到骑行</view>
			<view class="title_tiny">要想骑行,优先骑行</view>
			<view class="u-demo-area">
				<u-field v-model="phone" label="账号" placeholder="请输入账号" type="text" @input="getPhone()">
				</u-field>
				<u-field v-model="password" label="密码" placeholder="请输入密码" type="text" :password=true
					@input="getPassword()">
				</u-field>
			</view>
			<view class="u-demo-area" style="margin-top: 66rpx;">
				<u-button @click="userlogin()" data-name="3333" shape="circle" size="default" type="success">登录
				</u-button>
			</view>
			<view style="text-align: center;margin-top: 39rpx;">
				<text style="color: #00BFFF">忘记密码</text>
			</view>
			<view>
				<u-toast ref="uToast" />
			</view>
		</view>
		<view class="buttom">
			<view style="padding-top: 156rpx ;"></view>
			<u-divider type="primary" borderColor="#808080" bg-color="#F7F7F7" @click="click" half-width="250"
				color="#696969" font-size="30">其他登录方式</u-divider>
			<view class="loginType">

				<view class="wechat item">
					<view class="icon">
						<u-icon size="70" name="weixin-fill" color="rgb(83,194,64)"></u-icon>
					</view>
					微信
				</view>
				<view class="QQ item">
					<view class="icon">
						<u-icon size="70" name="weibo" color="rgb(214,39,37)"></u-icon>
					</view>
					微博
				</view>
				<view class="QQ item">
					<view class="icon">
						<u-icon size="70" name="qq-fill" color="rgb(17,183,233)"></u-icon>
					</view>
					QQ
				</view>
				<view class="QQ item">
					<view class="icon">
						<u-icon size="70" name="phone-fill" color="rgb(17,183,233)"></u-icon>
					</view>
					验证码登录
				</view>
			</view>
			<view class="hint">
				<view class="agreement">

					<view class="agreement-text">
						<u-checkbox v-model="check" @change="checkboxChange" style="margin-left:20rpx ;">
							<text style="font-size: 28rpx">我已阅读并同意</text>
							<text class="link" style="font-size: 28rpx">《注册协议》</text><text
								style="font-size: 28rpx">和</text>
							<text class="link" style="font-size: 28rpx">《隐私政策》</text>
						</u-checkbox>
						<view style="text-align: center;margin-top: 20rpx;font-size: 23rpx;">骑行网@2021 All Rights Resved
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: "",
				password: "",
				erroMessage: "账号不能为空",
				check: false
			}
		},
		onLoad() {
			console.log("进入登陆页面")
		},
		methods: {

			//获得输入的手机号
			getPhone: function(e) {
				let that = this
				that.phone = event.target.value
			},
			//获取输入的密码
			getPassword: function() {
				let that = this
				that.password = event.target.value
			},

			//用户登录
			userlogin: function() {
				let that = this
				let phone = this.phone
				let password = this.password
				if (phone.length == 0 || phone.split(" ").join("").length == 0 || password.length == 0 || password
					.split(" ").join("").length == 0) {
					console.log("请输入账号密码")
					this.$refs.uToast.show({
						title: '请输入账号密码',
						// 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
						type: 'error',
						position: 'bottom',
						icon: false
					})
				} else {
					console.log("账号 =>", phone, "密码 =>", password)
					that.$u.api.userLogin({
						phone: phone,
						password: password
					}).then(res => {
						console.log("返回的结果", res)
						let token = res.header.authorization
						that.$u.vuex('vuex_token', token)
					})
				}

			}


		}

	};
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 28rpx;
		background-color: #F7F7F7;
		height: 100vh;

		.content {
			width: 620rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 10rpx;
			}

			.title_tiny {
				text-align: left;
				font-size: 25rpx;
				color: #77787C;
				margin-bottom: 50rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 36rpx 50rpx 20rpx 50rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 28rpx;
				color: $u-tips-color;

				.link {
					color: #71BFAA;
				}

				.agreement {
					display: flex;
					align-items: center;

					.agreement-text {

						color: $u-tips-color;
					}
				}
			}
		}
	}
</style>
