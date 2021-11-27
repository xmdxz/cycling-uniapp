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
				<u-field type="text" label="话题" :placeholder="topicPlaceholder" disabled
					right-icon="arrow-right" icon="attach" input-align="right" @click="showTopic()"></u-field>
				<u-field v-model="position" type="text" label="地点" :placeholder="regionPlaceholder" @click="showRegion()" disabled
					right-icon="arrow-right" icon="map" input-align="right"></u-field>
			</view>
			<view class="btn-pub">
				<u-button type="primary" shape="circle" @click="public()">发布</u-button>
			</view>
		</view>

		<view>
			<u-popup v-model="topicShow" mode="center" width="550rpx" height="700rpx">
				<view class="topic">
					<view class="topic-search">
						<u-search placeholder="请输入搜索的话题" v-model="searchTopic"></u-search>
					</view>
					<view class="topic-content">
						<view class="new-topic">
							<u-tag text="新建话题" type="success" mode="light" shape="circle"></u-tag>
						</view>
						<view class="topic-item" v-for="item in topicList">
							<u-tag :text="item.topicName" type="info" mode="light" shape="circle" @click="addTopicSelected(item)"></u-tag>
						</view>
						
						<view class="next-topic">
							<u-tag text="换一批" type="warning" mode="light" shape="circle" @click="nextTopic()"></u-tag>
						</view>
					</view>
					<view class="topic-selected">
						<view class="topic-item" v-for="item in topicSelectedList">
							<u-tag :text="item.topicName" type="error" mode="light" shape="squire" :closeable="true"
							size="mini"
							@close="deleteTopicSelected(item)"
							></u-tag>
						</view>
					</view>
				</view>
			</u-popup>
			
		</view>
		<u-toast ref="noDataToast"></u-toast>
		
		<u-picker mode="region" v-model="regionShow" :safe-area-inset-bottom="true"
		@confirm="getRegionData"
		:default-region="regionSelected"
		></u-picker>
	</view>
</template>

<script>
	const qiniu = require('qiniu-js')
	export default {
		data() {
			return {
				title: '',
				content: '',
				topicList: [],
				topicSelectedList: [],
				position: '',
				action: '',
				uploadToken: '',
				putExtra: {},
				config: {},
				imgPushList: [],
				topicShow: false,
				searchTopic: '',
				pageNum: 1,
				pageSize: 3,
				regionShow: false,
				regionSelected: [],
				
			}
		},
		computed:{
			topicPlaceholder: function(){
				if(this.topicSelectedList.length>0){
					return "当前已选择"+this.topicSelectedList.length+"个话题"
				}
				return "合适的话题可以增加曝光率哦~"
			},
			
			regionPlaceholder: function(){
				if(this.regionSelected.length==0){
					return "添加地理位置可以提升曝光哦~"
				}
				return this.regionSelected[0]+"-"+this.regionSelected[1]+"-"+this.regionSelected[2]
			}
		},
		onLoad() {
			//获取上传token
			this.getUploadToken()

		},
		methods: {
			async getUploadToken() {
				// 异步获取token
				this.uploadToken = await this.$u.api.getUploadToken()
			},
			public() {
			    this.uploadImg()
				console.log(this.imgPushList)
				this.$u.api.publicDynamic({
					
				})
			},

		    uploadImg() {
				const options = {
					quality: 0.8,
					noCompressIfLarger: true
				}
				//拿到文件数组
				let files = this.$refs.uUpload.lists
				console.log(files)
				//循环遍历每一个文件，上传到七牛云
				for (let i = 0; i < files.length; i++) {
					let currentFile = files[i].file
					qiniu.compressImage(currentFile, options).then(data => {
						const observable = qiniu.upload(data.dist, null, this.uploadToken, this.putExtra, this
							.config)
						const subscription = observable.subscribe({
							next: (result) => {
								uni.showLoading({
									title:'正在上传第'+(i+1)+'张图片'
								})
								console.warn(result)
							},
							error: () => {
								console.log('upload error')
							},
							complete: (res) => {
								uni.showLoading({
									title:'第'+(i+1)+'张图片上传成功'
								})
								this.imgPushList.push(res.key)
								uni.hideLoading()
							}
						}) // 上传开始
					})
				}

			},
			async showTopic() {
				this.pageNum = 1
				// 异步获取话题
				let res = await this.$u.api.getAllTopic({
					pageNum: this.pageNum,
					pageSize: this.pageSize
				})
				this.topicList = res
				this.topicShow = true
			},
			
			async nextTopic(){
				this.pageNum++;
				
				let res = await this.$u.api.getAllTopic({
					pageNum: this.pageNum,
					pageSize: this.pageSize
				})
				
				if	(res.length < this.pageSize){
					this.$refs.noDataToast.show({
						title: '没有话题了哦'
					})
				}
				
				this.topicList = res
			},
			
			addTopicSelected(item){
				// 判断话题不能添加超过3个
				if(this.topicSelectedList.length>2){
					this.$refs.noDataToast.show({
						title: '最多添加三个话题哦'
					})
					return 
				}
				
				// 判断话题是否已添加过
				for(let i=0;i<this.topicSelectedList.length;i++){
					
					if(this.topicSelectedList[i].id === item.id){
						this.$refs.noDataToast.show({
							title: '当前话题已添加了哦'
						})
						return 
					}
				}
				this.topicSelectedList.push(item)
			},
			
			deleteTopicSelected(item){
				for(let i=0;i<this.topicSelectedList.length;i++){
					if(this.topicSelectedList[i].id === item.id){
						console.log(i)
						this.topicSelectedList.splice(i,1)
					}
				}
				console.log(this.topicSelectedList)
			},
			
			showRegion(){
				this.regionShow = true
			},
			getRegionData(e){
				this.regionSelected = []
				this.regionSelected.push(e.province.label)
				this.regionSelected.push(e.city.label)
				this.regionSelected.push(e.area.label)
				
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

	.topic-search {
		width: 90%;
		margin: 0 auto;
		margin-top: 20rpx;

	}

	.topic-content {
		width: 90%;
		margin: 0 auto;
		margin-top: 20rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.topic {
		position: relative;
		height: 100%;
	}

	.new-topic {
		margin: 10rpx 0;
		/* margin-bottom: 10rpx; */
	}

	.next-topic{
		margin: 10rpx 0;
	}
	.topic-content .topic-item {
		margin: 10rpx 10rpx 10rpx 0;
		/* margin-bottom: 10rpx; */
	}

	.topic-selected {
		padding-top: 5rpx;
		padding-left: 5rpx;
		padding-bottom: 20rpx;
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 130rpx;
		background-color: #F9F9F9;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}
	
	.topic-selected .topic-item{
		margin: 0rpx 5rpx 0 0;
		height: 40rpx;
	}
</style>
