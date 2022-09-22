<template>
	<view class="floor">
		<!-- 楼层标题 -->
		<view class="title">
			<image class="icon" src="../../static/img/computer_icon.png" mode="widthFix"/>
			<text class="txt">{{title}}</text>
			<navigator class="link" :url="href">更多</navigator>
		</view>
		<!-- 楼层中的商品 -->
		<view class="products">
			<!-- “三行两列”实际是“一行六列” -->
			<view v-for="(p, i) in products" :key="p.pid" class="product">
				<uni-card margin="6px" spacing="0" padding="6px">
					<!-- 上方：图片：规定高度，让宽度等比例自动缩放 -->
					<image class="pic" :src="$base+p.pic" mode="heightFix"/>
					<!-- 中间：商品名称 -->
					<text class="ptitle">{{p.title}}</text>
					<!-- 下方：价格和按钮 -->
					<view class="price-btn">
						<text class="price">￥{{p.price}}</text>
						<button @click="goDetails(p.pid)" class="btn" size="mini" type="primary">查看详情</button>
					</view>
				</uni-card>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		//声明自定义属性
		props: {
			title: {
				type: String,
				default: '楼层标题'
			},
			href: {
				type: String,
				default: '/pages/index/index'
			},
			products: {
				type: Array,
				// default: []  //自定义属性是Array或Object类型，默认值必须使用“工厂函数”返回
				// default: function(){return []}
				default: ()=>[]   //设计模式
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			goDetails(pid){
				//保留跳转到商品详情页
				uni.navigateTo({
					url: '/pages/details/details?pid='+pid
				})
			}
		}
	}
</script>

<style lang="scss">
.floor {
	margin-top: $uni-spacing-col-lg;
	border-top: 1px solid $uni-border-color;
	box-shadow: 0 0 10px $uni-border-color;
	.title {
		display: flex;
		align-items: center;
		padding: $uni-spacing-col-base  $uni-spacing-row-base;
		border-bottom: 1px solid $uni-border-color;
		.icon {
			width: 50rpx;
		}
		.txt {
			flex: 1;
			margin: 0  $uni-spacing-row-lg;
		}
		.link {
			color: $uni-text-color-grey;
			font-size: $uni-font-size-sm;
		}
	}
	.products {
		display: flex;
		flex-wrap: wrap;	//弹性容器允许子元素换行
		.product {
			width: 50%;
			.pic {
				height: 200rpx;
				display: block;		//为了采用margin控制水平居中，必须显示为块级元素
				margin: 0 auto;
			}
			.ptitle {
				display: block;	  //控制text的宽度不超过父元素
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.price-btn {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.price {
					color: $uni-color-primary;
				}
				.btn {
					background-color: $uni-color-primary;
					padding: 0  $uni-spacing-row-sm;
					margin: 0;
				}
			}
		}
	}
}
</style>