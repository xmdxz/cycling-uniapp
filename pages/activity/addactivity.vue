<template>
	<view>
		<u-sticky>
			<u-row gutter="12" justify="between" style="background-color: #fff;">
				<u-col span="3">
					<view class="avatar">
						<u-avatar @click="useravatar" :src="user.src" show-sex=true :sex-icon="user.sex" show-level=true :level-icon="user.level"></u-avatar>
					</view>
				</u-col>
				<u-col span="6" text-align="center">
					<view class="title">
						凤凰山速降
					</view>
				</u-col>
				<u-col span="3">
					<view class="creattime" te>
						2021-3-19
					</view>
				</u-col>
			</u-row>
			<u-row gutter="0">
				<u-line color="gray" />
			</u-row>
		</u-sticky>
		<view class="card areacard">
			<view class="areahead">
				预计时长
			</view>
			<view class="area linktime">
				2<text style="color: #18B566;">小时</text>
			</view>
			<view class="areahead">
				 路线长度：
			</view>
			<view class="area linktime">
				32<text style="color: #18B566;"> 公里 </text>
			</view>
		</view>
		<view class="card areacard">
			<view class="areahead">
				集合点:
			</view>
			<view class="area">
				山西农业大学 文体馆
				<view class="areaime">
					(2021-10-1 19:00)
				</view>
			</view>

		</view>
		
		<view class="card">
			<view class="card_head">
				已参与用户:
			</view>
			<u-line color="gray" />
			<view class="card_content">
				<u-avatar size="mini" @click="useravatar" :src="user.src" ></u-avatar>
				<u-avatar size="mini" @click="useravatar" :src="user.src" ></u-avatar>
				<u-avatar size="mini" @click="useravatar" :src="user.src" ></u-avatar>
			</view>
		</view>
		
		<view class="card">
		<!--分栏-->
			<view class="tabs">
				<u-tabs :list="list" :is-scroll="false" :current="current" @change="changetabsindex"></u-tabs>
			</view>
			<view :style="contentcss">
				<view class="map">
					<map></map>
				</view>
				<view class="content">
						这里是一长串的简介，有可能非常长非常长；这里是一长串的简介，有可能非常长非常长；这里是一长串的简介，有可能非常长非常长；
					这里是一长串的简介，有可能非常长非常长；
				</view>
			</view>
			<view :style="carefulcss">
				注意事项
			</view>
		</view>
		<view class="card">
			<view class="card_head">
				评论
			</view>
			<u-line color="gray" />
			<view class="card_content">
				<view class="talk">
					<u-avatar size="mini" @click="useravatar" :src="user.src" ></u-avatar>
					<view class="pl">
						非常好的赛道
					</view>
					
				</view>
			</view>
		</view>
		<view class="test"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '简介'
				}, {
					name: '注意事项'
				}],
				current: 0,
				user:{src:'https://img0.baidu.com/it/u=1077360284,2857506492&fm=26&fmt=auto',
						sex:"woman",level:'level'},
				time:'2021-10-20',
				//tabs分栏的两个css绑定
				contentcss:{display:"inline"},
				carefulcss:{display:"none"},
			}
		},
		methods: {
			useravatar(){
				alert("user avatar was clicked")
			},
			changetabsindex(index) {
				let _this = this;
				this.current = index;
				if(index==1){
					_this.contentcss = {display:"none"}
					_this.carefulcss = {display:"inline","font-size": "80rpx"}
				}else{
					_this.carefulcss = {display:"none"}
					_this.contentcss = {display:"inline"}
				}
			},
		}
	}
</script>

<style>
	page{
		padding: 20rpx;
		background-color: #F4F4F5;
	}
	.title{
		font-size: large;
	}
	.creattime{
		font-size: smaller;
	}
	.test{
		height: 3000rpx;
	}
	.map{
		text-align: center;
		width: 95%;
		margin-left: 7.5%;
	}
	.content{
		text-indent: 50rpx;
		font-size: larger;
		font-family: '微软雅黑';
		width: 80%;
		margin-left: 10%;
	}
	.carefulcss{
		font-size: 30rpx;
	}
	.card{
		width: 100%;
		border-radius: 10rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
	}
	.areacard{
		height: 100rpx;
		display: flex;
		flex-direction: row;
	}
	.card_head{
		color: #C8C9CC;
		font-weight: 100;
		padding-left: 20rpx;
	}
	.card_content{
		padding-left: 10rpx;
		padding-top: 10rpx;
	}
	.card_content .talk{
		display: flex;
		flex-direction: row;
	}
	.areahead{
		margin-top: 20rpx;
		color: #C8C9CC;
		margin-left:20rpx;
		width: 20%;
	}
	.area{
		font-size: large;
		display: flex;
		flex-direction: column;
	}
	.linktime{
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
	}
	.linktime text{
		margin-left: 20rpx;
	}
	.pl{
		margin-top: 20rpx;
		margin-left: 30rpx;
	}
</style>
