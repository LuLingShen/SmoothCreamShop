<template>
	<view class="page">
		<!-- F1：“用户名”输入框组 -->
		<view class="input-group">
			<input :focus="focusedInput==='uname'" class="input" v-model="uname" placeholder="用户名/邮箱/手机号"/>
			<uni-icons type="person-filled" color="#0aa1ed" size="26"/>
		</view>
		<!-- F2：“密码”输入框组 -->
		<view class="input-group">
			<input :focus="focusedInput==='upwd'" class="input" :password="!showPwd" v-model="upwd" placeholder="登录密码"/>
			<uni-icons :type="showPwd ? 'eye-filled' : 'eye-slash-filled'" size="26" color="#0aa1ed" @click="showPwd=!showPwd"/>
			<text style="margin: 0 15rpx;">|</text>
			<navigator url="/pages/index/index">忘记密码</navigator>
		</view>
		<!-- F3：提交按钮 -->
		<button class="btn" @click="doLogin">登录</button>
		<!-- F4：“还没账号?” -->
		<text @click="showRegister">还没账号？现在去注册</text>
		<!-- F5：其它登录方式 -->
	</view>
</template>

<script>
	import {userLogin} from '@/service'
	export default {
		data() {
			return {
				uname: "yaya",		//用户名
				upwd: "123456",		//登录密码
				showPwd: false,	//是否显示密码（即密码是否可见）
				// focusedInput: 'uname',	//当前“用户名”获得输入焦点
				// focusedInput: 'upwd',	//当前“密码”获得输入焦点
				focusedInput: 'none',		//当前没有输入框获得输入焦点
			}
		},
		methods: {				
			async doLogin(){
				//1验证用户名和密码输入是否为空      document.getElement().focus()
				let uname = this.uname.trim()
				if(!uname){
					uni.showToast({
						title: '用户名不能为空',
						icon: 'none'
					})
					this.focusedInput = 'uname'  //让“用户名”输入框获得焦点
					return
				}
				
				let upwd = this.upwd.trim()
				if(!upwd){
					uni.showToast({
						title: '密码不能为空',
						icon: 'none'
					})
					this.focusedInput = 'upwd'  //让“密码”输入框获得焦点
					return 
				}
				
				//2向服务器端接口提交异步请求，验证用户名和密码是否正确	
				let data = await userLogin(uname, upwd)
				//console.log(data)
				
				if(data.code!==200){//如果验证失败，则弹出模态对话框
					uni.showModal({
						title: '错误',
						content: '服务器返回错误消息：'+data.msg,
						showCancel: false,	//是否显示“取消”按钮
					})
				}else {//如果录验证成功，显示“用户档案”组件
					uni.showToast({title:'登录成功'})
					/*************把服务器返回的token保存下来**************/
					uni.setStorageSync('ServerToken', data.token)
					/****************************************************/
					this.$emit('showChild', {childName: 'profile'})					
				}
			},
			showRegister(){
				//向父组件（用户中心）发射事件，指定显示“注册”
				this.$emit('showChild', {childName:'register'})
			}
		},
		mounted(){	//组件挂载完成，此处不能使用onLoad()
			//修改标题栏标题文本
			uni.setNavigationBarTitle({
				title: '用户登录'
			})
		}
	}
</script>

<style lang="scss">
.page {
	position: absolute;  //绝对定位，就可以顶在页面最顶部
	top: 0;
	width: 100%;		//绝对定位后，宽度可能撑不满屏幕
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