<template>
	<view>
		<u-empty text="列表为空" :show="show" mode="list"></u-empty>
		<u-card v-for="(item,index) in list" :key="index" margin="1rpx 1rpx 0rpx 0rpx" :show-head="false" :show-foot="false" :border="false">
			<view  slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0 card">
					<u-avatar class="img" :src="item.src" size="100" 
					:show-sex="true"  ></u-avatar>
					<view class="u-body-item-title u-line-2 card-content">
						<view style="font-weight: bold;font-size: larger;">{{item.username}}</view>
						<view style="color:#82848A;font-size: smaller;margin-top: 10rpx">{{item.personSignature}}</view>
					</view>
					<u-button class="attention" shape="circle" size="default" @click="cancelAttention(item.userId)">已关注</u-button>
				</view>
			</view>
		</u-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			type: null,
			list: [
				{
					imgUrl:'',
					sex:'男',
					username:'他',
					personSignature:'这是我的个性签名',
					userId:1
				},
				{
					imgUrl:'',
					sex:'男',
					username:'他',
					personSignature:'这是我的个性签名',
					userId:2
				},
				{
					imgUrl:'',
					sex:'男',
					username:'他',
					personSignature:'这是我的个性签名',
					userId:3
				},
				{
					imgUrl:'',
					sex:'男',
					username:'他',
					personSignature:'这是我的个性签名',
					userId:4
				},
				{
					imgUrl:'',
					sex:'男',
					username:'他',
					personSignature:'这是我的个性签名',
					userId:5
				}
			],
			show: false
		};
	},
	methods: {
		cancelAttention(e){
			uni.showModal({
				content:'不再关注?',
				success(res){
					if(res.confirm){
						console.log("确定")
					}else if(res.cancel){
						console.log("取消")
					}
				}
			})
			
		},
		getBarTitle(type) {
			let title = '';
			switch (parseInt(type)) {
				case 1:
					title = '关注';
					break;
				case 2:
					title = '粉丝';
					break;
				default:
					break;
			}
			uni.setNavigationBarTitle({
				title: title
			});
		}
	},
	onLoad(options) {
		let type = options.type;
		this.getBarTitle(type);
		let that = this;
		if (type == null || typeof type === 'undefined' || type == '') {
			uni.showToast({
				title: '未知错误',
				success() {
					uni.navigateBack();
				}
			});
		} else {
			// uni.request({
			//  url:'获取用户点赞或者其他类型的数据',
			//  data:{
			//   type:type
			//  },
			//  header:{
			// token:""
			//  },
			//  dataType:'json',
			//  method:'get',
			//  success(e){
			//   that.list = e.data
			//  }
			// })
			if (that.list == null || that.list.length == 0) {
				that.show = !that.show;
			}
		}
	}
};
</script>

<style scoped lang="scss">
.card{
	display: flex;
	justify-content: space-around;
	align-items: center;
	align-content: center;
}
.img{
	flex: 3;
	margin: 10rpx;
}
.card-content{
	flex: 7;
	margin: 10rpx;
}
.attention{
	flex: 2;
	margin: 10rpx;
}
</style>
