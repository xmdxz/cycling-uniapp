<template>
	<view class="body1">
		<view class="amap-container">
			<view id="amap" class="amap" :prop="oldAllRoute" :change:prop="amap.changeLocal"></view>
			<view class="amap" style="background-color: #2C405A;"></view>
		</view>
		
		<view class="buttom">
			<view class="locationMess">
				<view class="personMess">
					<view class="username">{{username}}</view>
					<view class="personMessFont2">
						<view class="date">{{date}}</view>
						<view class="temperature">
							<text>温度:{{endWeather.temperature}}º</text>
							<text>{{"    "}}湿度:{{endWeather.humidity}}%</text>
						</view>
						<view class="position">{{endLocation.formattedAddress}}</view>
					</view>
				</view>
				<view class="startMess">
					<view class="line1 font2">
						<view class="item left">{{rideMess.speed}}</view>
						<view class="item center2">
							<text v-if="computeTime(rideMess.hour)"> 0{{rideMess.hour}} </text>
							<text v-else> {{rideMess.hour}} </text>:
							<text v-if="computeTime(rideMess.minute)"> 0{{rideMess.minute}} </text>
							<text v-else> {{rideMess.minute}} </text>:
							<text v-if="computeTime(rideMess.second)"> 0{{rideMess.second}} </text>
							<text v-else> {{rideMess.second}} </text>
						</view>
						<view class="item right">{{rideMess.distance}}</view>
					</view>
					<view class="line1 font1">
						<view class="item left">平均配速</view>
						<view class="item center1">时间</view>
						<view class="item right">距离</view>
					</view>
				</view>
			</view>
		</view>
		
		<view>
			<button class="toActive" @click="">
				<view class="startButtonFont">分享到动态</view>
			</button>
			<button class="toBook" @click="">
				<view class="startButtonFont">发布到路书</view>
			</button>
		</view>
	</view>
	
	
</template>
<script>
	export default{
		data(){
			return{
				
				isEnd:false,
				rendjsMess:null,
				allRoute:null,

				options:{
					latitude: null,
					longitude: null
				},
				oldAllRoute:null,
				startLocation:null,
				endLocation:{
					formattedAddress : " "
				},
				endWeather:{
					temperature : 0,
					humidity : 0
				},
				
				username:"username",
				date:null,
				rideMess:null,	//{speed,hour,minute,secong,distance}
			}
		},
		mounted() {
			
		},
		methods:{
			/*
				计算时间是否是两位数，然后显示在组件中
			*/
			computeTime(time) {
				if (time < 10) {
					return true;
				} else {
					return false;
				}
			},
			
			setL(data){
				this.endLocation = data.endLocation;
				this.endWeather = data.endWeather;
			}
		}
		
	}
	
</script>

<script module="amap" lang="renderjs">
	import importAPI from "../../static/common/js/AmapImport.js"
	export default {
		data() {
			return {
				resAmap:null,
				map: null,
				mapUI: null,
				
				allRoute:null,
				
				endLongitude: null, //end地理位置的经度
				endLatitude: null, //end地理位置的纬度
				
				nowMarker: null, //当前位置的标记点	
				geolocation: {}, //AMap.Geolocation对象，用来获取地理位置
				
				endWeather:null,	//天气信息
				endLocation:null,	//具体位置
				nowCity:null,
			}
		},
		onLoad(option) {
			console.log("finish finish")
			var finishMess = uni.getStorageSync("finishMess")
			var that = this;
			console.log(finishMess)
			that.endLongitude = finishMess.endLocation.Lng;
			that.endLatitude = finishMess.endLocation.Lat;
			that.rideMess = finishMess.rideMess;
			that.allRoute = finishMess.allRoute;
			console.log(that.allRoute);
			/**
			 * 向服务器提交本次骑行的数据
			 */
			var mes = this.$u.api.rideFinish({
				userId: 1,
				speed: that.rideMess.speed,
				duration : that.rideMess.hour+":"+that.rideMess.minute+":"+that.rideMess.second,
				distance: that.rideMess.distance,
				mapId: 1,
			});
			
		},
		mounted() {
			
			this.initAmap();
		},
		methods: {
			async importAMap() {
				var that = this;
				try {
					that.resAmap = await importAPI();
					//初始化地图组件
					this.$nextTick(function(){
						console.log("new amap")
						console.log(that.endLongitude)
						that.map = new that.resAmap.Map('amap', {
							resizeEnable: true,
							center: [that.endLongitude,that.endLatitude], //地图中心点
							zoom: 16, //图显示的缩放级别
						});				  
					})
					
					//查找最终点的天气和位置信息
					that.endLocation = await that.getLocationByXY(that.endLongitude,that.endLatitude);
					that.endWeather = await that.getWeatherMess(that.endLocation.district)
					console.log(that.endWeather)
					
					//向前端传递天气和位置数据
					that.$ownerInstance.callMethod('setL',{
						endLocation:that.endLocation,
						endWeather:that.endWeather,
					}) 
					
				}catch(e){
					console.log(e)
				}
			},
			
			async initAmap() {
				var that = this;
				//引入高德API并初始化地图
				await that.importAMap()
				
				//绘制骑行路线
				that.initLine(that.allRoute);
				
				
			},
			
			/*
				将骑行路线绘制
			*/
			initLine(line){
				var that = this
				// 创建折线实例
				var polyline = new AMap.Polyline({
				    path: line,  
				    strokeWeight: 6, // 线条宽度
				    strokeColor: 'red', // 线条颜色
				    lineJoin: 'round' ,// 折线拐点连接处样式
					lineCap:'round',	//折线两端线帽的绘制样式
					showDir:true,	//线上的箭头
				});
				that.map.add(polyline);
			},
			
			/*
				根据经纬度获取地址信息
				返回具体位置信息 ,具体城市名
			*/
			async getLocationByXY(lng,lat){
				var that = this
				return new Promise((resolve, reject) => {
					AMap.plugin('AMap.Geocoder', function() {
						var geocoder = new AMap.Geocoder({
							// city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
							city: '010'
						})
						
						var position = [lng,lat];
						geocoder.getAddress(position, function(status, result) {
							if (status === 'complete' && result.info === 'OK') {
								// result为对应的地理位置详细信息
								var mes = {
									district :result.regeocode.addressComponent.district,
									formattedAddress :result.regeocode.formattedAddress
								}
								resolve(mes);
							}
						})
					})
				})
			},
			
			/*
				根据传入的city城市名，查询天气信息，返回天气对象
			*/
			async getWeatherMess(city){
				var that = this
				return new Promise((resolve, reject) => {
					//天气插件获取天气信息
					that.map.plugin('AMap.Weather', () => {
						var weather1 = new AMap.Weather();
						//查询实时天气信息, 查询的城市到行政级别的城市
						weather1.getLive(city, function(err, data) {
							if (!err) {
								//获取天气信息
								var w = data;
								resolve(w);
							}else{
								resolve();
							}
						});
					});
				})
			},
			changeLocal(){
				
			},
			
		}
	}
