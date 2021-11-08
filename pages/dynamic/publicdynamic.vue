<template>
	<view>
		<u-navbar back-text="返回" title="发布动态"></u-navbar>
		<view class="public-content">
			<view class="public-title">
				<u-input v-model="title" type="text" placeholder="写标题,能吸引更多人看哦" maxlength="20" />
			</view>
			<view class="content">
				<u-input type="textarea" v-model="content" placeholder="说点好玩的" maxlength="500" :clearable="false"
					height="100" :autoHeight="false"></u-input>
				<u-upload ref="uUpload" :action="action" :auto-upload="false" max-count="3"></u-upload>
			</view>
			<view class="tags">
				<u-field v-model="topic" type="text" label="话题" placeholder="合适的话题能增加曝光哦" disabled
					right-icon="arrow-right" icon="attach" input-align="right"></u-field>
				<u-field v-model="position" type="text" label="地点" placeholder="添加地理位置可以提升曝光哦～" disabled
					right-icon="arrow-right" icon="map" input-align="right"></u-field>
			</view>
			<view class="btn-pub">
				<u-button type="primary" shape="circle" @click="public()">发布</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	const qiniu = require('qiniu-js')
	export default {
		data() {
			return {
				title: '',
				content: '',
				topic: '',
				position: '',
				action: '',
				uploadToken: '',
				putExtra: {},
				config: {}
			}
		},
		onLoad() {
			//获取上传token
			this.getUploadToken()

		},
		methods: {
			async getUploadToken() {
				// 异步获取token
				let token =await this.$u.api.getUploadToken()
			},
			async public() {
				const options = {
					quality: 0.8,
					noCompressIfLarger: true
				}
				//拿到文件数组
				let files = this.$refs.uUpload.lists
				console.log(files)
				//循环遍历每一个文件，上传到七牛云
				for(let i=0;i<files.length;i++){
					let currentFile = files[i].file
					qiniu.compressImage(currentFile, options).then(data => {
						const observable = qiniu.upload(data.dist, null, this.uploadToken, this.putExtra, this.config)
						const subscription = observable.subscribe({
							next: (result)=>{
								console.warn(result)
							},
							error: ()=>{
								console.log('upload error')
							},
							complete: (res)=>{
								console.log(res)
							}
						}) // 上传开始
					})
				}
				
				
			}
		}
	}
</script>

<style>
	.public-content {
		width: 90%;
		margin: 0 auto;
	}

	.public-content .public-title {
		margin-top: 10upx;
		border-bottom: 1upx solid #ECF5FF;
		padding-bottom: 10upx;

	}

	.public-content .content {
		margin-top: 20upx;
		border-bottom: 1upx solid #ECF5FF;
		padding-bottom: 10upx;
	}


	.btn-pub {
		position: fixed;
		width: 90%;
		bottom: 150upx;
	}
</style>
