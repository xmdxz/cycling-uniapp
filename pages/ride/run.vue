<template>
	<view>
		<view class="floatingMessage">
			<button @click="uniGPS">start</button>
			<button @click="amap.start">start</button>
			<button @click="amap.stop">stop</button>
			<button @click="amap.removePol">消除路径</button>
			<button @click="amap.initAllRoute">绘制总骑行路径</button>
			<button @click="amap.toFinish">结束骑行</button>
		</view>
		<view class="amap-container">
			<view id="amap" class="amap" :prop="oldAllRoute" :change:prop="amap.updateEcharts">
			</view>
			<!--:prop="option"-->
		</view>
		<view class="table">
			<view class="line1 font1">
				<view class="item left" v-on:click="test3()">时速(km/h)</view>
				<view class="item">时间</view>
				<view class="item right">距离(km)</view>
			</view>
			<view class="line1 font2">
				<view class="item left">{{speed}}</view>
				<view class="item">
					<text v-if="computeTime"> 0{{hour}} </text>
					<text v-else> {{hour}} </text>:
					<text v-if="computeTime(minute)"> 0{{minute}} </text>
					<text v-else> {{minute}} </text>:
					<text v-if="computeTime(second)"> 0{{second}} </text>
					<text v-else> {{second}} </text>
				</view>

				<view class="item right">{{distance}}</view>
			</view>
		</view>
		<u-tabbar v-model="tabBarCurrent" :list="tabBarList" :mid-button="true" mid-button-size="90"></u-tabbar>
	</view>
	
	
</template>

<script>
	import store from "../../store/index.js"
	export default {
		data() {
			return {
				rabBarList:null,
				
				speed: 3.25,
				hour: 0,
				minute: 0,
				second: 0,
				distance: 0.0,

				oldAllRoute:null,
			}
		},
		onLoad() {
			this.tabBarList = store.state.vuex_tabbar
			var that = this
			console.log("load")
			//获取从路书传来的路线数据
			var oldAllRoute = null;
			oldAllRoute = uni.getStorageSync("allRoute");
			if(oldAllRoute!=null && oldAllRoute!=''){
				that.oldAllRoute = JSON.parse(oldAllRoute);
			}
		},
		mounted() {},
		methods: {
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
			/*
				获取结束时的时间
			*/
			getDate(){
				var that = this;
				var d = new Date();
				var string = "";
				var minutes = d.getMinutes();
				if(minutes<10){
					minutes = "0"+minutes;
				}
				string += d.getFullYear()+"/"+d.getMonth()+"/"+d.getDate();
				string += "  "+d.getHours()+":"+minutes
				that.date = string;
			},
			/*
				从renderjs获取时间数据并渲染到前台，1s
			*/
			setTime(time) {
				var that = this
				that.hour = time.hour
				that.minute = time.minute
				that.second = time.second
			},
			/*
				从renderjs获取距离数据并渲染到前台，3s
			*/
			setDistanceAndSpeed(data) {
				var that = this
				that.distance = data.dis //设置距离
				that.speed = data.spd
			},
			uniGPS() {
				this.handleNotice()
				setInterval(function(){
					uni.getLocation({
						type: 'wgs84', //返回可以用于uni.openLocation的经纬度
						success: function(res) {
							const latitude = res.latitude;
							const longitude = res.longitude;
							console.log(longitude + " " +latitude);
						}
					})
				},1000);
			},
			handleNotice() {
				let system = uni.getSystemInfoSync(); // 获取系统信息
				console.log(JSON.stringify(system));
				if (system.platform === 'android') { // 判断平台
					console.log("android")
					var context = plus.android.importClass("android.content.Context");
					var locationManager = plus.android.importClass("android.location.LocationManager");
					var main = plus.android.runtimeMainActivity();
					var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
					//if (mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
					uni.showModal({
						title: '提示',
						content: '请打开定位服务功能',
						//showCancel: false, // 不显示取消按钮
						success: () => {
							if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
								var Intent = plus.android.importClass('android.content.Intent');
								var Settings = plus.android.importClass('android.provider.Settings');
								var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
								main.startActivity(intent); // 打开系统设置GPS服务页面
							} else {
								console.log('GPS功能已开启');
							}
						}
					});
					
				}
			},
			
		}

	}
</script>

