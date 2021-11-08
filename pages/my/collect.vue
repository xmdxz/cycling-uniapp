<template>
	<view>
		<u-sticky><u-tabs :list="list" :current="current" :is-scroll="false" :item-width="windowWidth" @change="changeTabs"></u-tabs></u-sticky>
		<!-- <view class="u-card-wrap">
			<u-card @click="click" @head-click="headClick" :title="title" :sub-title="subTitle" :thumb="thumb" :padding="padding" :border="border">
				<view class="" slot="body"> 
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item map"><map id="map" :latitude="latitude" :longitude="longitude" :polyline="lineArray" ></map></view>
						<view class="u-body-item-title u-line-2">
							凤凰山山路骑行，环山公路骑行。一起感受速度与激情的碰撞，山路速降，32km长速降赛道。
						</view>
						
					</view>
				</view>
				<view class="" slot="foot">
						<u-tag class="tags" :text="text" :type="type" :shape="shape" :closeable="false" :mode="mode_tag" :show="true" :size="size" />
						<u-tag class="tags" text="风景" type="success" :shape="shape" :closeable="false" :mode="mode_tag" :show="true" :size="size" />
						<u-tag class="tags" text="耐力" type="warning" :shape="shape" :closeable="false" :mode="mode_tag" :show="true" :size="size" />
						<view class="more">
							<u-icon @click="mores()" name="more-dot-fill"></u-icon>
						</view>
				</view>
			</u-card>
		</view> -->
		<view v-if="current == 0">
			0
			<view class="more"><u-loadmore @loadmore="loadmoreByCollect()" :status="activity" /></view>
		</view>
		<view v-if="current == 1">
			<view v-for="(item, index) in dynamicList" :key="index" @click="toDynamic(item.id)">
				<view class="content-item">
					<view class="content-header">
						<u-avatar :src="item.avatar" style="vertical-align: middle;"></u-avatar>
						<view class="content-authorinfo">	
						<text class="content-user">{{ item.contentuser }}</text>	
						<text class="content-level">{{ item.contentlevel }}</text>
						</view>
					</view>
					<view class="content-text">{{ item.contenttext }}</view>
					<view class="content-time">
						<text>{{ item.contenttime }}</text>
					</view>
					<view class="content-comment">
						<view class="comment-item" v-for="(item, index) in item.commentitems" :key="index">
							<view class="comment-user">{{ item.user }}:</view>
							<view class="comment-text">{{ item.text }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="more"><u-loadmore @loadmore="loadmoreByDynamic()" :status="dynamic" /></view>
		</view>
	</view>
</template>

<script>
import app from '../../App.vue';
export default {
	data() {
		return {
			list: [
				{
					name: '动态'
				},
				{
					name: '活动'
				}
			],
			dynamicList:[
				{
					id:0,
					avatar:'/static/img/1.jpg',
					contentuser:'向恶势力低头！',
					contentlevel:'asd',
					contenttext:'阿斯顿撒',
					contenttime:'2021-13-131-2',
					commentitems:[

					]
				},
				{
					id:0,
					avatar:'/static/img/1.jpg',
					contentuser:'向恶势力低头！',
					contentlevel:'asd',
					contenttext:'阿斯顿撒',
					contenttime:'2021-13-131-2',
					commentitems:[
				
					]
				},
				{
					id:0,
					avatar:'/static/img/1.jpg',
					contentuser:'向恶势力低头！',
					contentlevel:'asd',
					contenttext:'阿斯顿撒',
					contenttime:'2021-13-131-2',
					commentitems:[
				
					]
				},
				{
					id:0,
					avatar:'/static/img/1.jpg',
					contentuser:'向恶势力低头！',
					contentlevel:'asd',
					contenttext:'阿斯顿撒',
					contenttime:'2021-13-131-2',
					commentitems:[
				
					]
				},
				{
					id:0,
					avatar:'/static/img/1.jpg',
					contentuser:'向恶势力低头！',
					contentlevel:'asd',
					contenttext:'阿斯顿撒',
					contenttime:'2021-13-131-2',
					commentitems:[
				
					]
				},
				{
					id:0,
					avatar:'/static/img/1.jpg',
					contentuser:'向恶势力低头！',
					contentlevel:'asd',
					contenttext:'阿斯顿撒',
					contenttime:'2021-13-131-2',
					commentitems:[
				
					]
				},
				{
					id:0,
					avatar:'/static/img/1.jpg',
					contentuser:'向恶势力低头！',
					contentlevel:'asd',
					contenttext:'阿斯顿撒',
					contenttime:'2021-13-131-2',
					commentitems:[
				
					]
				}
			],
			current: 0,
			windowWidth: 0,
			activity:'loadmore',
			dynamic:'loadmore'
		};
	},
	methods: {
		changeTabs(e) {
			this.current = e;
		},
		toDynamic(e){
			uni.navigateTo({
				url:'../dynamic/dynamicdetail?dynamicId=' + e
			})
		},
		loadmoreByCollect(){
			console.log("sad")
		},
		//点击加载更多
		loadmoreByDynamic(){
			console.log("ee")
		}	
	},
	onLoad() {
		this.windowWidth = app.globalData.windowWidth;
		this.$u.api.getSearch('/login').then(e => {console.log(e)})
	},
	//加载更多
	onReachBottom(){

	},
};
</script>

<style>
.more {
	margin-top: 50rpx;
}
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
	margin-top: 5upx;
	margin-left: 20upx;
	display: flex;
	flex-direction: column;
}

.content-header .content-authorinfo .content-user {
	font-size: 30upx;
}

.content-header .content-authorinfo .content-level {
	font-size: 25upx;
	color: #82848a;
}

.content-item .content-text {
	width: 90%;
	margin: 0 auto;
	margin-top: 10upx;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
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
	content: '';
	width: 30%;
}

.content-item .content-time {
	width: 90%;
	margin: 0 auto;
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

.content-comment .comment-item {
	display: flex;
}

.comment-item .comment-user {
	font-size: 25upx;
	color: #2b85e4;
	font-weight: bold;
}

.comment-item .comment-text {
	flex: 1;
	word-break: break-all;
	margin-left: 10upx;
	font-size: 25upx;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
