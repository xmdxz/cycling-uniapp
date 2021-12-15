<template>
	<view class="body1">
		<view class="amap-container">
			<view id="amap" class="amap" :prop="allRoute" :change:prop="amap.changeAllRoute"></view>
			<view class="amap" style="background-color: #2C405A;"></view>
		</view>
		
		<view class="buttom">
			<view class="locationMess">
				<view class="startMess">
					<view style="">
						<view class="messageFont1">
							起始位置:
						</view>
						<view class="messageFont2">
							{{startLocation}}
						</view>
						<view class="weather-wrapper weather1">
						    <view class="weather-card">
						        <view class="weather-icon raining"></view>
						        <h1>{{startWeather.temperature}}º</h1>
						    </view>
						</view>
					</view>
				</view>
				<view class="endMess">
					<view v-if="isEnd">
						<view class="messageFont1">
							目的位置:
						</view>
						<view class="messageFont2">
							{{endLocation}}
						</view>
						<view class="weather-wrapper weather1">
						    <view class="weather-card">
						        <view class="weather-icon sun"></view>
						        <h1>{{endWeather.temperature}}º</h1>
						    </view>
						</view>
					</view>
					<view v-else>
						<button class="button1">
							<text>去路书选择骑行路线</text>
						</button>
					</view>
				</view>
			</view>
		</view>
		
		<view>
			<button class="startButton" @click="amap.toRunning">
				<view class="startButtonFont">开始骑行</view>
			</button>
		</view>
		
		<view style="z-index: 999; padding-bottom: 2rpx;">
			
		</view>
		<u-tabbar v-model="tabBarCurrent" :list="tabBarList" :mid-button="true" mid-button-size="90"></u-tabbar>
	</view>
	
</template>
<script>
	import store from "../../store/index.js"
	export default{
		data(){
			return{
				tarBarList:[],
				tabBarCurrent:0,
				
				isEnd:false,
				rendjsMess:null,

				allRoute:null,
				startLocation:null,
				startWeather:{
					temperature:0.0,
				},
				endLocation:null,
				endWeather:{
					temperature:0.0,
				},
			}
		},
		onLoad() {
			this.tabBarList = store.state.vuex_tabbar	//引入tarBar
			var that = this
			
			//获取从路书传来的路线数据
			console.log("load")
			var rou = that.getRoute();
			console.log(rou)

			if(allRoute!=null && allRoute!=''){
				that.allRoute = JSON.parse(allRoute);
			}
		},
		mounted() {
		},
		methods:{
			async getRoute(){
				var mes = await this.$u.api.getRideRoute({});
				console.log(mes)
				var a1 = mes.toArray()
				console.log(a1)
				return mes.result;
			},
			uniGPS() {
				var that = this
				//setInterval(function(){
					uni.getLocation({
						type: 'wgs84', //返回可以用于uni.openLocation的经纬度
						//type:"gcj02",
						success: function(res) {
							that.options.latitude = res.latitude;
							that.options.longitude = res.longitude;
							console.log(res.longitude + " " +res.latitude);
						}
					})
					
				//},1000);
			},
			setL(data){
				var that = this
				that.startLocation = data.startLocation1;
				that.startWeather = data.startWeather1;
				that.endLocation = data.endLocation1;
				that.endWeather = data.endWeather1;
			},
			setIsEnd(data){
				var that = this
				that.isEnd = data.isEnd;
			}
		}
		
	}
	
</script>

