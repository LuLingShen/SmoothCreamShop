<template>
	<view>
		<!-- F1：顶部标题栏 -->
		<!-- view.f1>uni-icons+uni-search-bar -->
		<view class="f1">
			<!-- 左侧：后退按钮图标 -->
			<uni-icons type="back" color="#fff" size="26" @click="goBack"/>
			<!-- 右侧：搜索框 -->
			<uni-search-bar class="search-bar" @clear="plist=[]" placeholder="请输入商品关键字" cancelButton="none" @confirm="beginSearch" v-model="kw" @input="doInput"/>
		</view>
		
		<!-- F2：中间的搜索结果-->
		<!-- view.f2>uni-list>uni-list-item*N -->
		<view class="f2">
			<!-- thumb：缩略图 -->
			<!-- ellipsis：省略号，指定显示几行内容（超出了就显示省略号）-->
			<!-- link：列表项是否显示为“链接”：有点击反馈+右侧箭头 -->
			<uni-list>
				<uni-list-item v-for="(p, i) in plist" :key="p.lid" :title="p.title" :thumb="$base+p.pic" thumbSize="lg" :ellipsis="1"   link  :to="`/pages/details/details?pid=${p.lid}`"></uni-list-item>
			</uni-list>
		</view>
		
		<!-- F3：下方的搜索建议 -->
		<!-- view.f3>uni-card>uni-tag*N -->
		<view class="f3">
			<!-- isFull：是否显示为“通栏卡片” -->
			<uni-card title="热门搜索" isFull>
				<!-- TODO：此处应该调用服务器端“搜索建议”API -->
				<uni-tag @click="kwSearch('神舟')" class="tag" text="神舟"></uni-tag>
				<uni-tag @click="kwSearch('T1000')" class="tag" text="T1000" type="error"></uni-tag>
				<uni-tag class="tag" text="雷神" type="primary"></uni-tag>
				<uni-tag class="tag" text="Z5100" type="success"></uni-tag>
				<uni-tag class="tag" text="性能" type="warning"></uni-tag>
				<uni-tag class="tag" text="联想" type="error" inverted></uni-tag>
				<uni-tag class="tag" text="戴尔" type="primary" inverted></uni-tag>
				<uni-tag class="tag" text="游戏本" type="success" inverted></uni-tag>
				<uni-tag class="tag" text="影音本" type="warning" inverted></uni-tag>
				<uni-tag class="tag" text="MacBook" type="error" circle></uni-tag>
				<uni-tag class="tag" text="华硕" type="primary" circle></uni-tag>
				<uni-tag class="tag" text="Thinkpad" type="success" circle></uni-tag>
				<uni-tag class="tag" text="T4100" type="warning" circle></uni-tag>
			</uni-card>
		</view>
		
	</view>
</template>

<script>
	import {productList} from '@/service'
	
	export default {
		data() {
			return {
				kw: "",			//用户在输入框中输入的搜索关键字(keyword)
				plist: [],		//商品列表
				timer: null,	//防抖定时器——必需间隔足够长的时间才能真正服务器端请求
			}
		},
		methods: {
			kwSearch(kw){
				//把推荐的搜索关键字放入输入框
				this.kw = kw
			},
			doInput(){
				//处理用户的每一次键盘输入，得到查询关键字，异步请求服务器API，获取包含该关键字的商品信息
				/***输入事件的“防抖”处理***/
				if(this.timer){
					clearTimeout(this.timer)	//清除掉未到时间定时器
				}
				this.timer = setTimeout(async ()=>{   //重新开启新的定时器
					let kw = this.kw.trim()
					if(!kw){
						return
					}
					let {data} = await productList(1, kw)
					this.plist = data
				}, 2000)
			},
			goBack(){
				uni.navigateBack()
			},
			async beginSearch(){
				let kw = this.kw.trim()
				if(!kw){
					//用户输入为空，显示一个“吐司”对话框
					uni.showToast({
						icon: "error",
						title: '关键字不能为空',
						duration: 3000,   //显示持续时长
					})
					return
				}
				//发起异步请求，获取服务器端商品列表（只需要第1页数据）
				let {data} = await productList(1, kw)  //对响应消息主体进行解构，只要其中的“商品列表”
				// console.log(data);
				this.plist = data
			}
		}
	}
</script>

<style lang="scss">
.f1 {
	height: 45px;
	background-color: $xz-theme;
	display: flex;
	align-items: center;
	padding:  0   $uni-spacing-col-lg;
	.search-bar {
		flex: 1;
	}
}
.f3 {
	.tag {
		display: inline-block;  /*tag默认是行内元素，不能指定上下方向的外间距*/
		margin-right: $uni-spacing-row-sm;
		margin-bottom: $uni-spacing-col-base;
	}
}
</style>
