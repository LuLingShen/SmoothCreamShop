<template>
	<view class="page">
		<uni-card title="用户档案">
			用户的信息详情： {{userInfo}}
			<button @click="logout">退出登录</button>
		</uni-card>
	</view>
</template>

<script>
	import {userGetBasic,cartAdd,cartList,cartDelete,cartUpdateCount} from '@/service'
	
	export default {
		data() {
			return {
				userInfo: {},			//当前登录用户的个人信息
			}
		},
		methods: {
			logout(){
				//TODO: 异步请求服务器端“退出登录”API
				//假设已经退出成功，切换到“用户登录”组件
				this.$emit('showChild', {childName: 'login'})
			}
		},
		async mounted(){
			/**
			 * 
			 */
			let data1= await cartList()
			console.log(data1);
			let body=await cartUpdateCount(84,99)
			console.log(body);
			//修改页面导航条中的文本
			uni.setNavigationBarTitle({
				title:'用户档案'
			})
			/*********读取保存在客户端的token************/
			let token = uni.getStorageSync('ServerToken')
			//console.log('用户档案页面：保存在客户端的token：', token);
			/*******************************************/
			//异步请求服务器端接口，获取当前登录用户的个人信息
			let data = await userGetBasic(token)
			console.log(data)
			this.userInfo = data
		}
	}
</script>

<style lang="scss">
.page {
	position: absolute;  //绝对定位，就可以顶在页面最顶部
	top: 0;
	width: 100%;		//绝对定位后，宽度可能撑不满屏幕
}
</style>