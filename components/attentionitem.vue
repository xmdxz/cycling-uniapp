<template>
	<view>
		<view class="content-item">
			<view class="content-header">
				<u-avatar :src="avatar" style="vertical-align: middle;"></u-avatar>
				<view class="content-authorinfo">
				<text class="content-user">{{contentuser}}</text>
				<text class="content-level">{{contentlevel}}</text>
				</view>
			</view>
			<view class="content-text">
				{{contenttext}}
			</view>
			<view class="content-imgs">
				<image v-for="(item,index) in imgs" :src="item" :key="index" class="content-img"></image>
			</view>
			<view class="content-time">
				<text>{{contenttime}}</text>
			</view>
			<view class="content-comment">
				<view class="comment-item" v-for="(item,index) in commentitems" :key="index">
					<view class="comment-user">{{item.user}}:</view>
					<view class="comment-text">{{item.text}}</view>
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
</template>

<script>
	export default {
		name:"attentionitem",
		props:['avatar','contentuser','contentlevel','imgs','contenttext','contenttime','commentitems'],
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	
	.content-item{
		width: 100%;
	}
	.content-item .content-header{
		margin-left: 30upx;
		margin-top: 10upx;
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
