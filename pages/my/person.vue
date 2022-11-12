<template>
	<view>
		<u-cell-group title="个人资料">
			<u-cell-item title="头像" @click="avatar()">
				<u-avatar class="img" :src=" info.avatar ? filters['appendUrlPrefix'](info.avatar) :'../../static/img/noLoginAvatar.png'" size="100" slot="right-icon"></u-avatar>
			</u-cell-item>
			<u-cell-item title="昵称" :value="info.username" @click="showModal(0)"></u-cell-item>
			<u-cell-item title="个性签名" :value="info.mark" @click="showModal(1)"></u-cell-item>
			<u-cell-item title="性别" :value="info.sex == 0 ? '男' : info.sex == 1 ? '女' : '保密'"
				@click="showOneLevel('sex')"></u-cell-item>
		</u-cell-group>
		<view class="btn-box flex align-center justify-center"><button class="cu-btn confirem-btn"
				@tap="editUserInfo">保存</button></view>
		<view class="cu-modal" :class="modal?'show':''">
			<view style="background-color: white;" class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{modalInfo.label}}</view>
					<view class="action" @tap="modal = false">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl" style="padding: 50rpx 20rpx;">
					<view class="cu-form-group">
						<input :placeholder="modalInfo.placeholder" class="enterCode" name="input"
							v-model="modalInfo.value"></input>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green solid-left" @tap="modal = false">算了吧</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="enterModal">想好了</view>
				</view>
			</view>
		</view>
		<view>
			<u-toast ref="uToast" />
		</view>
		<!-- <u-picker v-model="showBirthday" mode="time" @confirm="selectBirthday"></u-picker>
		<u-picker v-model="showMap" mode="region" @confirm="selectMap"></u-picker> -->
		<u-select v-model="show_sex" :default-value="default_sex" @confirm="selectSex" :list="list_sex"></u-select>
		<!-- <u-select v-model="show_weight" :default-value="default_weight" @confirm="selectWeight" :list="list_weight"></u-select>
		<u-select v-model="show_height" :default-value="default_height" @confirm="selectHeight" :list="list_height"></u-select> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modal: false,
				info: {
					username: '',
					sex: -1,
					avatar: null,
					mark: ''
				},
				show: false,
				modalInfo: {
					label: '',
					placeholder: '',
					value: null,
					type: 0
				},
				default_sex: [0],
				show_sex: false,
				list_sex: [{
						value: '-1',
						label: '保密'
					},
					{
						value: '0',
						label: '男'
					},
					{
						value: '1',
						label: '女'
					}
				]
			};
		},
		methods: {
			async editUserInfo(){
				let result = await this.$u.api.updateInfo(this.info)
				if(result){
					this.$refs.uToast.show({
						title: '更新成功',
						// 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
						type: 'success',
						icon: true,
						isTab:true,
						url:"/pages/my/my"
					});
				}
			},
			enterModal() {
				let type = this.modalInfo.type
				if (type === 0) {
					this.info.username = this.modalInfo.value
				} else {
					this.info.mark = this.modalInfo.value
				}
				this.modal = false
			},
			showModal(type) {
				switch (type) {
					case 0:
						this.modalInfo.label = "昵称"
						this.modalInfo.placeholder = "请输入昵称"
						this.modalInfo.value = this.info.username
						this.modalInfo.type = 0
						break;
					case 1:
						this.modalInfo.label = "个性签名"
						this.modalInfo.placeholder = "请输入个性签名"
						this.modalInfo.value = this.info.mark
						this.modalInfo.type = 1
						break;
					default:
						break;
				}
				this.modal = true
			},
			cancel() {
				this.show = !this.show;
			},
			async avatar() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: 'original',
					async success(e) {
						const filePaths = e.tempFilePaths;
						uni.showLoading({
							title:"上传中"
						})
						uni.uploadFile({
							url: getApp().globalData.uploadUrl,
							filePath: filePaths[0],
							name:"file",
							success(e) {
								uni.hideLoading()
								if(e.statusCode === 200){
									let result = JSON.parse(e.data)
									if(result.code == 20000){
										that.info.avatar = result.data
									}else{
										that.$refs.uToast.show({
											title: e.message,
											// 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
											type: 'error',
											icon: true
										});
									}
								}else{
									that.$refs.uToast.show({
										title: '网络错误',
										// 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
										type: 'error',
										icon: true
									});
								}
							}
						})
					}
				});
			},
			showOneLevel(e) {
				let that = this;
				that.list = [];
				let value = null;
				switch (e) {
					case 'sex':
						that.show_sex = true;
						break;
					default:
						break;
				}
			},
			selectSex(e) {
				this.info.sex = e[0].value;
				this.show_sex = false;
			}
		},

		onLoad() {
			let that = this;
			this.$u.api.getUserInfo({
				userId:this.$u.getUserId()
			}).then(res => {
				if (res) {
					let info = res;
					that.default_sex[0] = that.list_sex.findIndex(function(e) {
						return e.value == info.sex;
					});
					if (res.avatar == null || res.avatar === '' || typeof res.avatar === 'undefined') {
						delete res.avatar;
					} else {
						res.avatar = res.avatar
					}
					that.info = {
						...that.info,
						...res
					};
				}
			});
		}
	};
</script>

<style lang="scss" scoped>
	.btn-box {
		margin-top: 60rpx;

		.confirem-btn {
			width: 710rpx;
			height: 80rpx;
			background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
			border: 1rpx solid rgba(238, 238, 238, 1);
			border-radius: 40rpx;
			font-size: 30rpx;
			color: rgba(#fff, 0.9);
		}
	}
</style>
