<template>
	<view class="wrap">
		<view id="top"></view>
		<view class="content">
			<view class="title">欢迎注册闲鱼</view>
			<view class="title_tiny">专注于二手交易</view>
			<view class="u-demo-area">
				<u-field v-model="phone" label="手机号" placeholder="请输入手机号" type="text">
				</u-field>
				<u-field v-model="password" :value="11" label="密码" placeholder="请输入密码" :password="true" type="text"
					>
<!-- 					<u-button v-if="true" @click="getCode()" :disabled="phone? false:true" slot="right" size="mini"
						type="success">获取验证码</u-button> -->
				</u-field>
			</view>
			<view class="u-demo-area" id="u-demo-area-id">
				<u-button @click="registry()" data-name="3333" shape="circle" size="default" type="success">注册
				</u-button>
			</view>
	<!-- 		<view id="forget">
				<text style="color: #00BFFF">忘记密码?</text>
			</view> -->
			<view>
				<u-toast ref="uToast" />
			</view>
		</view>
		<view class="buttom">
			<u-divider type="primary" borderColor="#808080" bg-color="#F7F7F7" @click="click" half-width="250"
				color="#696969" font-size="30">其他登录方式</u-divider>
			<view class="loginType">
<!-- 
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
				</view> -->
				<view class="QQ item" @click="passwordLogin()">
					<view class="icon">
						<u-icon size="70" name="phone-fill" color="rgb(17,183,233)"></u-icon>
					</view>
					登录
				</view>
			</view>
			<view class="hint">
				<view class="agreement">

					<view class="agreement-text">
						<u-checkbox v-model="check" @change="checkboxChange" id="agreement-text-1" name="1">
							<text id="agreement-text-text1">我已阅读并同意</text>
							<text class="link" id="agreement-text-text1">《注册协议》</text><text
								id="agreement-text-text1">和</text>
							<text class="link" id="agreement-text-text1">《隐私政策》</text>
						</u-checkbox>
						<view id="agreement-text-text2">闲鱼网@2022 All Rights Resved
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
				check: false
			}
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
			//获取是否勾选协议
			checkboxChange(e) {
				console.log(e);
				let that = this
				that.check = e.value
			},
			//密码登录
			passwordLogin:function()
			{
				uni.redirectTo({
					url: './index'
				})
			},
			// //自动填写验证码
			// getCode: function() {
			// 	let that = this
			// 	that.$u.api.getCode(that.phone).then(res => {
			// 		console.log("验证码", res)
			// 		that.password = res.msg
			// 	})
			// },
			//用户登录
			async registry() {
				let that = this
				let phone = that.phone
				let password = that.password
				console.log(password)
				let check = that.check
				if (phone == null || phone.length == 0 || phone.split(" ").join("").length == 0 || password == null || password.length == 0 || password
					.split(" ").join("").length == 0) {
					that.$refs.uToast.show({
						title: '请输入手机号验证码',
						// 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
						type: 'error',
						position: 'bottom',
						icon: true
					})
				} else {
					if (!check) {
						that.$refs.uToast.show({
							title: '请先阅读协议',
							// 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
							type: 'error',
							position: 'bottom',
							icon: true
						});
					} else {
						let result = await that.$u.api.registry({
							phone: phone,
							password: password
						})
						if(result){
							that.$refs.uToast.show({
								title: '注册成功,请登录',
								// 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
								type: 'success',
								icon: true,
								url:'/pages/login/index'
							})
						}
					}
				}

			}


		}

	};
</script>

<style lang="scss" scoped>
	#agreement-text-text2 {
		text-align: center;
		margin-top: 20rpx;
		font-size: 23rpx;
	}

	#agreement-text-text1 {
		font-size: 28rpx;
	}

	#agreement-text-1 {
		margin-left: 39rpx;
	}

	#top {
		height: 120rpx;
	}

	#u-demo-area-id {
		margin-top: 66rpx;
	}


	#forget {
		text-align: center;
		margin-top: 39rpx;
	}

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
			position: absolute;
			width: 100%;
			bottom: 15rpx;
			.loginType {
				display: flex;
				padding: 36rpx 50rpx 20rpx 50rpx;
				justify-content: center;

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