<script module="amap" lang="renderjs">
	export default {
		data() {
			return {
				map: null,
				mapUI: null,

				geolocation: {}, //AMap.Geolocation对象，用来获取地理位置
				option: [{
					lng: 112.593841,
					lat: 37.426783
				}, {
					lng: 112.585069,
					lat: 37.430841
				}],
				
				startPosition:null,
				endPosition:null,
				
				rideWeather:null,
				
				oldAllRoute:null,
				
				//整个骑行过程中的路径信息数据，为二维数组[[lng,lat],[lng,lat]]
				allRoute: [],
				longitude: null, //地理位置的经度
				latitude: null, //地理位置的纬度

				nowMarker: null, //当前位置的标记点	

				polylineInterval: null, //实时定位及路线的定时器
				clockInterval: null, //时间数据的定时器
				returnTimeInterval: null, //返回给前端时间数据的计时器

				pol: null,

				speed: 3.25,
				hour: 0,
				minute: 0,
				second: 0,
				distance: 0.0,
			}
		},
		mounted() {
			var that = this
			//引入高德api
			const script = document.createElement('script');
			script.src =
				'https://webapi.amap.com/maps?v=1.4.15&key=c53c3b4ab77aa34fc2f75b57004bbc10&plugin=AMap.Geolocation';
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
		created() {

		},
		methods: {
			/*
				监听 service 层数据变更
			*/
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				
			},
			start(event, ownerInstance) {
				var that = this
				that.clock() //时间计时器
				//返回时间数据给前台的计时器，1s
				that.returnTimeInterval = setInterval(function() {
					ownerInstance.callMethod('setTime', {
						hour: that.hour,
						minute: that.minute,
						second: that.second
					})
				}, 1000)
				//实时获取位置信息以及绘制标记点的计时器，3s
				that.polylineInterval = setInterval(function() {
					//记录上次坐标的位置信息
					var lastLng = that.longitude
					var lastLat = that.latitude
					
					that.onTimeGetLocaltion(); //获取实时位置
					/* that.longitude += 0.0002;
					that.latitude += 0.0002; */

					that.createPolyline(); //描绘实时路线

					that.createNowMarker(that.longitude, that.latitude) //绘制当前坐标的标记点

					var arr = [that.longitude, that.latitude]
					that.allRoute.push(arr); //向总路径的数组中push当前坐标
					console.log(that.allRoute);

					//使用插件获取已总走路程数
					var dis = (AMap.GeometryUtil.distanceOfLine(that.allRoute)) / 1000; //m -> km
					//保留两位小数
					that.distance = Number(dis).toFixed(2)
					//计算最后一段3s内路程的骑行速度
					var lastDis = (AMap.GeometryUtil.distanceOfLine([
						[lastLng, lastLat],
						[that.longitude, that.latitude]
					])); //单位m
					var s = (lastDis / 3) * 3600 / 1000 //计算最后3s内的平均速度，并转换为km/h
					var lastSpd = Number(s).toFixed(2)
					//将数据传值到前台
					ownerInstance.callMethod('setDistanceAndSpeed', {
						dis: that.distance,
						spd: lastSpd
					})
				}, 3000);

			},
			stop() {
				var that = this
				//关闭计时器
				console.log("关闭计时器")
				clearInterval(that.polylineInterval);
				clearInterval(that.clockInterval)
				clearInterval(that.returnTimeInterval)
			},
			removePol() {
				var that = this
				that.pol.setMap(null);
				//that.map.remove(that.pol)
			},
			initAllRoute() {
				var that = this
				that.initAMapUi(); //绘制结束后的路线
			},

			onTimeGetLocaltion() {
				var that = this
				//使用await 先获取地理位置，再改变坐标
				//await that.getLocal();
				that.getLocal();
			},


			async initAmap() {
				var that = this;

				//使用await使地理地址获取后再进行地图初始化
				var x = await that.initLocal();

				//将第一次获取的位置信息填入，即初始化allRoute
				alert("push before")
				var pushLocal = [
					[that.longitude, that.latitude]
				];
				that.allRoute = pushLocal
				alert("push after")

				//初始化地图组件
				console.log("new amap")
				that.map = new AMap.Map('amap', {
					resizeEnable: true,
					center: [that.longitude, that.latitude], //地图中心点
					zoom: 17, //图显示的缩放级别
				});
				//初始化mapUI
				initAMapUI();
				alert("initAMapUI")
				
				//如果传递有路线，则绘制路线
				if(that.oldAllRoute!=null && that.oldAllRoute!=''){
					console.log("initLine")
					that.initLine();
				}
				
				//创建当前位置的图标点
				that.createNowMarker(that.longitude, that.latitude);
				console.log("创建nowMarker成功")

				//天气插件获取天气信息
				that.map.plugin('AMap.Weather', () => {
					var weather = new AMap.Weather();
					//查询实时天气信息, 查询的城市到行政级别的城市
					weather.getLive('晋中市', function(err, data) {
						if (!err) {
							console.log(data.city);
							//获取天气信息
							that.rideWeather = data;
							console.log(that.rideWeather);
						}
					});
				});

				// 同时引入工具条插件，比例尺插件
				that.map.plugin([
					'AMap.ToolBar',
					'AMap.Scale',
					'AMap.Geolocation',
				], function() {
					// 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
					that.map.addControl(new AMap.ToolBar());
					// 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
					that.map.addControl(new AMap.Scale());
					// 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
					that.map.addControl(new AMap.Geolocation());
				});
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
						});
					});
					/*
					***
						本来想直接调用函数，但是异步没办法解决，只能重复代码
					***
					*/
					that.geolocation.getCurrentPosition(function(status, result) {
						if (status == 'complete') {
							console.log("定位成功");
							console.log('定位结果：' + result.position + '  定位类别：' + result.location_type +
								'  精度：' + result.accuracy + ' 米');
							that.longitude = result.position.getLng()
							that.latitude = result.position.getLat()
							alert(that.longitude + " " + that.latitude);
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
				调用高德插件获取地理位置坐标，并储存
			*/
			getLocal() {
				var that = this
				//return new Promise((resolve, reject) => {
				that.geolocation.getCurrentPosition(function(status, result) {
					if (status == 'complete') {
						console.log("定位成功!!!");
						console.log('定位结果：' + result.position + '  定位类别：' + result.location_type +
							'  精度：' + result.accuracy + ' 米');
						console.log(result.position.getLng())
						//给当前位置的经纬度改变值
						that.longitude = result.position.getLng();
						that.latitude = result.position.getLat();
						console.log(that.latitude)
						console.log(result.formattedAddress)
						console.log("success resolve")
						//resolve();
					} else {
						console.log("解析定位信息失败,原因:" + result.message);
						//resolve();
					}
				});
				//})
			},

			/*
				高德规划骑行路线组件
				传入起点经纬度和终点经纬度,自动规划路线
			*/
			planRide(stratLng, startLat, endLng, endLat) {
				//Riding对象参数
				var ridingOption = {
					map: that.map,
					policy: 1,
					hideMarkers: false,
					isOutline: true,
					outlineColor: '#ffeeee',
					autoFitView: true
				}
				//使用高德路线规划的骑行Riding组件
				that.map.plugin('AMap.Riding', () => {
					let riding = new AMap.Riding(ridingOption);
					//console.log(this.option[0].lng+" "+this.option[0].lat);
					riding.search([stratLng, startLat], [endLng, endLat], function(status, result) {
						if (status === 'complete') {
							console.log('绘制路线完成')
							console.log(result)
							that.rideInfo = result;
							console.log("骑行起点为:" + that.rideInfo.origin);
							console.log("骑行终点为:" + that.rideInfo.destination);
							var rideTime = 0;
							var rideDistance = 0;
							for (var i = 0; i < that.rideInfo.routes.length; i++) {
								rideTime += that.rideInfo.routes[i].time;
								rideDistance += that.rideInfo.routes[i].distance;
							}
							console.log("预计骑行时间为:" + rideTime + "秒")
							console.log("预计骑行总长度为:" + rideDistance + "米")
						} else {
							console.log('获取数据失败：' + result)
						}
					})
				});

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
				创建当前地理位置的marker
			*/
			createNowMarker(lng, lat) {
				var that = this;
				//如果旧marker存在，则移除后再创建新的当前marker
				if (that.nowMarker != null) {
					//Object.keys()可以获取对象的属性值并封装为数组，长度不为0则marker对象存在
					that.map.remove(that.nowMarker);
				}
				//调用createMarker()创建当前位置的marker对象
				that.nowMarker = that.createMarker(lng, lat);
				that.map.add(that.nowMarker);
			},

			/*
				绘制骑行过程中的实时路线
			*/
			createPolyline() {
				var that = this;
				if (that.pol != null) {
					that.pol.setMap(null)
				}
				that.pol = new AMap.Polyline({
					path: that.allRoute,
					borderWeight: 2, // 线条宽度，默认为 1
					strokeColor: 'blue', // 线条颜色
					lineJoin: 'round', // 折线拐点连接处样式
					lineCap: 'round',
					isOutline: true, //边框
					outlineColor: '#ffeeff',
					borderWeight: 3,
				})
				that.pol.setMap(that.map)
				//that.map.add(that.pol);
			},

			/*
				加载使用AMapUI组件
				调用方法并绘制最后的总骑行路线
			*/
			initAMapUi() {
				var that = this
				//加载PathSimplifier，loadUI的路径参数为模块名中 'ui/' 之后的部分
				AMapUI.load(['ui/misc/PathSimplifier'], function(PathSimplifier) {

					if (!PathSimplifier.supportCanvas) {
						alert('当前环境不支持 Canvas！');
						return;
					}
					console.log(111)
					//绘制路线
					that.initRoute(PathSimplifier);
				});
			},

			/*
				结束之后绘制轨迹回放
			*/
			initRoute(PathSimplifier) {
				var that = this
				//创建组件实例
				var pathSimplifierIns = new PathSimplifier({
					zIndex: 100,
					map: that.map, //所属的地图实例
					getPath: function(pathData, pathIndex) {
						//返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
						return pathData.path;
					},
					getHoverTitle: function(pathData, pathIndex, pointIndex) {
						//返回鼠标悬停时显示的信息
						if (pointIndex >= 0) {
							//鼠标悬停在某个轨迹节点上
							return pathData.name + '，点:' + pointIndex + '/' + pathData.path.length;
						}
						//鼠标悬停在节点之间的连线上
						return pathData.name + '，点数量' + pathData.path.length;
					},
					renderOptions: {
						//轨迹线的样式
						pathLineStyle: {
							strokeStyle: 'red',
							lineWidth: 6,
							dirArrowStyle: true
						}
					}
				});

				pathSimplifierIns.setData([{
					name: '路径',
					path: that.allRoute
				}, ]);

				//创建一个巡航器
				var navg0 = pathSimplifierIns.createPathNavigator(0, //关联第1条轨迹
					{
						loop: true, //循环播放
						speed: 20
					});
				navg0.start();

			},
			
			/*
				将从路书选择的路线绘制
			*/
			initLine(){
				var that = this
				// 创建折线实例
				var polyline = new AMap.Polyline({
				    path: that.oldAllRoute,  
				    strokeWeight: 6, // 线条宽度
				    strokeColor: 'red', // 线条颜色
				    lineJoin: 'round' ,// 折线拐点连接处样式
					lineCap:'round',	//折线两端线帽的绘制样式
					showDir:true,	//线上的箭头
				});
				that.map.add(polyline);
			},

			/*
				时间计时器
			*/
			clock() {
				var that = this
				that.clockInterval = setInterval(function() {
					console.log(that.second)
					that.second += 1;
					if (that.second >= 60) {
						that.second = 0;
						that.minute += 1;
					}
					if (that.minute >= 60) {
						that.minute = 0;
						that.hour += 1;
					}
				}, 1000);
			},
			
			/*
				结束骑行，跳转到finish页面
			*/
			toFinish(){
				var that = this;
				var rm = {
					speed: that.speed,
					hour: that.hour,
					minute: that.minute,
					second: that.second,
					distance: that.distance,
				};
				/**
					模拟路线
				*/
				var ar = [
					[112.590189,37.42093],
					[112.589862,37.420964],
					[112.58984,37.421033]
				]
				
				//var allRoute = JSON.stringify(that.allRoute); //所有的路线坐标信息
				/**
				 *	模拟路线 
				 */
				var allRoute = JSON.stringify(ar);
				var rideWeather = JSON.stringify(that.rideWeather);
				var rideMess = JSON.stringify(rm);	//骑行信息，例如速度、时间
				uni.navigateTo({
					url:'./finish?rideMess='+rideMess+'&rideWeather='+rideWeather+'&allRoute='+allRoute
				})
			},

			
			uniGPS() {
				uni.getLocation({
					type: 'wgs84', //返回可以用于uni.openLocation的经纬度
					success: function(res) {
						const latitude = res.latitude;
						const longitude = res.longitude;
						alert('当前位置的经度：' + longitude);
						alert('当前位置的纬度：' + latitude);
					}
				})
			}

		},

	}
</script>






<style lang="scss" scoped>
	
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
		height: 90vh;
		z-index: 0;
	}

	.floatingMessage {
		background-color: lightpink;
		position: absolute;
		left: 50rpx;
		z-index: 1;
	}

	.table {
		top: 1050rpx;
		position: absolute;
		flex-direction: column;
		margin: 0 30rpx;
		width: 690rpx;
		display: flex;
		border-radius: 20rpx;
		text-align: center;
		background-color: white;
		z-index: 1;
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
		padding: 30rpx 0 0 0;
		font-size: 26rpx;
		color: #82848A;
	}

	.font2 {
		padding: 0 0 20rpx 0;
		font-size: 40rpx;
		font-weight: bold;
	}

	.left {
		text-align: left;
		padding: 0 0 0 40rpx;
	}

	.right {
		text-align: right;
		padding: 0 40rpx 0 0;
	}
</style>
