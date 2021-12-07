<template>
	<view>
		<view class="weather-wrapper">
		    <view class="weather-card">
		        <view class="weather-icon sun"></view>
		        <h1>26º</h1>
		    </view>
		    <view class="weather-card">
		        <view class="weather-icon cloud"></view>
		        <h1>14º</h1>
		    </view>
			<view class="weather-card">
			    <view class="weather-icon raining"></view>
			    <h1>14º</h1>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				allRoute:[
					[112.590189,37.42093],
					[112.589862,37.420964],
					[112.58984,37.421033],
					[112.590151,37.423205],
					[112.590211,37.423431],
					[112.591139,37.429996],
					[112.588569,37.43115],
					[112.587979,37.426368],
				],	//总路线数组
			}
		},
		methods: {
			
		},
		mounted() {
			var that = this;
			var allRoute = JSON.stringify(that.allRoute);
			console.log(allRoute)
			uni.setStorageSync('allRoute',allRoute);
			uni.navigateTo({
				url:'../prepare'
			})
		}
	}
</script>

<style >
	@import url("../../../static/css/weather.css");
</style>