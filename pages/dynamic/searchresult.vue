<template>
	<view>
		<attentionitem v-for="(item,index) in attentionList" :avatar="item.avatar" :contentuser="item.username" :contentlevel="item.level"
		:contenttext="item.content"
		:key="index"
		contenttime="发布时间:2021年7月28号13时40分" :imgs="item.imgs" :id="item.id"></attentionitem>
	</view>
</template>

<script>
	import attentionitem from "../../components/attentionitem.vue"
	export default {
		components:{
			attentionitem
		},
		data() {
			return {
				searchContent: '',
				attentionList:[]
			}
		},
		onLoad(e) {
			this.searchContent = e.content
			this.getDynamicBySearch()
		},
		methods: {
			async getDynamicBySearch(){
				let res = await this.$u.api.getDynamicByContent({
					content: this.searchContent
				})
				this.attentionList = res
			}
		}
	}
</script>

<style>

</style>
