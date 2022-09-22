<template>
	<view>
		<!-- F1：顶部搜索条 -->
		<view class="f1">
			<!-- 左侧：汉堡包按钮 -->
			<uni-icons @click="$refs.leftDrawer.open()" type="bars" color="#fff" size="32"/>
			<!-- 中央：搜索条 -->
			<view class="search-bar">
				<input disabled @click="goSearch" type="text" placeholder="商品搜索" />
				<image src="../../static/img/logo-s.png" mode="widthFix"/>
				<view class="search">
					<uni-icons class="ic" type="search" size="28" color="#808080"/>
				</view>
			</view>
			<!-- 右侧：登录按钮 -->
			<text @click="goLogin">登录</text>
		</view>
		
		<!-- F2：轮播广告 -->
		<!-- indicator-dots：是否显示“圆饼”指示器 -->
		<!-- autoplay：是否自动播放 -->
		<!-- interval：两个广告间隔时长 -->
		<!-- duration：每个广告进入到停止动画耗时 -->
		<!-- indicator-active-color：圆饼指示器选中时的颜色 -->
		<swiper style="height: 300rpx;" :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000" indicator-active-color="#0aa1ed">
			<swiper-item v-for="(c, i) in carouselItems" :key="c.cid">
				<view class="swiper-item">
					<image style="width: 750rpx;" :src="$base + c.img" mode="widthFix"/>
				</view>
			</swiper-item>
		</swiper>
		
		<!-- F3：首页推荐 -->
		<XzProductFloor title="首页推荐 / 1F" href="/pages/list/list?section=1" :products="recommendedItems"/>
		
		<!-- F4：最新上架 -->
		<XzProductFloor title="最新上架 / 2F" href="/pages/list/list?section=2" :products="newArrivalItems"/>
		
		<!-- F5：热销单品 -->
		<XzProductFloor title="热销单品 / 3F" href="/pages/list/list?section=3" :products="topSaleItems"/>
		
		<!-- F6：底部功能菜单 -->
		<XzFooter></XzFooter>
		<!-- F7：返回顶部 -->
		<XzGoTop></XzGoTop>
		<!-- F8：左侧打开/收起的抽屉 -->
		<uni-drawer ref="leftDrawer">
			<view style="padding:30rpx;">
				<!-- 使用列表组件：实现一个导航菜单 -->
				<uni-list>
					<uni-list-item title="首页" to="/pages/index/index" link="switchTab"></uni-list-item>
					<uni-list-item title="品牌馆" to="/pages/brands/brands" link="switchTab"></uni-list-item>
					<uni-list-item title="商品分类" to="/pages/category/category" link="switchTab"></uni-list-item>
					<uni-list-item title="登录" to="/pages/userCenter/userCenter?section=login" link="switchTab"></uni-list-item>
					<uni-list-item title="注册" to="/pages/userCenter/userCenter?section=register" link="switchTab"></uni-list-item>
				</uni-list>
				
				<button type="primary" @click="$refs.leftDrawer.close()">关闭</button>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	//导入接口二次封装模块中的方法
	import {productIndex} from '@/service'
	
	export default {
		data(){
			return {
				carouselItems: [],		//轮播广告条目
				newArrivalItems: [],	//新品上市条目
				recommendedItems: [],	//首页推荐条目
				topSaleItems:[],		//热销单品条目
				//base: base,				//把导入的变量上升为“模型变量”,这样就可以在视图中进行数据绑定了 —— 此方法不是最优方法
			}
		},
		async onLoad(){
			//页面挂载完成后，异步请求首页数据
			let data = await productIndex()
			// console.log(data);
			this.carouselItems = data.carouselItems
			this.newArrivalItems = data.newArrivalItems
			this.recommendedItems = data.recommendedItems
			this.topSaleItems = data.topSaleItems
		},
		
		methods: {
			goSearch(){
				//保留跳转到搜索页
				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			goLogin(){
				//切换页签：跳转到用户中心中的登录部分
				uni.switchTab({
					url: "/pages/userCenter/userCenter?section=login"
				})
			}
		}
	}
</script>

<style lang="scss">
//给整个页面添加一个“渐变背景色”
page {
	//背景图片：渐变色(从上往下)
	background-image: linear-gradient(180deg, $uni-color-primary 120rpx, $uni-bg-color  500rpx);
	background-repeat: no-repeat;
}
.f1 {
	display: flex;
	align-items: center;//弹性容器内的子元素交叉轴上居中对齐
	padding: $uni-spacing-col-lg $uni-spacing-row-lg;
	.search-bar {
		flex: 1;
		margin: 0  $uni-spacing-row-base;
		position: relative;   //父容器相对定位，为绝对定位子元素提供定位依据
		//自定义组件中不要使用标签选择器；但页面中可以使用
		input {
			background-color: $uni-text-color-inverse;
			height: 70rpx;
			border-radius: 35rpx;
			text-align: center;
		}
		image {
			width: 46rpx;
			position: absolute;
			left: 20rpx;
			//top: 50% - 23rpx;   //SCSS中的运算必须是相同单位
			top: calc(50% - 23rpx);	//CSS提供的calc()支持不同单位间的计算
		}
		.search {
			position: absolute;
			right: 20rpx;
			top: calc(50% - 14px);
		}
	}
	text {
		color: $uni-text-color-inverse;
	}
}
</style>