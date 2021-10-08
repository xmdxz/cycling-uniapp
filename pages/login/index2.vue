<template>
	<view class="wrap">
		<view class="top" style="height: 10rpx;"></view>
		<view class="content">
			<view class="title">欢迎来到骑行</view>
			<view class="title_tiny">要想骑行,优先骑行</view>
			<view class="u-demo-area">
				<u-field
					v-model="mobile"
					label="手机号"
					placeholder="请填写手机号"
					type="text"
				>
				</u-field>
				<u-field
					v-model="code"
					label="验证码"
					placeholder="请填写验证码"
				>
					<u-button v-if="true" slot="right" size="mini" type="success">获取验证码</u-button>
				</u-field>
			</view>
		    <view class="u-demo-area" style="margin-top: 50rpx;">
		    	<u-button @click="btnClick" data-name="3333"   shape="circle" size="default" ripple="true"  type="success">注册/登录</u-button>
		    </view>
		</view>
		<view class="buttom">
			<view style="padding-top: 200rpx ;"></view>
			<u-divider type="primary" borderColor="#808080" bg-color="#F7F7F7" @click="click"
			half-width="250" color="#696969" font-size="30">其他登录方式</u-divider>			
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
						<u-icon size="70" name="lock" color="rgb(17,183,233)"></u-icon>
					</view>
					密码登录
				</view>
			</view>
			<view class="hint">
				<view class="agreement">
					
					<view class="agreement-text">
						<u-checkbox v-model="check" @change="checkboxChange" style="margin-left:20rpx ;">
							我已阅读并同意
							<text class="link">《注册协议》</text>和
							<text class="link">《隐私政策》</text>
						</u-checkbox>
						<view style="text-align: center;margin-top: 20rpx;">骑行网@2021 All Rights Resved</view>
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
				tel: ''
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				if (this.tel) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
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
			width: 600rpx;
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