</script>

<style>
	@import url("../../static/css/weather.css");
	
	.body1{
		background-color: #FCF9F2;
		width: 750rpx; 
		height: 100vh;
	}
	
	
	#amap {
		width: 750rpx; //750rpx直接全屏
		height: 55vh;
		z-index:0
	}
	
	.buttom{
		position: absolute;
		top: 52vh;
		left: 12rpx;
		border-radius: 20rpx;
		width: 730rpx;
		height:auto;
		background-color: #ffffff;
		box-shadow: 0rpx 0rpx 25rpx 1rpx rgba(50, 50, 50, 0.1);
	}
	.locationMess{
		position: relative;
		height: 34vh;
		width: 690rpx;
		//background-color: lightblue;
		left: 20rpx;
		align: center;
	}
	.startMess{
		border-radius: 20rpx;
		position: relative;
		height: 14vh;
		background-color: #FCF9F2;
		top: 2vh;
	}
	.messageFont1{
		padding: 10rpx 0 0 20rpx;
		font-size: 34rpx;
		font-family: 'Lato', sans-serif;
		font-weight: 600;
		color: #574F61;
	}
	.messageFont2{
		margin-left: 30rpx;
		margin-top: 8rpx;
		font-size: 28rpx;
		font-family:  'Lato', sans-serif;
		font-weight: 400;
		width: 490rpx;
		color: #999999;
	}
	.weather1{
		position: absolute;
		top: 14rpx;
		right: 20rpx;
	}
	.button1{
		color: #999999;
		font-size: 40rpx;
		font-weight: 550;
		background-color: white;
		border-radius: 20rpx;
		border: #ffffff;
		position: relative;
		top: 3vh;
		width: 400rpx;
		height: 8vh;
		box-shadow: 0rpx 0rpx 25rpx 1rpx rgba(50, 50, 50, 0.1);
		padding-top: 10rpx;
	}
	.startButtonFont{
		margin: auto 0;
		letter-spacing:6rpx;
		color: #574F61;
		font-size: 40rpx;
		font-weight: bolder;
	}
	.toActive{
		padding: 0vh;
		width: 300rpx;
		height: 8vh;
		border-radius: 10vh;
		position: absolute;
		top: 90vh;
		left: 60rpx;
		background-color: #DDEBF0;
	}
	.toBook{
		padding: 0vh;
		width: 300rpx;
		height: 8vh;
		border-radius: 10vh;
		position: absolute;
		top: 90vh;
		left: 400rpx;
		background-color: #DDEBF0;
	}
	
	.username{
		margin-left: 30rpx;
		margin-top: 20rpx;
		font-size: 40rpx;
		font-family:  'Lato', sans-serif;
		font-weight: 550;
		width: 490rpx;
		color: #000000;
	}
	.personMessFont2{
		margin-left: 30rpx;
		margin-top: 8rpx;
		font-size: 28rpx;
		font-family:  'Lato', sans-serif;
		font-weight: 400;
		width: 490rpx;
		color: #999999;
	}
	.date{
		padding: 10rpx 0;
	}
	
	
	.line1 {
		display: flex;
		flex-direction: row;
	}
	.item {
		width: 230rpx;
		height: 60rpx;
	}
	.font1 {
		padding: 15rpx 0 0 0;
		font-size: 26rpx;
		color: #82848A;
	}
	.font2 {
		padding: 30rpx 0 0 0;
		font-size: 48rpx;
		font-weight: bold;
	}
	.left {
		text-align: left;
		padding: 0 0 0 40rpx;
	}
	.center1{
		margin-left: 130rpx;
	}
	.center2{
		margin-left: 40rpx;
	}
	.right {
		text-align: right;
		padding: 0 40rpx 0 0;
	}
</style>
