<template>
	<view class="page">
		<!-- 左侧：滚动视图容器 -->
		<!-- scroll-view>uni-list>uni-list-item*N -->
		<scroll-view scroll-y class="left-view" :style="{height: winHeight+'px'}">
			<uni-list>
				<!-- 经过检测：列表项不支持普通的行内样式(例如color)，但是background-color是可以的 -->
				<!-- 扩展组件：有可能触发click事件，也可能不触发——查手册 -->
				<!-- uniListItem组件“在开启了用户反馈”情况下可以触发click事件，例如link属性、clickable属性 -->
				<uni-list-item v-for="(c, i) in clist" :key="i" :title="c.cname" :style="{backgroundColor: i===curCategory ? '#fff' : '#dfdfdf'}" @click="curCategory=i"  clickable/>
			</uni-list>
		</scroll-view>
		
		<!-- 右侧：滚动视图容器 -->
		<!-- scroll-view>uni-list>uni-list-item*N -->
		<scroll-view scroll-y class="right-view" :style="{height: winHeight+'px'}">
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
			<view><text>右侧</text></view>
		</scroll-view>
	</view>
</template>

<script>
	import {productCategory} from '@/service'
	export default {
		watch:{
			curCategory(){   //监视某个状态变量的更改
				console.log('curCategory发生改变，该请求对应类别下的商品了', this.curCategory);
			}
		},
		data() {
			return {
				winHeight:  0,		//窗口高度 = 屏幕高度 - 标题栏 - 页签栏
				clist: [],			//商品类别的列表
				curCategory: -1,	//当前显示的是哪个类别下的商品（是clist中的某个下标）,修改此变量情形1：加载到类别数据；情形2：用户点击某个列表项
				//注意此处curCategory的初始值，不是0，而是-1
			}
		},
		async onLoad(){
			//页面加载完成时，获取屏幕的高度
			let {windowHeight} = uni.getWindowInfo()   //窗口高度
			this.winHeight = windowHeight
			//页面加载完成时，获取服务器端所有的商品分类(productCategory)
			let data = await productCategory()
			// this.clist = data
			this.clist = [...data, ...data]   //因为服务器端返回数据较少，此处模拟实现有很多数据的情形
			//设置分类类别中第0项为当前项
			this.curCategory = 0
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.page {
	display: flex;
	.left-view {
		width: 95px;
	}
	.right-view {
		flex: 1;
	}
}
</style>
