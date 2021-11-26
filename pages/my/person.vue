<template>
	<view v-if="info != null">
		<u-cell-group title="个人资料">
			<u-cell-item title="头像" @click="avatar()"><u-avatar class="img" size="100" slot="right-icon"></u-avatar></u-cell-item>
			<u-cell-item title="昵称" :value="info.username" @click="change('昵称')"></u-cell-item>
			<u-cell-item title="个性签名" :value="info.introduction" @click="change('个性签名')"></u-cell-item>
			<u-cell-item title="性别" :value="info.sex === -1 ? '保密' : info.sex === 0 ? '男' : '女'" @click="showOneLevel('sex')"></u-cell-item>
			<u-cell-item title="生日" :value="info.birthday" @click="showBirthday = true"></u-cell-item>
			<u-cell-item title="身高" :value="info.height + 'cm'" @click="showOneLevel('height')"></u-cell-item>
			<u-cell-item title="体重" :value="info.weight + 'kg'" @click="showOneLevel('weight')"></u-cell-item>
			<u-cell-item title="地址" :value="info.address" @click="showTreeLevel()"></u-cell-item>
		</u-cell-group>
		<u-modal v-model="show" :show-cancel-button="true" @confirm="confirm()" @cancel="cancel()">
			<view><u-field v-model="input.value" :label="input.label" :placeholder="input.placeholder"></u-field></view>
		</u-modal>
		<u-picker v-model="showBirthday" mode="time" @confirm="selectBirthday"></u-picker>
		<u-picker v-model="showMap" mode="region" @confirm="selectMap"></u-picker>
		<u-select v-model="show_sex" :default-value="default_sex" @confirm="selectSex" :list="list_sex"></u-select>
		<u-select v-model="show_weight" :default-value="default_weight" @confirm="selectWeight" :list="list_weight"></u-select>
		<u-select v-model="show_height" :default-value="default_height" @confirm="selectHeight" :list="list_height"></u-select>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info: null,
			show: false,
			showBirthday: false,
			input: {
				label: '',
				placeholder: '',
				value: null
			},
			listMap: [],
			showMap: false,
			default_sex: [0],
			default_age: [0],
			default_weight: [0],
			default_height: [0],
			show_sex: false,
			show_weight: false,
			show_height: false,
			list_sex: [
				{
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
			],
			list_weight: [
				{
					value: '-1',
					label: '保密'
				}
			],
			list_height: [
				{
					value: '-1',
					label: '保密'
				}
			]
		};
	},
	methods: {
		async selectBirthday(e) {
			let time = e.year + '-' + e.month + '-' + e.day;
			let result = await this.updateInfo({ birthday: time });
			if (result) {
				this.info.birthday = time;
				this.showBirthday = false;
			}
		},
		async selectMap(e) {
			let address = e.province.label + e.city.label + e.area.label;
			let result = await this.updateInfo({ address: address });
			if (result) {
				this.info.address = address;
				this.showMap = false;
			}
		},
		showTreeLevel() {
			this.showMap = true;
		},
		cancel() {
			this.show = !this.show;
		},
		async confirm() {
			let input = this.input;
			let info = this.info;
			if (input.value == null || input.value == '') {
				uni.showToast({
					title: '输入不能为空',
					icon: 'none'
				});
			} else {
				let result = false;
				switch (input.label) {
					case '昵称':
						result = await this.updateInfo({ username: input.value });
						if (result) {
							info.username = input.value;
						}
						break;
					case '个性签名':
						result = await this.updateInfo({ introduction: input.value });
						if (result) {
							info.introduction = input.value;
						}
						break;
					default:
						break;
				}
				input.value = '';
			}
		},
		updateInfo(params) {
			let that = this;
			return new Promise((resolve, reject) => {
				uni.showLoading();
				that.$u.api.updateInfo(params).then(res => {
					uni.hideLoading();
					if (res > 0) {
						resolve(true);
					} else {
						uni.showToast({
							title: '更新失败，请重试！'
						});
						reject(false);
					}
				});
			});
		},
		change(e) {
			this.show = !this.show;
			this.input.label = e;
			this.input.placeholder = '请输入' + e;
		},
		avatar() {
			let that = this;
			uni.chooseImage({
				count: 1,
				sizeType: 'original',
				success(e) {
					let path = e.tempFilePaths[0];
					that.info.url = path;
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
				case 'age':
					that.show_age = true;
					break;
				case 'height':
					that.show_height = true;
					break;
				case 'weight':
					that.show_weight = true;
					break;
				default:
					break;
			}
		},
		async selectSex(e) {
			let sex = e[0].label;
			let result = await this.updateInfo({ sex: sex });
			if (result) {
				this.info.sex = e[0].label;
				this.show_sex = false;
			}
		},
		async selectWeight(e) {
			let weight = e[0].label;
			let result = await this.updateInfo({ weight: weight });
			if (result) {
				this.show_weight = false;
				this.info.weight = e[0].label;
			}
		},
		async selectHeight(e) {
			let height = e[0].label;
			let result = await this.updateInfo({ height: height });
			if (result) {
				this.show_height = false;
				this.info.height = e[0].label;
			}
		}
	},

	onLoad() {
		let that = this;
		uni.showLoading();
		this.$u.api.getUserInfo().then(res => {
			if (res == null) {
				uni.hideLoading();
				uni.showToast({
					title: '系统异常，请重试！',
					icon: 'error'
				});
				uni.navigateBack();
			} else {
				uni.hideLoading();
				for (let index = 120; index < 250; index++) {
					let obj = {};
					let ins = index;
					obj.value = ins;
					obj.label = ins;
					that.list_height.push(obj);
				}
				for (let index = 30.0; index < 120.0; index++) {
					let obj = {};
					let ins = index;
					obj.value = ins;
					obj.label = ins;
					that.list_weight.push(obj);
				}
				let info = res;
				that.default_sex[0] = that.list_sex.findIndex(function(e) {
					return e.value == info.sex;
				});
				that.default_weight[0] = that.list_weight.findIndex(function(e) {
					return e.label == info.weight;
				});
				that.default_height[0] = that.list_height.findIndex(function(e) {
					return e.label == info.height;
				});
				that.info = res;
			}
		});
	}
};
</script>

<style></style>
