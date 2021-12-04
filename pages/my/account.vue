<template>
	<view>
		<view>
			<u-cell-group title="账户与安全">
				<u-collapse @change="showBody">
					<u-collapse-item :showLoading="modifyPassword.showLoading" :title="modifyPassword.head">修改密码</u-collapse-item>
					<u-collapse-item :showLoading="accountCancellation.showLoading" :title="accountCancellation.head">
						<u-modal
							:show-cancel-button="true"
							@confirm="confirm()"
							:confirm-text="'确认注销'"
							v-model="accountCancellation.showProtocol"
							:show-title="false"
							:title-style="{ color: 'red' }"
							:async-close="accountCancellation.showButtonLoading"
						>
							<scroll-view @scrolltolower="readed()" :scroll-y="true">
								<view class="slot-content"><rich-text :nodes="accountCancellation.protocol"></rich-text></view>
							</scroll-view>
						</u-modal>
						<view class="blank"></view>
						<view class="logout"><u-button size="default" shape="circle" @click="cancellation()">退出登录</u-button></view>
					</u-collapse-item>
				</u-collapse>
			</u-cell-group>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			modifyPassword: {
				head: '修改密码',
				body: 'asd',
				showLoading: false
			},
			accountCancellation: {
				readedProtocol: false,
				showProtocol: false,
				head: '注销账号',
				showLoading: false,
				showButtonLoading:false,
				protocol:
					'<div ><p>您在申请注销流程中点击同意前，应当认真阅读《帐号注销协议》（以下简称“本协议”）。<strong>特别提醒您，当您成功提交注销申请后，即表示您已充分阅读、理解并接受本协议的全部内容。阅读本协议的过程中，如果您不同意相关任何条款，请您立即停止帐号注销程序。</strong>如您对本协议有任何疑问，可通过客服专区联系我们的客服。</p><p>1. 如果您仍欲继续注销帐号，您的帐号需同时满足以下条件：</p><p>（1）帐号不在处罚状态中，且能正常登录；</p><p>（2）帐号最近一个月内并无修改密码、修改关联手机、绑定手机记录。</p><p>2.您应确保您有权决定该帐号的注销事宜，不侵犯任何第三方的合法权益，如因此引发任何争议，由您自行承担。</p><p>3.您理解并同意，账号注销后我们无法协助您重新恢复前述服务。请您在申请注销前自行备份您欲保留的本帐号信息和数据。</p><p>4.帐号注销后，已绑定的手机号、邮箱将会被解除绑定。</p><p><strong>5.注销帐号后，您将无法再使用本帐号，也将无法找回您帐号中及与帐号相关的任何内容或信息，包括但不限于：</strong></p><p><strong>（1）您将无法继续使用该帐号进行登录；</strong></p><p><strong>（2）您帐号的个人资料和历史信息（包含昵称、头像、消息记录等）都将无法找回；</strong></p><p><strong>（3）您理解并同意，注销帐号后，您曾获得的充值余额、游戏道具、礼品券及其他虚拟财产等将视为您自愿、主动放弃，无法继续使用，由此引起一切纠纷由您自行处理，我们不承担任何责任。</strong></p><p><strong>6.在帐号注销期间，如果您的帐号被他人投诉、被国家机关调查或者正处于诉讼、仲裁程序中，我们有权自行终止您的帐号注销程序，而无需另行得到您的同意。</strong></p><p><strong>7.请注意，注销您的帐号并不代表本帐号注销前的帐号行为和相关责任得到豁免或减轻。</strong></p><p>8.本协议未尽事宜，参照《<a href="//id.duoyi.com/html/service-agreement.html" target="_blank">多益游戏许可及服务协议</a>》、《<a href="//id.duoyi.com/html/xieyi.html" target="_blank">多益战盟帐号服务条款</a>》执行。</p></div>'
			}
		};
	},
	methods: {
		showBody(e) {
			console.log(e);
		},
		cancellation() {
			this.accountCancellation.showProtocol = true;
		},
		readed() {
			this.accountCancellation.readedProtocol = true;
		},
		async confirm() {
			let that = this;
			if (!this.accountCancellation.readedProtocol) {
				this.$refs.uToast.show({
					title: '请阅读协议内容',
					type: 'warning'
				});
				this.accountCancellation.showProtocol = true;
			} else {
				this.accountCancellation.showProtocol = true;
				this.accountCancellation.showButtonLoading = true
				let deleteResult = await that.$u.api.accountCancellation()
				this.accountCancellation.showProtocol = false;
				this.accountCancellation.showButtonLoading = false;
				that.$store.commit('deleteToken')
				that.$Router.replace({name:'login'})
			}
		}
	},
};
</script>

<style>
.blank {
	height: 50rpx;
	margin: 20rpx;
}
.logout {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	margin: 50rpx auto;
}
.slot-content {
	font-size: 28rpx;
	padding: 30rpx;
	height: 1000rpx;
}
</style>