<script module="amap" lang="renderjs">
	export default {
		data() {
			return {
				map: null,
				mapUI: null,
				
				allRoute:null,	//总路线数组
				
				nowLongitude:null,
				nowLatitude:null,
				
				startLongitude: null, 	//start地理位置的经度
				startLatitude: null, 	//start地理位置的纬度
				endLongitude: null, 	//end地理位置的经度
				endLatitude: null, 		//end地理位置的纬度
				startCity:null,			//start城市，用来给天气查询传参
				endCity:null,			//end城市，用来给天气查询传参
				
				startMarker: null, //起始位置的标记点	
				endMarker: null, //目的地的标记点	
				geolocation: {}, //AMap.Geolocation对象，用来获取地理位置
				
				nowLocation:null,	//目前具体位置
				startWeather:null,	//天气信息
				startLocation:null,	//具体位置
				endWeather:null,	//天气信息
				endLocation:null,	//具体位置
				nowCity:null,
			}
		},
		mounted() {
			var that = this
			
			//如果传入路线数据，则初始化路线
			if(that.allRoute!=null){
				console.log("call setIsEnd")
				//将前端控制数据置为true，显示目的地信息
				that.$ownerInstance.callMethod('setIsEnd',{				
					isEnd:true,
				})
				//将路线的起点和终点的位置提取出来
				var len = that.allRoute.length
				that.startLongitude = that.allRoute[0][0]
				that.startLatitude = that.allRoute[0][1]
				that.endLongitude = that.allRoute[len-1][0]
				that.endLatitude = that.allRoute[len-1][1]
			}
			
			
			//引入高德api
			const script = document.createElement('script');
			script.src =
				'https://webapi.amap.com/maps?v=1.4.15&key=c53c3b4ab77aa34fc2f75b57004bbc10&plugin=AMap.Geolocation';
			script.onload = this.initAmap.bind(this)
			document.head.appendChild(script);
		
			//引入UI组件库
			const script2 = document.createElement('script')
			script2.src = 'https://webapi.amap.com/ui/1.0/main-async.js'
			document.head.appendChild(script2);
			console.log("引入api")
		
			if (typeof window.AMap === 'function') {
				console.log("before")
				this.initAmap();
			} else {
				console.log("after")
			}
		},
		methods: {
			async initAmap() {
				var that = this;
			
				//使用await使地理地址获取后再进行地图初始化
				var x = await that.initLocal();
			
				//初始化地图组件
				console.log("new amap")
				that.map = new AMap.Map('amap', {
					resizeEnable: true,
					center: [that.nowLongitude, that.nowLatitude], //地图中心点
					zoom: 17, //图显示的缩放级别
				});
				
				//如果有传入的地图路线，则初始化路线以及起点和终点信息
				if(that.allRoute!=null && that.allRoute!=''){
					//获取目的地和起始点的详细位置信息
					var startCityMess = await that.getLocationByXY(that.startLongitude,that.startLatitude)
					that.startLocation = startCityMess.formattedAddress;	//起点具体位置
					that.startCity = startCityMess.district			//起点的具体城市名，用来给天气查询函数传值
					
					var endCityMess = await that.getLocationByXY(that.endLongitude,that.endLatitude)
					that.endLocation = await endCityMess.formattedAddress;	//终点具体位置
					that.endCity = endCityMess.district				//终点的具体城市名，用来给天气查询函数传值
					//天气信息
					that.startWeather = await that.getWeatherMess(that.startCity);
					that.endWeather = await that.getWeatherMess(that.endCity);
					//绘制本次骑行路线
					that.initLine();
					//目的地和起始地点的标记点
					var startMarker = that.createMarker(that.startLongitude,that.startLatitude);
					that.map.add(startMarker);
					var endMarker = that.createMarker(that.endLongitude,that.endLatitude);
					that.map.add(endMarker);
					
					//将查询的信息数据传递至前台显示
					that.$ownerInstance.callMethod('setL',{				
						startLocation1:that.startLocation,
						startWeather1:that.startWeather,
						
						endLocation1:that.endLocation,
						endWeather1:that.endWeather,
					})
				}else{
					//如果没有传入路线，则默认起始地点为当前位置
					var startCityMess = await that.getLocationByXY(that.nowLongitude,that.nowLatitude)
					that.startLocation = startCityMess.formattedAddress;	//起点具体位置
					that.startCity = startCityMess.district			//起点的具体城市名，用来给天气查询函数传值
					that.startWeather = await that.getWeatherMess(that.startCity);
					
					//将查询的信息数据传递至前台显示
					that.$ownerInstance.callMethod('setL',{				
						startLocation1:that.startLocation,
						startWeather1:that.startWeather,
						endLocation1:null,
						endWeather1:null,
					})
				}
				
				//当前位置的标记点
				var nowMarker = that.createMarker(that.nowLongitude,that.nowLatitude);
				that.map.add(nowMarker);
				
			},
			
			/*
				引入AMap.Geolocation组件，并且初始化获取用户位置信息，用来初始化地图
			*/
			async initLocal() {
				var that = this
				return new Promise((resolve, reject) => {
					//引入AMap.Geolocation组件
					AMap.plugin('Amap.Geolocation', function() {
						that.geolocation = new AMap.Geolocation({
							enableHighAccuracy: true, //是否使用高精度定位，默认:true
							timeout: 10000, //超过10秒后停止定位，默认：5s
							convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
							buttonPosition: 'RB', //定位按钮的停靠位置
							buttonOffset: new AMap.Pixel(10,
								20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
							zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
							panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
							extensions:"all",	//详细信息，街道号等
						});
					});
					
					/*
						本来想直接调用函数，但是异步没办法解决，只能重复代码
					*/
					that.geolocation.getCurrentPosition(function(status, result) {
						if (status == 'complete') {
							console.log("定位成功");
							console.log('定位结果：' + result.position + '  定位类别：' + result.location_type +
								'  精度：' + result.accuracy + ' 米');
							that.nowLongitude = result.position.getLng()
							that.nowLatitude = result.position.getLat()
							//获取当前城市名(例如太谷区，而不是晋中市)
							that.nowCity = result.addressComponent.district;
							console.log(result.addressComponent.district);
							//获取具体位置信息
							that.nowLocation = result.formattedAddress;
							console.log(result.formattedAddress)
							resolve('complete');
						} else {
							console.log("解析定位信息失败,原因:" + result.message);
							resolve();
						}
					});
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
				创建标记点
				返回一个marker对象
			*/
			createMarker(lng, lat) {
				var that = this;
				var marker = new AMap.Marker({
					icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
					position: [lng, lat]
				});
				return marker;
			},
			
			/*
				将从路书选择的路线绘制
			*/
			initLine(){
				var that = this
				// 创建折线实例
				var polyline = new AMap.Polyline({
				    path: that.allRoute,  
				    strokeWeight: 6, // 线条宽度
				    strokeColor: 'red', // 线条颜色
				    lineJoin: 'round' ,// 折线拐点连接处样式
					lineCap:'round',	//折线两端线帽的绘制样式
					showDir:true,	//线上的箭头
				});
				that.map.add(polyline);
			},
			
			toRunning(){
				var that = this;
				var allRoute = null;
				if(that.allRoute!=null && that.allRoute!=''){
					allRoute = JSON.stringify(that.allRoute);
				}
				uni.navigateTo({
					url:'./run?allRoute='+allRoute
				})
			},
			
			changeAllRoute(newValue, oldValue, ownerVm, vm){
				console.log(newValue)
				console.log(oldValue)
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import url("../../static/css/weather.css");
	
	.body1{
		background-color: #fff;
		width: 750rpx; 
		height: 90vh;
	}
	
	.BMap_cpyCtrl {
        display: none;
    }
    .anchorBL {
        display: none;
    }
    .amap-logo img{
        display: none;
    }
    .amap-copyright {
        opacity:0;
    }
	
	#amap {
		width: 750rpx; //750rpx直接全屏
		height: 48vh;
	}
	
	.buttom{
		position: absolute;
		top: 46vh;
		left: 12rpx;
		border-radius: 20rpx;
		width: 730rpx;
		height:auto;
		background-color: #FCF9F2;
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
		background-color: #DDEBF0;
		top: 2vh;
	}
	.endMess{
		border-radius: 20rpx;
		position: relative;
		height: 14vh;
		background-color: #DDEBF0;
		top: 4vh;
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
		width: 440rpx;
		height: 8vh;
		box-shadow: 0rpx 0rpx 25rpx 1rpx rgba(50, 50, 50, 0.1);
	}
	.startButton{
		padding: 1vh;
		width: 400rpx;
		height: 10vh;
		border-radius: 12vh;
		position: absolute;
		top: 80vh;
		left: 175rpx;
		background-color: #DDEBF0;
	}
	.startButtonFont{
		letter-spacing:10rpx;
		color: #574F61;
		font-size: 42rpx;
		font-weight: bolder;
	}
</style>
