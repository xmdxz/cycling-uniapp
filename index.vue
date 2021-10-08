<template>
	<view>
		<u-search v-model="value" @change="change" @custom="custom" @search="search" :shape="shape" :clearabled="clearabled"
		:show-action="showAction" :input-align="inputAlign" @clear="clear"></u-search>
		
		<u-swiper  :height="250" :list="list" title="true" :effect3d="effect3d"
		:indicator-pos="indicatorPos" :mode="mode" :interval="3000" ></u-swiper>
		<view class="pickers">
			<view class="pickers-text">筛选</view>
			<u-picker mode="region" v-model="showpicker"  :area-code='["13", "1303", "130304"]' @confirm="confirm"></u-picker>
			<a class="areabutton" @click="showpicker = true">{{input ? input : "选择地区"}}</a>
		</view>
		<view class="u-card-wrap">
			<!--一下是单独一个card-->
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
			<!------------>
			<!--一下是单独一个card-->
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
			<!------------>
			<!--一下是单独一个card-->
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
			<!------------>

		</view>
		<u-tabbar v-model="tabBarCurrent" :list="tabBarList" :mid-button="true" mid-button-size="90"></u-tabbar>
	</view>
</template>

<script>
	import store from '../../store/index.js'
	export default {
		data() {
			return {
				tabBarCurrent: 0,
				tabBarList:[],
				input:"",
				value:'',
				//中心点位置：
				latitude:'35.60533428584708',
				longitude:'110.71650971386717',
				//路线信息：
				lineArray:[{//指定一系列坐标点，从数组第一项连线至最后一项
								　　　　points:[
								       　　{latitude: 35.60533428584,longitude: 110.7165097138},
								      　　 {latitude: 35.60543428965,longitude: 110.7175097139},
										   {latitude: 35.60585428965,longitude: 110.7177097439},
										   {latitude: 35.604434289658,longitude: 110.7175097139},
								　　　　],
								　　　　color:"#0000AA",//线的颜色
								　　　　width:2,//线的宽度
								　　　　dottedLine:false,//是否虚线
								　　　　arrowLine:true,    //带箭头的线 开发者工具暂不支持该属性
								　　}],
				title: '征服凤凰山！',
				subTitle: '2020-05-15',
				
				//卡片左上角  头像
				thumb: 'https://img0.baidu.com/it/u=1077360284,2857506492&fm=26&fmt=auto',
				padding: 20,
				border: true,
				text:'危险',
				type:'error',
				shap:'circle',
				size:'mini',
				mode_tag: 'light',
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				mode: 'round',
				indicatorPos: 'bottomCenter',
				effect3d: false,
				
				showpicker:false,
			}
		},
		onLoad(){
			this.tabBarList = store.state.vuex_tabbar
		},
		methods: {
			click(){
				alert("click click")
			},
			mores(){
				event.stopPropagation();
				alert("click mors")
			},
			headClick(){
				event.stopPropagation();
				alert("click headClick");
			},
			confirm(e) {
				console.log(e);
				this.input = e.province.label + '-' + e.city.label + '-' + e.area.label;
			}
		}
	}
</script>

<style scoped lang="scss">
	.u-search{
		padding-bottom: 20rpx;
		padding-left: 20rpx;
	}
	.u-demo {
		padding-top: 0;
	}
	
	.u-card-wrap { 
		background-color: $u-bg-color;
		padding: 1px;
	}
	
	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
		flex-direction: column;
	}
		
	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}
	
	.u-body-item .map{
		text-align: center;
		width: 95%;
	}
	
	.u-body-item .map map{
		text-align: center;
		width: 95%;
	}
	.more{
		float: right;
		text-align: right;
		padding-right: 10rpx;
	}
	.tags{
		margin-right: 20rpx;
	}
	.pickers{
		height: 80rpx;
		display: flex;
		flex-direction: row;
	}
	.pickers-text{
		margin-top: 20rpx;
		margin-left: 60rpx;
		color: #C8C9CC;
	}
	.areabutton{
		font-size: 30rpx;
		margin-left: 300rpx;
		margin-top: 20rpx;
	}
</style>
