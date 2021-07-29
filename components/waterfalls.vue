<template>
	<view class="wrap" style="background: rgb(249,250,251);">
		<u-waterfall v-model="flowlist" ref="uWaterfall">
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
		
	</view>
</template>

<script>
	export default {
		name:"waterfalls",
		props:['flowlist'],
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>
