<template>
	<view>
		<!-- F1：商品列表 -->
		<uni-list>
			<!-- 使用列表项提供的插槽，定制“左侧”和“主体”的内容 -->
			<uni-list-item v-for="(p, i) in plist" :key="i" clickable :to="`/pages/details/details?pid=${p.lid}`">
				<view class="header" slot="header">
					<image class="icon" :src="$base+p.pic" mode="widthFix"/>
				</view>
				<view class="body" slot="body">
					<text class="title">{{p.title}}</text>
					<text class="price">￥{{p.price}}</text>
					<view class="bottom">
						<uni-tag v-if="p.is_onsale==='1'" size="mini" text="促销" type="error"/>
						<text class="comment">{{p.sold_count}}条热销评论，好评率100%</text>
					</view>
				</view>
			</uni-list-item>
		</uni-list>
		
		<!-- F2：“加载更多”提示 -->
		<!-- <uni-load-more status="more"></uni-load-more> -->
		<!-- <uni-load-more status="loading"></uni-load-more> -->
		<!-- <uni-load-more status="noMore"></uni-load-more> -->
		<uni-load-more :status="isLoading ? 'loading' : (pno<pageCount ? 'more' : 'noMore')"></uni-load-more>
		 
		<!-- F3：“返回顶部”组件 -->
	</view>
</template>

<script>
	import {productList} from '@/service'
	export default {
		data() {
			return {
				plist: [],			//已经查询到的所有商品 
				pno: 0,				//当前已经加载到哪一页了
				pageCount: 99999,	//可能查询的数据总页数，此处的初始值不能是0
				isLoading: false,	//当前是否正在加载数据，当前若为true，则不能再发请求
				kw: '',				//要查询的商品的关键字
			}
		},
		/*
		onLoad({kw}){
			if(kw){
				this.kw = kw
			}
		}
		*/
		onLoad(data){
			//1.读取上一页面传递过来的路由参数：kw 和 bname
			//console.log('路由参数：',data);
			if(data.kw){
				this.kw = data.kw
			}
			if(data.bname){
				//根据品牌名称，修改导航条标题
				uni.setNavigationBarTitle({
					title: data.bname + '馆'
				})
			}
			//2.根据此路由参数，查询具有指定关键字的商品
			//“加载下一页数据”调用情形1
			this.loadNextPageData()
		},
		onReachBottom(){
			// console.log('页面滚动到底部了')
			//"加载下一页数据"调用情形2
			this.loadNextPageData()
		},
		async onPullDownRefresh(){
			//console.log('页面顶部下拉刷新了');
			//"加载下一页数据"调用情形3
			//先清除已经加载的所有数据
			this.plist = []		//删除已经加载的所有商品
			this.pno = 0		//指定“当前页号”为0-第一页之前
			await this.loadNextPageData()
			//等待异步数据全部加载完，隐藏顶部的“加载中”提示动画
			uni.stopPullDownRefresh()
		},
		methods: {
			//加载下一页数据 —— 此方法有三种调用情形
			async loadNextPageData(){
				//1.如果没有数据了(当前页号>=总页数)，或者当前正在加载中，则退出
				if(this.pno>=this.pageCount  ||  this.isLoading){
					return
				}
				//2.否则，真正开始加载下一页数据——注意：必须设定“当前正在加载数据”
				this.isLoading = true
				//3.加载数据，读取响应消息，把新数据拼接到已有数据尾部
				let {pno,pageCount,data} = await  productList(this.pno+1, this.kw)
				this.pno = pno
				this.pageCount = pageCount
				// this.plist = data   错误写法：狗熊在胳肢窝放棒子
				this.plist = [...this.plist, ...data]
				//4.设定“当前正在加载数据”为假
				this.isLoading = false
			}
		},
		
		
	}
</script>

<style lang="scss">
.icon {
	width: 160rpx;
	margin-top: -5rpx;
	margin-left: -10rpx;
	margin-bottom: -20rpx;
	margin-right: $uni-spacing-row-base;
}
.body {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.title {
		//文字最多显示两行，溢出的话用省略号代替	 —— 五行
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;    			//行数固定
		-webkit-box-orient: vertical;  		//盒子内行数据排列方式
	}
	.price {
		//修改文字颜色 + 文本加粗
		color: $xz-theme;
		font-weight: bold;
	}
	.bottom {
		display: flex;
		align-items: center;
		color: $uni-text-color-grey;
		font-size: 12px;
		// font-size: 20px;
		// width: 200%;
		// transform-origin:  left  center;
		// transform: scale(0.5);
	}
}
</style>
