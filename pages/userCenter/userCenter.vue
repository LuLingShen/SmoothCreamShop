<template>
	<view>
		<!-- <uni-transition mode-class="slide-right" :show="false">
			<XzLogin @showChild="switchChild"/>
		</uni-transition> -->
		
		<!-- 可能性1：显示“用户登录”组件 -->
		<uni-transition mode-class="slide-left" :show="curChild==='login'">
			<XzLogin @showChild="switchChild"/>
		</uni-transition>
		
		<!-- 可能性2：显示“用户注册”组件 -->
		<uni-transition mode-class="slide-right" :show="curChild==='register'">
			<XzRegister @showChild="switchChild"/>
		</uni-transition>
		
		<!-- 可能性3：显示“用户档案”组件 -->
		<uni-transition mode-class="fade" :show="curChild==='profile'">
			<XzUserProfile @showChild="switchChild"/>  
		</uni-transition>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curChild: "login",			//当前子组件是“登录组件”
				// curChild: "register",		//当前子组件是“登录组件”
				// curChild: "profile",			//当前子组件是“登录组件”
			}
		},
		methods: {
			switchChild( data ){
				// console.log('父组件接收到子组件的数据：', data);
				//修改“当前要显示的子组件名称”
				this.curChild = data.childName
			}
		}
	}
</script>

<style>

</style>
