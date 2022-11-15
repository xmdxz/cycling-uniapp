<template>
	<view>
		<view class="content-main">
			<u-line color="gray"></u-line>

			<swiper :current="swiperCurrent">
				<!-- 当选中推荐标签时显示 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;margin-top: 20upx;"
						@scrolltolower="onreachBottom">
						<view class="swiper-div">
							<!-- 推荐动态 -->
							<view class="u-margin-30 recommed">
								<!-- 小标题 -->
								<u-section title="聊天" :right="false" sub-title="更多" line-color="#f8d347"></u-section>
								<!-- 瀑布流 -->
								<view v-for="(item, index) in flowList" :key="index" :id="`msg-${item.id}`">
									<view  class="item" @click="tochat(item.goodsId)">
										<view class="left">
											<u-lazy-load style="" threshold="-450" border-radius="10"
											:image="item.images == null || item.images.length == 0 ? '../../static/img/noLoginAvatar.png':filters['appendUrlPrefix'](item.images[0])"
											:index="index"></u-lazy-load>
										</view>
										<view class="right">
											<view>{{ item.name }}</view>
											<view class="content">{{ item.content }}</view>
										</view>
									</view>
								</view>	
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				</scroll-view>
				</swiper-item>
			</swiper>
		</view>

		<u-tabbar v-model="tabBarCurrent" :list="tabBarList" :mid-button="true" mid-button-size="90"></u-tabbar>
	</view>
</template>

<script>
	import store from '../../store/index.js';
	export default {
		components: {
		},
		data() {
			return {
				flowList: [],
				swiperCurrent: 0,
				src: '/static/img/topicimg.jpg',
				loadStatus: 'loadmore',
				tabBarCurrent: 0,
				tabBarList: [],
				page:{
					current:1,
					size:10
				},
				num:0
			};
		},
		watch:{
			'flowList':{
				handler(newV,oldV){
					if (newV.length >= this.num) {
						this.loadStatus = 'nomore';
					} else {
						this.loadStatus = 'loadmore';
					}
				}
			}
		},
		onLoad() {
			this.addRandomData();
				this.tabBarList = store.state.vuex_tabbar;
		},
		onPullDownRefresh() {
			this.page.current = 1
			this.flowList = []
			this.$refs.uWaterfall.clear();
			this.addRandomData();
			uni.stopPullDownRefresh()
		},
		onShow() {
			
		},
		onHide() {
			
		},
		// onReachBottom() {
		// 	this.loadStatus = 'loading'
		// 	//模拟数据加载
		// 	setTimeout(() => {
		// 		this.addRandomData()
		// 		this.loadStatus = 'loadmore'
		// 	}, 1000)
		// },
		methods: {
			async onreachBottom() {
				if(this.flowList.length >= this.num){
					this.loadStatus = 'nomore';
					return
				}
				this.page.current ++
				this.loadStatus = 'loading';
				this.addRandomData();
				this.loadStatus = 'loadmore';
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			async addRandomData() {
				let result = await this.$u.api.allChatList({userId:this.$u.getUserId()});
				if(result){
					this.num = result.total
					this.flowList = result
				}
				// let res = await this.$u.api.getDynamicByRecommend({
				// })
				// console.log(res)
			},
			tochat(id) {
				console.log(id)
				this.$router.push({name:"chat",params:{goodsId:id}})
			}
		}
	};
</script>

<style>
	.content-main {
		width: 100%;
		height: 100%;
	}

	.content-main .search {
		width: 90%;
		margin: 0 auto;
		display: flex;
		flex-wrap: nowrap;
		border: 4rpx solid #dd6161;
		border-radius: 35rpx;
	}

	.content-main .search-btn {
		width: 200rpx;
		height: 71rpx;
		background-color: #dd6161;
		color: #ffffff;
		position: absolute;
		top: 0rpx;
		right: 39rpx;
	}

	.content-main .stickt {
		width: 100%;
		height: auto;
		background-color: #ffffff;
	}

	.content-main swiper {
		height: 100vh;
	}

	.topic .topic-content {
		width: 100%;
		margin: 0 auto;
		display: flex;
		justify-content: flex-start;
		padding-left: 10upx;
		flex-wrap: nowrap;
	}

	.topic-content .topic-item {
		width: 25%;
		margin-right: 20upx;
		margin-top: 25upx;
		text-align: center;
	}

	.topic-content .topic-item image {
		width: 100%;
	}

	.topic-content .topic-item text {
		font-size: 20upx;
		color: #606266;
		margin-top: 15upx;
	}

	.wrap {
		margin-top: 20upx;
	}

	.wrap .water {
		border-radius: 8px;
		margin: 0 15upx 15upx 15upx;
		/* padding: 8px; */
		position: relative;
		background-color: #ffffff;
	}

	.water .content-title {
		font-size: 30rpx;
		margin-top: 10upx;
		margin-left: 10upx;
		font-weight: bolder;
	}

	.water .content-info {
		margin-top: 10upx;
		display: flex;
		justify-content: space-between;
		flex-flow: row nowrap;
		padding: 10upx;
	}

	.content-info .content-author {
		font-size: 25upx;

		color: rgb(112, 113, 114);
	}

	.content-info .content-like {
		font-size: 25upx;
	}

	.content {
		color: #909399;
		align-content: center;
		float: right;
		margin-right: 100upx;
	}

	.content .content-item {
		width: 100%;
	}

	.content-item .content-header {
		margin-left: 30upx;
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
	.item{
		border: #82848a solid 1px;
		border-radius: 20upx;
		margin-top: 20upx;
		display: flex;
		flex-direction: row;
	}
	.left{
		margin: 10px;
		width: 20%;
	}
	.right{
		font-size: 40upx;
		margin-left: 20upx;
		margin-top: 15upx;
		width: 100%;
	}
</style>
