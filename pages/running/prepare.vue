<template>
	<view>
		<view class="amap-container">
			<view id="amap" class="amap">
			</view>
		</view>
		

	
	<u-tabbar v-model="tabBarCurrent" :list="tabBarList" :mid-button="true" mid-button-size="90"></u-tabbar>
	</view>
	
</template>

<script module="amap" lang="renderjs">
	import store from "../../store/index.js"
	export default {
		data() {
			return {
				tabBarCurrent:0,
				tabBarList:[],
				map: null,
				mapUI: null,
				longitude: null, //地理位置的经度
				latitude: null, //地理位置的纬度
				nowMarker: null, //当前位置的标记点	
				geolocation: {}, //AMap.Geolocation对象，用来获取地理位置
				
			}
		},
		onLoad() {
			this.tabBarList = store.state.vuex_tabbar
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
		methods: {
			async initAmap() {
				var that = this;
			
				//使用await使地理地址获取后再进行地图初始化
				var x = await that.initLocal();
			
				//初始化地图组件
				console.log("new amap")
				that.map = new AMap.Map('amap', {
					resizeEnable: true,
					center: [that.longitude, that.latitude], //地图中心点
					zoom: 17, //图显示的缩放级别
				});
				
				//在当前位置创建标记点
				var marker = new AMap.Marker({
					icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
					position: [that.longitude, that.latitude]
				});
				that.nowMarker = marker
				that.map.add(that.nowMarker);
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
						本来想直接调用函数，但是异步没办法解决，只能重复代码
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
		}
	}
</script>

<style>
	#amap {
		width: 750rpx; //750rpx直接全屏
		height: 50vh;
		z-index: 0;
	}
	
</style>
