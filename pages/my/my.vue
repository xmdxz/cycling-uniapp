<template>
	<view>
		<view>
			<view class="img">
				<u-avatar :src="ownInfo.avatar | appendUrlPrefix" size="200" :show-sex="true" :show-level="true" @click="showAvatar()"></u-avatar>
				<view class="username">{{ ownInfo.username }}</view>
				<view class="personnSign">{{ ownInfo.introduction }}</view>
			</view>
			<u-gap height="20" bg-color="#e2e2e2"></u-gap>
			<u-grid :col="4">
				<u-grid-item>
					<view class="grid-text">{{ relatedCount.praisedCount }}</view>
					<view class="grid-text">获赞</view>
				</u-grid-item>
				<u-grid-item @click="info(0)">
					<view class="grid-text">{{ relatedCount.focusCount }}</view>
					<view class="grid-text">关注</view>
				</u-grid-item>
				<u-grid-item @click="info(1)">
					<view class="grid-text">{{ relatedCount.fansCount }}</view>
					<view class="grid-text">粉丝</view>
				</u-grid-item>
				<u-grid-item>
					<view class="grid-text">{{ relatedCount.visitorCount }}</view>
					<view class="grid-text">访客</view>
				</u-grid-item>
			</u-grid>
			<u-gap height="20" bg-color="#e2e2e2"></u-gap>
			<u-cell-group>
				<!-- <u-cell-item icon="level" title="成就"></u-cell-item>
				<u-cell-item icon="order" title="路书"></u-cell-item> -->
				<u-cell-item icon="star" title="收藏" @click="toOther(0)"></u-cell-item>
				<u-cell-item icon="list" title="我发布的" @click="toOther(1)"></u-cell-item>
				<!-- <u-cell-item icon="car" title="车队"></u-cell-item> -->
				<u-cell-item icon="account" title="个人与设置" @click="toSetting()"></u-cell-item>
			</u-cell-group>
		</view>
		<u-tabbar v-model="tabBarCurrent" :list="tabBarList" :mid-button="true" mid-button-size="90"></u-tabbar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabBarCurrent: 0,
			tabBarList: [],
			ownInfo: {
				avatar: '../../static/img/qixing.jpg'
			},
			relatedCount: {
				fansCount: 0,
				focusCount: 0,
				praisedCount: 0,
				visitorCount: 0
			}
		};
	},
	onLoad() {
		let that = this;
		this.tabBarList = this.$store.state.vuex_tabbar;
		this.$u.api.getOwnInfo().then(res => {
			if (res.avatar == null || res.avatar === '' || typeof res.avatar === 'undefined') {
				delete res.avatar;
			}
			that.ownInfo = { ...that.ownInfo, ...res };
		});
		this.$u.api.getRelatedCount().then(res => {
			that.relatedCount = res;
		});
	},
	onShow() {
		let that = this;
		this.$u.api.getOwnInfo().then(res => {
			if (res.avatar == null || res.avatar === '' || typeof res.avatar === 'undefined') {
				delete res.avatar;
			}
			that.ownInfo = { ...that.ownInfo, ...res };
		});
		this.$u.api.getRelatedCount().then(res => {
			that.relatedCount = res;
		});
	},
	methods: {
		toOther(e) {
			this.$Router.push({ name: 'collect', params: { type: e } });
		},
		toSetting() {
			// uni.navigateTo({
			// 	url: './setting'
			// });
			this.$Router.push({ name: 'setting' });
		},
		showAvatar: function() {
			let that = this
			uni.previewImage({
				urls:new Array(that.filters['appendUrlPrefix'](that.ownInfo.avatar))
			})
		},
		info: function(e) {
			uni.navigateTo({
				url: './info?type=' + e
			});
		}
	}
};
</script>

<style scoped>
.img {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	flex-direction: column;
	margin: 50rpx auto;
}
.username {
	font-size: larger;
	font-weight: bold;
	margin-top: 10rpx;
	margin-left: 40rpx;
}
.personnSign {
	font-size: small;
	margin: 10rpx auto;
	margin-bottom: 0;
	color: #909399;
}
</style>
