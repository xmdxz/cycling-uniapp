<template>
	<view>
		<view>
			<u-cell-group title="账户与安全">
				<u-collapse @change="showBody">
					<u-collapse-item :showLoading="item.showLoading" :title="item.head" v-for="(item, index) in itemList" :key="index">
						{{ item.body }}
					</u-collapse-item>
				</u-collapse>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			itemList:[
				{
					head:'修改密码',
					body:'asd',
					showLoading:false
				},
				{
					head:'注销账号',
					body:'s',
					showLoading:false
				}
			]
		};
	},
	methods: {
		showBody(e){
			console.log(e)
		}
	}
};
</script>

<style></style>
