<template>
	<view>
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
</template>

<script>
	export default {
		name:"attentionitem",
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
