<template>
	<view class="f6">
		<!-- F6-1：底部菜单条 -->
		<view class="f61">
			<navigator open-type="switchTab" url="/pages/userCenter/userCenter?section=login">登录</navigator>
			<text>|</text>
			<navigator open-type="switchTab" url="/pages/userCenter/userCenter?section=register">注册</navigator>
			<text>|</text>
			<navigator open-type="redirect" url="/pages/list/list">客户服务</navigator>
			<text>|</text>
			<text @click="goTop">返回顶部</text>
		</view>
		<!-- F6-2：四宫格-->
		<!-- view.f62>view.item*4>image.icon+text -->
		<view class="f62">
			<view class="item">
				<!-- mode：图片的缩放模式 widthFix：指定宽度，高度自动修正 -->
				<image class="icon" mode="widthFix" src="../../static/img/icon1.png"/>
				<text>品质保证</text>
			</view>
			<view class="item">
				<image class="icon" mode="widthFix" src="../../static/img/icon2.png"/>
				<text>私人订制</text>
			</view>
			<view class="item">
				<image class="icon" mode="widthFix" src="../../static/img/icon3.png"/>
				<text>学员特供</text>
			</view>
			<view class="item">
				<image class="icon" mode="widthFix" src="../../static/img/icon4.png"/>
				<text>专属特权</text>
			</view>
		</view>
		<!-- F6-3：版权声明-->
		<view class="f63">
			<text>版权所有 © &copy; 达内科技 2002-2022</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"XzFooter",
		data() {
			return {
				
			}
		},
		methods: {
			goTop(){
				uni.pageScrollTo({
					scrollTop: 0      //距离顶部滚动多远
				})
			}			
		}
	}
</script>

<style lang="scss">
.f6 {
	border-top: 1px solid $uni-border-color;
	border-bottom: 1px solid $uni-border-color;
	box-shadow: 0 0 10px $uni-border-color;
	margin-top: $uni-spacing-col-lg;
	.f61 {
		//显示模式：弹性容器
		display: flex;
		//修改主轴方向：横向
		flex-direction: row;
		//弹性容器中的子元素在主方向对齐方式：空白均匀分布
		justify-content: space-evenly;
		padding: $uni-spacing-col-lg  0;
	}
	.f62 {
		//显示模式：弹性容器
		display: flex;
		//弹性容器的主轴方向：横向
		flex-direction: row;
		border-top: 1px solid $uni-border-color;
		border-bottom: 1px solid $uni-border-color;
		padding: $uni-spacing-col-lg   0;
		.item {
			//弹性容器中的子元素宽度增长权重： 1
			flex: 1;
			//弹性子元素本身又是一个弹性容器
			display: flex;
			//弹性容器主轴方向：纵向
			flex-direction: column;
			//弹性容器中弹性子元素在交叉轴上的对齐方式：居中
			align-items: center;
			.icon {
				width: 50%;
			}
		}
	}
	.f63 {
		padding: $uni-spacing-col-lg;
		text-align: center;
	}
}
</style>