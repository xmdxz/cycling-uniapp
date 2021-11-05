<template>
	<view>
		<u-navbar back-text="返回" title="发布动态"></u-navbar>
		<view class="public-content">
			<view class="public-title">
				<u-input  v-model="title" type="text"
					placeholder="写标题,能吸引更多人看哦" maxlength="20" />
			</view>
			<view class="content">
				<u-input type="textarea" v-model="content"
				placeholder="说点好玩的" maxlength="500" :clearable="false" height="100" :autoHeight="false"
				></u-input>
				<u-upload ref="uUpload" :action="action" :auto-upload="false" max-count="3"></u-upload>
			</view>
			<view class="tags">
				<u-field v-model="topic" type="text" label="话题" placeholder="合适的话题能增加曝光哦" disabled right-icon="arrow-right" icon="attach" input-align="right"></u-field>
				<u-field v-model="position" type="text" label="地点" placeholder="添加地理位置可以提升曝光哦～" disabled right-icon="arrow-right" icon="map" input-align="right"></u-field>
			</view>
			<view class="btn-pub"><u-button type="primary" shape="circle" >发布</u-button></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				content: '',
				topic: '',
				position:''
			}
		},
		onLoad() {
			uni.request({
				method:'GET',
				url: 'http://localhost:5678/utils/getUploadToken',
				success(res) {
					console.log(res)
				}
			})
		},
		methods: {
			
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
	
	.public-content .content{
		margin-top: 20upx;
		border-bottom: 1upx solid #ECF5FF;
		padding-bottom: 10upx;
	}
	
	
	.btn-pub{
		position: fixed;
		width: 90%;
		bottom: 150upx;
	}
	
</style>
