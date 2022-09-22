<template>
	<view>
		<!-- F1：面包屑 -->
		<view class="breadcrumb">
			<navigator open-type="switchTab" url="/pages/index/index">首页</navigator>
			<text class="separator">&gt;</text>
			<navigator open-type="switchTab" url="/pages/brands/brands">品牌馆</navigator>
			<text class="separator">&gt;</text>
			<navigator open-type="navigate" url="/pages/list/list">商品列表</navigator>
			<text class="separator">&gt;</text>
			<text>{{family.fname}}</text>
		</view>
		<!-- F2：轮播广告 -->
		<swiper style="height: 750rpx;" indicator-dots autoplay :interval="2000" :duration="1000">
			<swiper-item v-for="(p, i) in product.picList" :key="p.pid">
				<view class="swiper-item">
					<image style="width: 750rpx;" :src="$base+p.md" mode="widthFix"/>
				</view>
			</swiper-item>
		</swiper>
		
		<!-- F3：商品各项参数 -->
		
		<!-- F4：为您推荐  -->
		<!-- scroll-x：是否允许水平滚动 -->
		<!-- TODO: 此处的搜索建议列表应该从服务器端接口获取数据 -->
		<uni-card title="为您推荐" isFull>
			<scroll-view scroll-x class="f4">
				<view class="container">
					<view class="suggest">
						<image src="http://www.codeboy.com:9999/img/product_detail/product_detail_1.png" mode="widthFix"/>
						<text>ThinkPad S2超霸</text>
					</view>
					<view class="suggest">
						<image src="http://www.codeboy.com:9999/img/product_detail/product_detail_2.png" mode="widthFix"/>
						<text>戴尔燃7000 R1605S</text>
					</view>
					<view class="suggest">
						<image src="http://www.codeboy.com:9999/img/product_detail/product_detail_3.png" mode="widthFix"/>
						<text>戴尔魔方15MF</text>
					</view>
					<view class="suggest">
						<image src="http://www.codeboy.com:9999/img/product_detail/product_detail_4.png" mode="widthFix"/>
						<text>联想YOGA900</text>
					</view>
				</view>
			</scroll-view>
		</uni-card>
		
		<!-- F5：商品详情 -->
		<uni-card title="商品详情" isFull>
			<!-- innerText绑定 -->
			<!-- <text>{{product.details}}</text> -->
			
			<!-- innerHTML绑定 -->
			<!-- <rich-text nodes="<h1>标题字</h1><hr><hr>"></rich-text> -->
			<rich-text :nodes="product.details"></rich-text>
		</uni-card>
		
	</view>
</template>

<script>
	import {productDetails} from '@/service'
	export default {
		data() {
			return {
				family: {},			//当前商品所在型号/系列/家族
				product: {},		//当前商品详细信息
			}
		},
		async onLoad({pid}){
			//试着读取上一页面传递来的路由参数：pid
			if(!pid){  //请求参数中没有pid，则跳转回商品列表页
				uni.navigateTo({
					url:"/pages/list/list"
				})
				return
			}
			//根据pid查询对应的商品详情
			//console.log('待查询的商品编号：', pid);
			let {family, product} = await productDetails(pid)
			/*********预处理服务器端返回的数据***********/
			//①把 src="img 全部替换为 src="http://www.codeboy.com/img
			product.details = product.details.replace(/src="img/g, `src="${this.$base}img`)
			//②把 <img 全部替换为  <img style="width:100%"
			product.details = product.details.replace(/<img/g, '<img style="width:100%"')
			/******************************************/
			
			this.family = family
			this.product = product
			//根据型号的名称修改标题栏
			uni.setNavigationBarTitle({
				title: this.family.fname
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.breadcrumb {
	display: flex;
	padding: $uni-spacing-col-base  $uni-spacing-row-base;
	.separator {
		margin: 0  $uni-spacing-row-sm;
	}
}
.f4 {
	.container {
		display: flex;
		//width: 1200rpx;		//一个.sugguest的宽度 * 数量	
		// flex-direction: row;
		.suggest {
			width: 300rpx;		//一行可以放置2.5个.suggest
			flex-shrink: 0;		//弹性容器中的子元素收缩权重为0 —— 不收缩
			display: flex;
			flex-direction: column;
			align-items: center;
			image {
				width: 85%;
			}
		}
	}
	
}
</style>
