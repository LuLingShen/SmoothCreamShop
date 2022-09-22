<template>
	<view>
		<!-- uni-grid>uni-grid-item*N>view>(uni-badge>image)+text -->
		<!-- column：一行中的列数 -->
		<!-- showBorder：是否显示单元格的边框 -->
		<!-- square：每个单元格是否显示为正方形 -->
		<uni-grid :column="3" :showBorder="true" :square="false">
			<uni-grid-item v-for="(b, i) in blist" :key="b.bid">
				<view class="brand" @click="goList(b.keywords, b.bname)">
					<!-- badge：徽章、角标 -->
					<!-- max-num：数字上封顶，如果超过此数字，即显示XXX+ -->
					<uni-badge :text="b.popularity" type="error" absolute="rightTop" :offset="[7, 0]" :max-num="9999">
						<image :src="$base+b.logo" mode="heightFix"/>
					</uni-badge>
					<text>{{b.bname}}</text>
				</view>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script>
	import {productBrand}  from  '@/service'
	export default {
		data() {
			return {
				blist: [],			//品牌列表
			}
		},
		async onLoad() {
			let data = await productBrand()
			this.blist = data
		},
		methods: {
			goList(kw, nm){
				//跳转到商品列表页，传递路由参数：kw-商品搜索关键字			
				uni.navigateTo({
					url:`/pages/list/list?kw=${kw}&bname=${nm}`
				})
			}
		}
	}
</script>

<style lang="scss">
.brand {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: $uni-spacing-col-lg + 6px  0;	
	&:hover {
		opacity: .7;
	}
	image {
		height: 70rpx;
		margin-bottom: $uni-spacing-col-base;
	}
}
</style>
