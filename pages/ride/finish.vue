<template>
	<view class="body1">
		<view class="amap-container">
			<view id="amap" class="amap" :prop="allRoute" :change:prop="amap.changeLocal"></view>
			<view class="amap" style="background-color: #2C405A;"></view>
		</view>
		
		<view class="buttom">
			<view class="locationMess">
				<view class="personMess">
					<view class="username">{{username}}</view>
					<view class="personMessFont2">
						<view class="date">{{date}}</view>
						<view class="temperature">
							<text>温度:{{rideWeather.temperature}}º</text>
							<text>{{"    "}}湿度:{{rideWeather.humidity}}%</text>
						</view>
						<view class="position">{{}}</view>
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
		<u-tabbar v-model="tabBarCurrent" :list="tabBarList" :mid-button="true" mid-button-size="90"></u-tabbar>
	</view>
	
	
</template>
<script>
	export default{
		data(){
			return{
				tarBarList:null,
				
				isEnd:false,
				rendjsMess:null,
				allRoute:null,

				options:{
					latitude: null,
					longitude: null
				},
				startLocation:null,
				endLocation:null,
				endWeather:null,
				
				username:"zyh",
				date:null,
				rideMess:null,	//{speed,hour,minute,secong,distance}
			}
		},
		onLoad(option) {
			this.tabBarList = store.state.vuex_tabbar
			
			console.log("finish finish")
			var that = this;
			that.rideWeather = JSON.parse(option.rideWeather);
			that.rideMess = JSON.parse(option.rideMess);
			that.allRoute = JSON.parse(option.allRoute);
			console.log(that.rideWeather);
			
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
				this.startLocation = data.startLocation;
				this.endLocation = data.endLocation;
				this.endWeather = data.endWeather;
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
				
				allRoute:null,
				
				startLongitude: null, //start地理位置的经度
				startLatitude: null, //start地理位置的纬度
				endLongitude: null, //end地理位置的经度
				endLatitude: null, //end地理位置的纬度
				
				nowMarker: null, //当前位置的标记点	
				geolocation: {}, //AMap.Geolocation对象，用来获取地理位置
				
				startWeather:null,	//天气信息
				startLocation:null,	//具体位置
				endWeather:null,	//天气信息
				endLocation:null,	//具体位置
				nowCity:null,
			}
		},
		mounted() {
			window._AMapSecurityConfig = {
			    securityJsCode:'778235a053b07118a187f5ef22a48e65',
			}
			var that = this
			//引入高德api
			const script = document.createElement('script');
			script.src =
				'https://webapi.amap.com/maps?v=1.4.15&key=31fc1704dff8d7ec2623319c245dcfe6&plugin=AMap.Geolocation';
			script.onload = this.initAmap.bind(this)
			document.head.appendChild(script);
			
			//引入UI组件库
			const script2 = document.createElement('script')
			script2.src = 'https://webapi.amap.com/ui/1.0/main-async.js'
			document.head.appendChild(script2)
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
				console.log(that.allRoute)
				var allRouteLength = that.allRoute.length
				//初始化地图组件
				console.log("new amap")
				that.map = new AMap.Map('amap', {
					resizeEnable: true,
					center: [that.allRoute[allRouteLength-1][0],that.allRoute[allRouteLength-1][1]], //地图中心点
					zoom: 17, //图显示的缩放级别
				});
				
				//绘制骑行路线
				that.initLine(that.allRoute);
				
				/* //test
				that.$ownerInstance.callMethod('setL',{
					// startLongitude:that.startLongitude,
					// startLatitude:that.startLatitude,
					
					// endLongitude:that.endLongitude,
					// endLatitude:that.endLatitude,
					
					startLocation:that.startLocation,
					
					endLocation:that.endLocation,
					endWeather:that.endWeather,
					
				}) */
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
	
	//去除高德logo
	.amap-logo{
		display: none;
		opacity:0 !important;
	}
	.amap-copyright {
	    opacity:0;
	}
	
	#amap {
		width: 750rpx; //750rpx直接全屏
		height: 55vh;
		z-index: 0;
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
		top: 6vh;
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
