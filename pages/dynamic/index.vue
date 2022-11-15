<template>
	<view>
		<view class="content-main">
			<u-sticky :enable="true">
				<u-notice-bar mode="horizontal" :list="textList"></u-notice-bar>
			</u-sticky>

			<u-line color="gray"></u-line>

			<swiper :current="swiperCurrent">
				<!-- 当选中推荐标签时显示 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;margin-top: 20upx;"
						@scrolltolower="onreachBottom">
						<view class="swiper-div">
							<!-- 轮播图 -->
							<u-swiper :list="imgList" :effect3d="true" :height="300"></u-swiper>
							<!-- 公告 -->

							<!-- 推荐动态 -->
							<view class="u-margin-30 recommed">
								<!-- 小标题 -->
								<u-section title="推荐商品" :right="false" sub-title="更多" line-color="#f8d347"></u-section>
								<!-- 瀑布流 -->
								<view class="wrap" style="background: rgb(249,250,251);">
									<u-waterfall v-model="flowList" ref="uWaterfall">
										<!-- 左侧瀑布流 -->
										<template v-slot:left="{ leftList }">
											<view class="water" v-for="(item, index) in leftList" :key="index"
												@click="toDynamicDetail(item.id)">
												<!-- 商品图片 -->
												<u-lazy-load threshold="-450" border-radius="10"
													:image="item.images == null || item.images.length == 0 ? '../../static/img/noLoginAvatar.png':filters['appendUrlPrefix'](item.images[0])"
													:index="index"></u-lazy-load>
												<!-- 文章标题 -->
												<view class="content-title">{{ item.name }}</view>
												<view class="content-info">
													<!-- 作者 -->
													<view class="content-author">
														<u-avatar :src="!item.userInfo.avatar ?'../../static/img/noLoginAvatar.png':filters['appendUrlPrefix'](item.userInfo.avatar)" size="40"
															style="vertical-align: middle;"></u-avatar>
														{{ item.userInfo.username }}
													</view>
													<!-- 点赞数 -->
													<view class="content-like">
														<!-- <u-icon name="heart" color="rgb(109,111,111)"
															style="vertical-align: middle;" size="30"></u-icon> -->
														<text style="line-height: 1.8;color: #ff0000;font-size: 30rpx;">{{ "￥" + item.price }}</text>
													</view>
												</view>
											</view>
										</template>
										<!-- 右侧瀑布流 -->
										<template v-slot:right="{ rightList }">
											<view class="water" v-for="(item, index) in rightList" :key="index"
												@click="toDynamicDetail(item.id)">
												<!-- 文章图片 -->
												<u-lazy-load threshold="-450" border-radius="10" :image="item.images == null || item.images.length == 0 ? '../../static/img/noLoginAvatar.png':filters['appendUrlPrefix'](item.images[0])"
													:index="index" style="width: 100%;"></u-lazy-load>
												<!-- 文章标题 -->
												<view class="content-title">{{ item.name }}</view>
												<view class="content-info">
													<!-- 作者 -->
													<view class="content-author">
														<u-avatar :src="!item.userInfo.avatar ?'../../static/img/noLoginAvatar.png':filters['appendUrlPrefix'](item.userInfo.avatar)" size="40"
															style="vertical-align: middle;"></u-avatar>
														{{ item.userInfo.username }}
													</view>
													<!-- 点赞数 -->
													<view class="content-like">
														<!-- <u-icon name="heart" color="rgb(109,111,111)"
															style="vertical-align: middle;" size="30"></u-icon> -->
														<text style="line-height: 1.8;color: #ff0000;font-size: 30rpx;">{{ "￥" + item.price }}</text>
													</view>
												</view>
											</view>
										</template>
									</u-waterfall>
								</view>
								<!-- 加载更多 -->
								<u-loadmore  :status="loadStatus"
									></u-loadmore>
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
				imgList: ['/static/img/1.jpg', '/static/img/2.jpg', '/static/img/3.jpg'],
				textList: ['最新通知:发布商品需要遵守社区规定,不得发布违法违规内容'],
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
		async onShow() {
			let notice = await this.$u.api.noticeList({
				type:"GOODS"
			})
			if(notice && notice.length > 0){
				this.textList = notice
			}
			let images = await this.$u.api.imagesList()
			if(images != null && images.length > 1){
				this.imgList = images.map(e => {
					return this.filters['appendUrlPrefix'](e.image)
				})
			}
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
			// // swiper-item左右移动，通知tabs的滑块跟随移动
			// transition(e) {
			// 	let dx = e.detail.dx;
			// 	this.$refs.uTabs.setDx(dx);
			// },
			// // 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// // swiper滑动结束，分别设置tabs和swiper的状态
			// animationfinish(e) {
			// 	let current = e.detail.current;
			// 	this.$refs.uTabs.setFinishCurrent(current);
			// 	this.swiperCurrent = current;
			// 	this.current = current;
			// },
			async addRandomData() {
				let result = await this.$u.api.goodsPage(this.page)
				if(result){
					this.num = result.total
					// for (let i = 0; i < 10; i++) {
					// 	let index = this.$u.random(0, this.contentList.length - 1);
					// 	// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
					// 	let item = JSON.parse(JSON.stringify(this.contentList[index]));
					// 	// item.id = this.$u.guid();
					// 	this.flowList.push(item);
					// }
					this.flowList.push(...result.records)
				}
				// let res = await this.$u.api.getDynamicByRecommend({
				// })
				// console.log(res)
			},
			toDynamicDetail(id) {
				this.$router.push({name:"dynamicdetail",params:{id:id}})
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
		width: 100%;
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
</style>
