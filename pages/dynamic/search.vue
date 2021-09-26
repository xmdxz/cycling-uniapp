<template>
	<view>
		<u-navbar back-text="返回" title="搜索"></u-navbar>
		<view class="search">
			<u-search shape="round" :clearabled="true" placeholder="请输入要搜索的动态" input-align="center"></u-search>
		</view>
		<view class="history-search">
			<view class="history-hint">
				<text>历史搜索</text>
				<view>
					<u-icon name="trash" size="35"></u-icon>
				</view>
			</view>
			<view class="search-items">
				<view class="search-item">
					<text>太谷游玩</text>
				</view>
				<view class="search-item">
					<text>骑行</text>
				</view>
				<view class="search-item">
					<text>游玩</text>
				</view>
				<view class="search-item">
					<text>开心</text>
				</view>
				<view class="search-item">
					<text>山西农业大学</text>
				</view>
				<view class="search-item">
					<text>山西农业大学</text>
				</view>
				<view class="search-item">
					<text>太原理工大学</text>
				</view>
				<view class="search-item">
					<text>太原</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.search {
		width: 90%;
		margin: 0 auto;
		margin-top: 20upx;
	}

	.history-search {

		width: 90%;
		margin: 0 auto;

	}

	.history-search .history-hint {
		font-size: 35upx;
		font-weight: 500;
		margin-top: 30upx;
		margin-bottom: 10upx;
		display: flex;
		justify-content: space-between;
	}

	.search-items {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.search-items .search-item {
		margin-top: 10upx;
		width: auto;
		display: inline-block;
		padding: 10upx 20upx;
		border-radius: 40upx;
		background-color: #F9F9F9;
	}
</style>
