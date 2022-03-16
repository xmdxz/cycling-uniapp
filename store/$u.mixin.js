import {
	mapState
} from 'vuex'
import store from "@/store"

// 尝试将用户在根目录中的store/index.js的vuex的state变量，全部加载到全局变量中
let $uStoreKey = [];
try {
	$uStoreKey = store.state ? Object.keys(store.state) : [];
} catch (e) {

}

module.exports = {
	beforeCreate() {
		// 将vuex方法挂在到$u中
		// 使用方法为：如果要修改vuex的state中的user.name变量为"史诗" => this.$u.vuex('user.name', '史诗')
		// 如果要修改vuex的state的version变量为1.0.1 => this.$u.vuex('version', '1.0.1')
		this.$u.vuex = (name, value) => {
			this.$store.commit('$uStore', {
				name,
				value
			})
		}

		this.$u.getChatList = () => {
			return this.$store.getters.chatList
		}

		this.$u.insertChatList = (data) => {
			let list = this.$store.getters.chatList
			if (list.findIndex((e) => e.id == data.id) >= 0) {
				return;
			}
			let name = 'chat_list'
			list.unshift(data);
			this.$store.commit('$uStore', {
				name,
				value: list
			})
		}

		this.$u.getToken = () => {
			return this.$store.getters.token
		}

		this.$u.getId = (name) => {
			let userString = decodeURIComponent(escape(window.atob(this.$store.getters.token.split('.')[1])));
			let id = JSON.parse(userString).id;
			return id;
		}

		this.$u.generateUUID = () => {
			var d = new Date().getTime();
			if (window.performance && typeof window.performance.now === "function") {
				d += performance.now(); //use high-precision timer if available
			}
			var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = (d + Math.random() * 16) % 16 | 0;
				d = Math.floor(d / 16);
				return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
			});
			return uuid;
		}
		this.$u.nowDateTime = () => {
			let date = new Date()
			return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date
				.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
		}
	},
	computed: {
		// 将vuex的state中的所有变量，解构到全局混入的mixin中
		...mapState($uStoreKey)
	}
}
