<template>
	<view class="go-top" @click="goTop">
		<uni-icons type="arrow-up" size="42"></uni-icons>
	</view>
</template>

<script>
	export default {
		name:"XzGoTop",
		methods: {
			goTop(){
				//返回页面顶部
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300    //滚动动画耗时300毫秒
				})
			}
		}
	}
</script>

<!-- Vue.js中，style默认没有声明scroped属性；uni-app中默认声明了 -->
<!-- 即uni-app中所有的样式都是“局部作用域” -->
<style lang="scss">
.go-top {
	//固定定位
	position: fixed;
	right: $uni-spacing-row-base;
	bottom: 110px;
	width: 46px;
	height: 46px;
	background-color: #fff;
	border: 1px solid $uni-border-color;
	border-radius: 50%;
	box-shadow: 0 0 10px $uni-border-color;
	display: flex;					//显示模式：弹性容器
	justify-content: center;		//子元素主轴方向上居中
	align-items: center;			//子元素交叉轴方向上居中
	opacity: .6;					//不透明度为60%
	&:active {						//点后后的不透明度为100%
		opacity: 1;
	}
}
</style>