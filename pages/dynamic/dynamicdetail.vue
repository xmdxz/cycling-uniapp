<template>
	<view>
		<u-navbar back-text="返回" title="动态详情"></u-navbar>
		<view class="content-item">
			<view class="content-header">
				<u-avatar :src="avatar|appendUrlPrefix" style="vertical-align: middle;" size="large"></u-avatar>
				<view class="content-authorinfo">
					<text class="content-user">{{username}}</text>
					<text class="content-level">{{level}}</text>
				</view>
			</view>
			<view class="content-text">
				{{content}}
			</view>
			<view class="content-imgs">
				<image v-for="(item,index) in imgs" :src="item.imageUrl|appendUrlPrefix" :key="index" class="content-img"></image>
			</view>
			<view class="content-time">
				<text>2021年7月19日13时40分</text>
			</view>
			<view class="content-menu">

			</view>
			<view class="diver" style="width: 100%;height: 20upx;background-color: #DCDFE6;"></view>
			<view class="comment">
				<view class="comment-title u-m-l-30 u-m-t-10 u-m-r-30">
					<u-section title="热门回复" :right="false"></u-section>
				</view>
				<view class="comment-items">
					<view class="comment-item" v-for="(item,index) in comments" :key="index">
						<view class="comment-header">
							<u-avatar :src="item.commentAvatar|appendUrlPrefix" style="vertical-align: middle" size="mini"></u-avatar>
							<text class="comment-user">{{item.commentUsername}}</text>
							<view style="float: right;margin-top: 15upx;margin-right: 45upx;">
								<u-icon name="thumb-up" size="35"></u-icon>
							</view>
						</view>
						<view class="comment-text">
							{{item.commentContent}}
						</view>
						<view class="comment-time">
							{{item.commentTime}}
						</view>
					</view>

					<!-- <view class="comment-item">
						<view class="comment-header">
							<u-avatar :src="src" style="vertical-align: middle" size="mini"></u-avatar>
							<text class="comment-user">张三</text>
							<view style="float: right;margin-top: 15upx;margin-right: 45upx;">
								<u-icon name="thumb-up" size="35"></u-icon>
							</view>
						</view>
						<view class="comment-text">
							大力支持,到时候一定参加!
						</view>
						<view class="comment-time">
							1小时前
						</view>
					</view> -->

					

					
				</view>

			</view>
		</view>


		<view class="comment-edit">
			<u-button type="primary" size="medium" :ripple="true" @click="popupShow=true">回复此动态</u-button>
		</view>

		<view>
			<u-popup v-model="popupShow" mode="bottom" border-radius="10"  :closeable="true" close-icon-pos="top-left" close-icon-size="30">
				<view class="reply"><text>回复</text></view>
				<view class="popup-comment">
					<u-input v-model="commentValue" type="textarea" :border="true"  :autoHeight="true"/>
				</view>
				
			</u-popup>
			
		</view>
	</view>
</template>

<script>
	import filters from '../../common/filters.js'
	export default {
		data() {
			return {
				avatar: '',
				level:'',
				username: '',
				content: '',
				imgs: [],
				comments: [],
				popupShow: false,
				commentValue: '',
				dynamicId: 0,
			}
		},
		
		onLoad(e) {
			this.dynamicId = e.id
			this.getDynamicDetailById();
		},
		methods: {
			async getDynamicDetailById(){
				let res = await this.$u.api.getDynamicById({
					id: this.dynamicId
				})
				console.log(res)
				this.avatar = res.avatar
				this.level = res.level
				this.username = res.username
				this.content = res.content
				this.imgs = res.imgs
				this.comments = res.comments
			}
		}
	}
</script>

<style>
	.content-item {
		width: 100%;
	}

	.content-item .content-header {
		margin-left: 30upx;
		margin-top: 10upx;
		display: flex;
		justify-content: flex-start;
	}

	.content-header .content-authorinfo {
		margin-top: 20upx;
		margin-left: 20upx;
		display: flex;
		flex-direction: column;
	}

	.content-header .content-authorinfo .content-user {
		font-size: 35upx;
	}

	.content-header .content-authorinfo .content-level {
		font-size: 25upx;
		color: #82848A;
	}

	.content-item .content-text {
		width: 90%;
		font-size: 37upx;
		margin: 0 auto;
		margin-top: 10upx;
	}

	.content-item .content-imgs {
		width: 90%;
		margin: 0 auto;
		margin-top: 10upx;
		height: 202upx;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;

	}

	.content-imgs .content-img {
		width: 30%;
		height: 200upx;

	}

	.content-item .content-imgs::after {
		content: "";
		width: 30%;
	}

	.content-item .content-time {
		width: 90%;
		margin: 0 auto;
		margin-bottom: 10upx;
		margin-top: 10upx;
		text-align: right;
		font-size: 25upx;
		color: #909399;
	}

	.content-item .content-comment {
		width: 100%;
		margin-top: 10upx;
		padding: 10upx 40upx;
		background-color: rgb(245, 250, 250);
	}

	.comment {
		width: 100%;
		padding-bottom: 80upx;
	}

	.comment .comment-items {
		margin-top: 10upx;
		display: flex;
		flex-direction: column;
	}

	.comment-items .comment-item .comment-header {
		width: 95%;
		margin: 0 auto;
		margin-top: 10upx;
	}

	.comment-header .comment-user {
		margin-left: 10upx;
		font-size: 30upx;
		font-weight: bold;
		color: #2979FF;
	}

	.comment-item .comment-text {
		width: 80%;
		font-size: 33upx;
		margin-left: 95upx;

	}

	.comment-item .comment-time {
		margin-top: 20upx;
		margin-left: 95upx;
		color: #909399;
	}

	.comment-edit {
		width: 40%;
		margin: auto;
		position: fixed;
		bottom: 1%;
		right: 0;
		left: 0;
	}
	
	.popup-comment{
		margin-top: 80upx;
	}
	
	.reply{
		position: fixed;
		top: 30upx;
		right: 20upx;
		color: #2B85E4;
	}
</style>
