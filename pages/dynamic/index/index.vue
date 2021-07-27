<template>
	<view class="content-main">
		<view>
			<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false"
				swiperWidth="750"></u-tabs-swiper>
		</view>
		<u-line color="gray"></u-line>
		
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
					<!-- 当选中关注标签时显示 -->
					<swiper-item class="swiper-item">
						<scroll-view scroll-y style="height: 100%;width: 100%;margin-top: 20upx;">
							<view class="swiper-div">
								<view class="content">
									<view class="content-item">
										<view class="content-header">
											<u-avatar :src="src" style="vertical-align: middle;"></u-avatar>
											<view class="content-authorinfo">
											<text class="content-user">官方账号</text>
											<text class="content-level">等级</text>
											</view>
										</view>
										<view class="content-text">
											周末骑行游览邹默到货时间卡的事数据库大开大合撒娇啊斯柯达斯柯达接口的数据啊来得及爱上了
										</view>
										<view class="content-imgs">
											<image :src="src" class="content-img"></image>
											<image :src="src" class="content-img"></image>
											<image :src="src" class="content-img"></image>
										</view>
										<view class="content-time">
											<text>发布于:2021年7月26日8时49分</text>
										</view>
										<view class="content-comment">
											<view class="comment-item">
												<view class="comment-user">张三:</view>
												<view class="comment-text">大力支持,哈哈哈好,真不错十大手机端卡萨丁哈萨克交会对接卡刷 的哈数据库的就撒测试的爱神的箭撒和大家看挥洒接口的哈数据库动环监控撒谎登记卡会尽快</view>
											</view>
											<view class="comment-item">
												<view class="comment-user">张三:</view>
												<view class="comment-text">大力支持,哈哈哈好</view>
											</view>
											<view class="comment-item">
												<view class="comment-user">张三:</view>
												<view class="comment-text">大力支持</view>
											</view>
										</view>
										<view class="content-menu">
											<u-grid :col="3" :border="false">
													<u-grid-item>
														<u-icon name="heart" :size="30"></u-icon>
													</u-grid-item>
													<u-grid-item>
														<u-icon name="more-circle" :size="30"></u-icon>
													</u-grid-item>
													<u-grid-item>
														<u-icon name="share" :size="30"></u-icon>
													</u-grid-item>
												</u-grid>
										</view>
										<view class="diver" style="width: 100%;height: 25upx;background-color: #DCDFE6;"></view>
									</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
					
					<!-- 当选中推荐标签时显示 -->
					<swiper-item class="swiper-item">
						<scroll-view scroll-y style="height: 100%;width: 100%;margin-top: 20upx;" @scrolltolower="onreachBottom">
							<view class="swiper-div">
								<!-- 轮播图 -->
								<u-swiper :list="imgList" :effect3d="true" :height="300"></u-swiper>
								<!-- 公告 -->
								<view class="u-m-t-20">
									<u-notice-bar mode="horizontal" :list="textList"></u-notice-bar>
								</view>
								<!-- 热门话题 -->
								<view class="u-margin-30 topic">
									<!-- 小标题 -->
									<u-section title="热门话题" :right="true" sub-title="更多" line-color="blue"></u-section>
									<!-- 热门话题的内容 -->
									<view class="topic-content">
								
										<view class="topic-item">
											<u-image width="100%" height="150rpx" :src="src"></u-image>
											<text>#我要做运动#</text>
										</view>
										<view class="topic-item">
											<u-image width="100%" height="150rpx" :src="src"></u-image>
											<text>#谁说妹纸不骑#</text>
										</view>
										<view class="topic-item">
											<u-image width="100%" height="150rpx" :src="src"></u-image>
											<text>#天气即天意#</text>
										</view>
										<view class="topic-item">
											<u-image width="100%" height="150rpx" :src="src"></u-image>
											<text>#街头漫拍#</text>
										</view>
									</view>
								</view>
								<!-- 推荐动态 -->
								<view class="u-margin-30 recommed">
									<!-- 小标题 -->
									<u-section title="推荐动态" :right="true" sub-title="更多" line-color="blue"></u-section>
									<!-- 瀑布流 -->
									<view class="wrap" style="background: rgb(249,250,251);">
										<u-waterfall v-model="flowList" ref="uWaterfall">
											<!-- 左侧瀑布流 -->
											<template v-slot:left="{leftList}">
												<view class="water" v-for="(item,index) in leftList" :key="index">
													<!-- 文章图片 -->
													<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index">
													</u-lazy-load>
													<!-- 文章标题 -->
													<view class="content-title">{{item.title}}</view>
													<view class="content-info">
														<!-- 作者 -->
														<view class="content-author">
															<u-avatar :src="item.avatar" size="40" style="vertical-align: middle;">
															</u-avatar>{{item.author}}
														</view>
														<!-- 点赞数 -->
														<view class="content-like">
															<u-icon name="heart" color="rgb(109,111,111)" style="vertical-align: middle;"
																size="30"></u-icon><text style="line-height: 1.8;">{{item.like}}</text>
														</view>
													</view>
												</view>
											</template>
											<!-- 右侧瀑布流 -->
											<template v-slot:right="{rightList}">
												<view class="water" v-for="(item,index) in rightList" :key="index">
													<!-- 文章图片 -->
													<u-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"
														style="width: 100%;">
													</u-lazy-load>
													<!-- 文章标题 -->
													<view class="content-title">{{item.title}}</view>
													<view class="content-info">
														<!-- 作者 -->
														<view class="content-author">
															<u-avatar :src="item.avatar" size="40" style="vertical-align: middle;">
															</u-avatar>{{item.author}}
														</view>
														<!-- 点赞数 -->
														<view class="content-like">
															<u-icon name="heart" color="rgb(109,111,111)" style="vertical-align: middle;"
																size="30"></u-icon><text style="line-height: 1.8;">{{item.like}}</text>
														</view>
													</view>
												</view>
											</template>
										</u-waterfall>
										<!-- 加载更多 -->
										<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData">
										</u-loadmore>
									</view>
								</view>
								
							</view>
						</scroll-view>
					</swiper-item>
					<!-- 当选中附近标签时显示 -->
					<swiper-item class="swiper-item">
						<scroll-view scroll-y style="width: 100%;margin-top: 20upx;">
							<view class="swiper-div">
								
							</view>
						</scroll-view>
					</swiper-item>
		</swiper>
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '关注'
				}, {
					name: '推荐'
				}, {
					name: '附近'
				}],
				imgList: ['/static/img/1.jpg', '/static/img/2.jpg', '/static/img/3.jpg'],
				textList: ['最新通知:发布动态需要遵守社区规定,不得发布违法违规内容'],
				flowList: [],
				contentList: [{
						title: '南山寺一骑',
						content: '今日到南山寺骑行打卡',
						image: '/static/img/qixing.jpg',
						images: ['/static/img/qixing.jpg'],
						author: '东坡',
						avatar: '/static/img/avatar.jpg',
						like: '19022'
					},
					{
						title: '南山寺一骑',
						content: '今日到南山寺骑行打卡',
						image: '/static/img/qixing.jpg',
						images: ['/static/img/qixing.jpg'],
						author: '东坡',
						avatar: '/static/img/avatar.jpg',
						like: '19022'
					},
					{
						title: '南山寺一骑',
						content: '今日到南山寺骑行打卡',
						image: '/static/img/qixing.jpg',
						images: ['/static/img/qixing.jpg'],
						author: '东坡',
						avatar: '/static/img/avatar.jpg',
						like: '19022'
					}, {
						title: '南山寺一骑',
						content: '今日到南山寺骑行打卡',
						image: '/static/img/qixing.jpg',
						images: ['/static/img/qixing.jpg'],
						author: '东坡',
						avatar: '/static/img/avatar.jpg',
						like: '19022'
					},
					{
						title: '南山寺一骑',
						content: '今日到南山寺骑行打卡',
						image: '/static/img/qixing.jpg',
						images: ['/static/img/qixing.jpg'],
						author: '东坡',
						avatar: '/static/img/avatar.jpg',
						like: '19022'
					},
					{
						title: '南山寺一骑',
						content: '今日到南山寺骑行打卡',
						image: '/static/img/qixing.jpg',
						images: ['/static/img/qixing.jpg'],
						author: '东坡',
						avatar: '/static/img/avatar.jpg',
						like: '19022'
					},
					{
						title: '南山寺一骑',
						content: '今日到南山寺骑行打卡',
						image: '/static/img/qixing.jpg',
						images: ['/static/img/qixing.jpg'],
						author: '东坡',
						avatar: '/static/img/avatar.jpg',
						like: '19022'
					},
					{
						title: '南山寺一骑',
						content: '今日到南山寺骑行打卡',
						image: '/static/img/qixing.jpg',
						images: ['/static/img/qixing.jpg'],
						author: '东坡',
						avatar: '/static/img/avatar.jpg',
						like: '19022'
					},
					{
						title: '南山寺一骑',
						content: '今日到南山寺骑行打卡',
						image: '/static/img/qixing.jpg',
						images: ['/static/img/qixing.jpg'],
						author: '东坡',
						avatar: '/static/img/avatar.jpg',
						like: '19022'
					},
					{
						title: '南山寺一骑',
						content: '今日到南山寺骑行打卡',
						image: '/static/img/qixing.jpg',
						images: ['/static/img/qixing.jpg'],
						author: '东坡',
						avatar: '/static/img/avatar.jpg',
						like: '19022'
					},
					{
						title: '南山寺一骑',
						content: '今日到南山寺骑行打卡',
						image: '/static/img/qixing.jpg',
						images: ['/static/img/qixing.jpg'],
						author: '东坡',
						avatar: '/static/img/avatar.jpg',
						like: '19022'
					},
					{
						title: '南山寺一骑',
						content: '今日到南山寺骑行打卡',
						image: '/static/img/qixing.jpg',
						images: ['/static/img/qixing.jpg'],
						author: '东坡',
						avatar: '/static/img/avatar.jpg',
						like: '19022'
					}
				],
				current: 0,
				swiperCurrent: 0,
				src: '/static/img/topicimg.jpg',
				loadStatus: 'loadmore',
				loadStatusTwo: 'loadmore'
			}
		},
		onLoad() {
			this.addRandomData()
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
			onreachBottom(){
				this.loadStatus = 'loading'
				//模拟数据加载
				setTimeout(() => {
					this.addRandomData()
					this.loadStatus = 'loadmore'
				}, 1000)
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			addRandomData() {
				for (let i = 0; i < 10; i++) {
					let index = this.$u.random(0, this.list.length - 1);
					// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
					let item = JSON.parse(JSON.stringify(this.contentList[index]))
					// item.id = this.$u.guid();
					this.flowList.push(item);
				}
				// console.log(this.flowList)
			},
		}
	}
