<template>
	<view>
		<u-cell-group title="个人资料">
			<u-cell-item title="头像" @click="avatar()"><u-avatar class="img" :src="info.url" size="100" slot="right-icon"></u-avatar></u-cell-item>
			<u-cell-item title="昵称" :value="info.username" @click="change('昵称')"></u-cell-item>
			<u-cell-item title="个性签名" :value="info.personSignature" @click="change('个性签名')"></u-cell-item>
			<u-cell-item title="性别" :value="info.sex" @click="showOneLevel('sex')"></u-cell-item>
			<u-cell-item title="年龄" :value="info.age" @click="showOneLevel('age')"></u-cell-item>
			<u-cell-item title="身高" :value="info.height + 'cm'" @click="showOneLevel('height')"></u-cell-item>
			<u-cell-item title="体重" :value="info.weight + 'kg'" @click="showOneLevel('weight')"></u-cell-item>
			<u-cell-item title="地址" :value="info.address" @click="showTreeLevel()"></u-cell-item>
		</u-cell-group>
		<u-modal v-model="show" :show-cancel-button="true" @confirm="confirm()" @cancel="cancel()">
			<view><u-field v-model="input.value" :label="input.label" :placeholder="input.placeholder"></u-field></view>
		</u-modal>
		<u-select v-model="showMap" mode="mutil-column-auto" :list="listMap" @confirm="selectMap"></u-select>
		<u-select v-model="show_sex" :default-value="default_sex" @confirm="selectSex" :list="list_sex"></u-select>
		<u-select v-model="show_age" :default-value="default_age" @confirm="selectAge" :list="list_age"></u-select>
		<u-select v-model="show_weight" :default-value="default_weight" @confirm="selectWeight" :list="list_weight"></u-select>
		<u-select v-model="show_height" :default-value="default_height" @confirm="selectHeight" :list="list_height"></u-select>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info: {
				url: '',
				username: '向恶势力低头！',
				personSignature: '我最帅',
				sex: '男',
				age: 22,
				height: 178,
				weight: 65,
				address: '山西省临汾市乡宁县'
			},
			show: false,
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
			show_age: false,
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
			list_age: [
				{
					value: '-1',
					label: '保密'
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
		selectMap(e) {
			let x
			e[2].label == null? x = '':x = e[2].label
			this.info.address = e[0].label + e[1].label + x;
			/**
			 * 这里写访问后台接口进行更新
			 */
			this.showMap = false;
		},
		showTreeLevel() {
			let that = this;
			if (this.listMap.length == 0) {
				uni.showLoading({
					title: '获取地址信息中'
				});
				uni.request({
					url: 'https://restapi.amap.com/v3/config/district?subdistrict=3&key=17aba5351dab18b94199188ce6c13168',
					method: 'GET',
					dataType: 'json',
					success(res) {
						let json = that.utils.apiJsonToOwnJson(res.data.districts);
						that.listMap = json;
						that.showMap = true;
						uni.hideLoading();
					},
					fail(e) {
						uni.hideLoading();
						uni.showToast({
							title: '网络错误，请重试！',
							icon: 'none'
						});
					}
				});
			} else {
				that.showMap = true;
			}
		},
		cancel() {
			this.show = !this.show;
		},
		confirm() {
			let input = this.input;
			let info = this.info;
			if (input.value == null || input.value == '') {
				uni.showToast({
					title: '输入不能为空',
					icon: 'none'
				});
			} else {
				switch (input.label) {
					case '昵称':
						info.username = input.value;
						break;
					case '个性签名':
						info.personSignature = input.value;
						break;
					default:
						break;
				}
				input.value = '';
			}
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
					// uni.uploadFile({
					// 	url:'后端接口',
					// 	name:'相当于表单name',
					// 	fileType:'image',
					// 	filePath:path,
					// 	success(e){

					// 	}
					// })
				}
			});
		},
		/**
		 * @param {Object} e组件有bug   不能三合一 只能一个一个写了
		 */
		// 	showOneLevel(e) {
		// 		let that = this;
		// 		that.list = [];
		// 		let value = null
		// 		switch (e) {
		// 			case 'sex':
		// 				that.list = [
		// 					{
		// 						value: '-1',
		// 						label: '保密'
		// 					},
		// 					{
		// 						value: '0',
		// 						label: '男'
		// 					},
		// 					{
		// 						value: '1',
		// 						label: '女'
		// 					}
		// 				];
		// 				value = that.info.sex
		// 				that.defaultValue[0] = that.list.length
		// 				that.showOther = true;
		// 				break;
		// 			case 'age':
		// 				that.list.push({ value: '-1', label: '保密' });
		// 				for (let index = 12; index <= 70; index++) {
		// 					let obj = {};
		// 					obj.value = index;
		// 					obj.label = index;
		// 					that.list.push(obj);
		// 				}
		// 				value = that.info.age
		// 				that.defaultValue[0] = that.list.length
		// 				that.showOther = true;
		// 				break;
		// 			case 'height':
		// 				that.list.push({ value: '-1', label: '保密' });
		// 				for (let index = 120.0; index < 210.0;) {
		// 					let obj = {};
		// 					let ins = index.toFixed(1)
		// 					obj.value = ins;
		// 					obj.label = ins;
		// 					that.list.push(obj);
		// 					index = that.utils.add(index,0.1)
		// 				}
		// 				value = that.info.height
		// 				that.defaultValue[0] = that.list.length
		// 				that.showOther = true;
		// 				break;
		// 			case 'weight':
		// 				that.list.push({ value: '-1', label: '保密' });
		// 				for (let index = 30.0; index < 120.0;) {
		// 					let obj = {};
		// 					let ins = index.toFixed(1)
		// 					obj.value = ins;
		// 					obj.label = ins;
		// 					that.list.push(obj);
		// 					index = that.utils.add(index,0.1)
		// 				}
		// 				value = that.info.weight
		// 				that.defaultValue[0] = that.list.length
		// 				that.showOther = true;
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	}
		// },
		 	showOneLevel(e) {
		 		let that = this;
		 		that.list = [];
		 		let value = null
		 		switch (e) {
		 			case 'sex':
		 				that.show_sex = true
		 				break;
		 			case 'age':
		 				that.show_age = true
		 				break;
		 			case 'height':
		 				that.show_height = true
		 				break;
		 			case 'weight':
		 				that.show_weight = true
		 				break;
		 			default:
		 				break;
		 		}
		 	},
			selectSex(e){
				this.info.sex = e[0].label
			},
			selectAge(e){
				this.info.age = e[0].label
			},
			selectWeight(e){
				this.info.weight = e[0].label
			},
			selectHeight(e){
				this.info.height = e[0].label
			}
		 },
		onLoad() {
			let that = this;
			for (let index = 12; index <= 70; index++) {
				let obj = {};
				obj.value = index;
				obj.label = index;
				that.list_age.push(obj);
			}
			for (let index = 120; index < 250;index++) {
				let obj = {};
				let ins = index
				obj.value = ins;
				obj.label = ins;
				that.list_height.push(obj);
			}
			for (let index = 30.0; index < 120.0;index++) {
				let obj = {};
				let ins = index
				obj.value = ins;
				obj.label = ins;
				that.list_weight.push(obj);
			}
			let info = this.info
			that.default_sex[0] = that.list_sex.findIndex(function(e){return e.label == info.sex})
			that.default_age[0] = that.list_age.findIndex(function(e){return e.label == info.age})
			that.default_weight[0] = that.list_weight.findIndex(function(e){return e.label == info.weight})
			that.default_height[0] = that.list_height.findIndex(function(e){return e.label == info.height})
		},
		
	}

</script>

<style></style>
