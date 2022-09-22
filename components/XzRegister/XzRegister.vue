<template>
	<view class="page">
		<!-- F1：“用户名”输入框组 -->
		<view class="input-group">
			<input class="input" v-model="uname" placeholder="用户名"/>
			<uni-icons type="person-filled" color="#0aa1ed" size="26"/>
		</view>
		<!-- F2：“密码”输入框组 -->
		<view class="input-group">
			<input class="input" v-model="upwd" placeholder="密码"/>
			<uni-icons type="eye-filled" color="#0aa1ed" size="26"/>
		</view>
		<!-- F3：“重复密码”输入框组 -->
		<view class="input-group">
			<input class="input" v-model="repwd" placeholder="重复一次密码"/>
			<uni-icons type="eye-filled" color="#0aa1ed" size="26"/>
		</view>
		<!-- F4：“邮箱”输入框组 -->
		<view class="input-group">
			<input class="input" v-model="email" placeholder="邮箱"/>
			<uni-icons type="email-filled" color="#0aa1ed" size="26"/>
		</view>
		<!-- F5：“电话”输入框组 -->
		<view class="input-group">
			<input class="input" v-model="phone" placeholder="电话"/>
			<uni-icons type="phone-filled" color="#0aa1ed" size="26"/>
		</view>
		<!-- F6：提交按钮 -->
		<button class="btn">注册</button>
		<!-- F7：“已有账号?” -->
		<text @click="showLogin">已有账号？现在去登录</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uname: "",		//用户名
				upwd: "",		//登录密码
				repwd: "",		//重复密码
				email: "",		//邮箱
				phone: "",		//电话
			}
		},
		methods: {
			showLogin(){
				//发射一个自定义事件，通知父组件“显示登录”
				this.$emit('showChild', {childName: 'login'})
			}
		},
		mounted(){	//组件挂载完成，此处不能使用onLoad()
			//修改标题栏标题文本
			uni.setNavigationBarTitle({
				title: '注册新用户'
			})
		}
	}
</script>

<style lang="scss">
.page {
	position: absolute;
	top: 0;
	width: 100%;
	padding:  $uni-spacing-col-lg * 4   $uni-spacing-row-lg * 2;
	.input-group {
		display: flex;
		align-items: center;
		padding: $uni-spacing-col-base   $uni-spacing-row-base;
		border-bottom: 1px solid $uni-border-color;
		margin-bottom: $uni-spacing-col-lg;
		.input {
			flex: 1;
		}
	}
	.btn {
		background-color: $xz-theme;
		height: 40px;
		border-radius: 20px;
		font-size: $uni-font-size-lg;
		line-height: 40px;
		color: #fff;
		margin-top: $uni-spacing-col-lg * 3;
		margin-bottom: $uni-spacing-col-lg;
	}
}
</style>