</script>

<style>
	.content-main{
		width: 100%;
		height: 100%;
	}
	
	swiper{
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
		background-color: #FFFFFF;
	}

	.water .content-title {
		font-size: 30rpx;
		margin-top: 10upx;
		margin-left: 10upx;
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
	
	
	.content{
		width: 100%;
	}
	
	.content .content-item{
		width: 100%;
	}
	
	.content-item .content-header{
		margin-left: 30upx;
		display: flex;
		justify-content: flex-start;
	}
	
	.content-header .content-authorinfo{
		margin-top: 5upx;
		margin-left: 20upx;
		display: flex;
		flex-direction: column;
	}
	
	.content-header .content-authorinfo .content-user{
		font-size: 30upx;
	}
	
	.content-header .content-authorinfo .content-level{
		font-size: 25upx;
		color: #82848A;
	}
	
	.content-item .content-text{
		width: 90%;
		margin: 0 auto;
		margin-top: 10upx;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient:vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.content-item .content-imgs{
		width: 90%;
		margin: 0 auto;
		margin-top: 10upx;
		height: 202upx;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
	
	}
	
	.content-imgs .content-img{
		width: 30%;
		height: 200upx;
		
	}
	
	.content-item .content-imgs::after{
		content:"";
		width: 30%;
	}
	
	.content-item .content-time{
		width: 90%;
		margin: 0 auto;
		margin-top: 10upx;
		text-align: right;
		font-size: 25upx;
		color: #909399;
	}
	
	.content-item .content-comment{
		width: 100%;
		margin-top: 10upx;
		padding: 10upx 40upx;
		background-color: rgb(245,250,250);
	}
	
	.content-comment .comment-item{
		display: flex;
	}
	
	.comment-item .comment-user{
		font-size: 25upx;
		color: #2B85E4;
		font-weight: bold;
		
	}
	
	.comment-item .comment-text{
		flex: 1;
		word-break: break-all;
		margin-left: 10upx;
		font-size: 25upx;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient:vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
