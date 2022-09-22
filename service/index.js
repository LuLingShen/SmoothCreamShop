/****对服务器端接口及请求技术进行二次封装 @/service/index.js****/
//服务器域名的基础地址
// export const base = 'http://www.codeboy.com:9999/'
export const base = 'https://web.codeboy.com/xuezi/'
//export const base = 'http://211.103.248.18:9999/'

//所有POST请求的共用选项
let postOptions = {
	method: 'POST',
	header: {'Content-Type': 'application/x-www-form-urlencoded'}
}

/**
 * API-1.1、商品列表
 */
export let productList = async function(pno=1, kw=""){  //形参指定了默认值
	let url = base + `data/product/list.php?pno=${pno}&kw=${kw}`
	//横切关注点：显示“加载中”提示框
	uni.showLoading({title: '数据加载中...'})
	
	//等待异步请求完成，返回服务器端响应消息
	let result = await uni.request({ url })
	
	//横切关注点：隐藏“加载中”提示框
	uni.hideLoading()
	return result[1].data   //返回异步请求拿到的响应消息主体
}

/**
 * API-1.2、商品详情
 */
export let productDetails = async function(lid=1){
	let url = base + 'data/product/details.php?lid='+lid
	uni.showLoading({
		title: '详情加载中...'
	})
	let result = await uni.request({url})
	uni.hideLoading()
	return result[1].data
}

/**
 * API-1.5、首页数据
 */
export let productIndex = async function(){
	let url = base + 'data/product/index.php'
	uni.showLoading({
		title: '数据加载中...'
	})
	let result = await uni.request({url})
	uni.hideLoading()
	return result[1].data
}

/**
 * API-1.6、品牌列表
 */
export let productBrand = async function(){
	let url = base + 'data/product/brand.php'
	uni.showLoading({title: '品牌加载中...'})  	//请求前显示“加载中”
	let result = await uni.request({ url })		//请求服务器端数据，等待执行结果
	uni.hideLoading()							//隐藏“加载中”提示框
	return result[1].data
}

/**
 * API-1.7、产品分类	
 */
export let productCategory = async function(){
	let url = base + 'data/product/category.php'
	uni.showLoading({
		title: '类目加载中...'
	})
	let result = await uni.request({url})
	uni.hideLoading()
	return result[1].data
}

/**
 * API-2.1、用户注册
 */
export let userRegister = async function(uname, upwd, email, phone){
	let url = base + 'data/user/register.php'
	uni.showLoading({
		title: '信息提交中...'
	})
	let result = await uni.request({
		url,
		...postOptions,				//ES6新特性：对象的展开
		data: {						//data：请求消息主体数据，客户端发给服务器的
			uname,
			upwd,
			email,
			phone
		}
	})
	uni.hideLoading()
	return result[1].data			//data：响应消息主体数据，服务器发给客户端的
}


/**
 * API-2.2、用户登录
 */
export let userLogin = async function(uname, upwd){
	let url = base + 'data/user/login.php'
	uni.showLoading({
		title: '登录中...'
	})
	let result = await uni.request({
		url,
		...postOptions,
		data: { uname,  upwd  }
	})
	uni.hideLoading()
	return result[1].data
}
          

/**
 * API-2.3、当前登录用户基础信息	
 */
export let userGetBasic = async function(token){
	let url = base + 'data/user/get_basic.php'
	uni.showLoading({
		title: '用户信息加载中...'
	})
	let result = await uni.request({
		url,
		//客户端再发请求时，把保存在客户端的令牌以请求消息头形式返回给服务器
		header: {'authorization': token}
	})
	uni.hideLoading()
	return result[1].data
}
	

/**
 * API-2.10、检测邮箱是否存在	
 */
export let userCheckEmail = async function(email){
	let url = base + 'data/user/check_email.php?email='+email
	uni.showLoading({
		title: '邮箱检查中...'
	})
	let result = await uni.request({url})
	uni.hideLoading()
	return result[1].data
}

/**
 * API-2.11、检测手机是否存在	
 */
export let userCheckPhone = async function(phone){
	let url = base + 'data/user/check_phone.php?phone='+phone
	uni.showLoading({
		title: '手机号检查中...'
	})
	let result = await uni.request({url})
	uni.hideLoading()
	return result[1].data
}	  

/**
 * API-2.12、检测用户名是否存在
 */
export let userCheckUname = async function(uname){
	let url = base + 'data/user/check_uname.php?uname='+uname
	uni.showLoading({
		title: '用户名检查中...'
	})
	let result = await uni.request({url})
	uni.hideLoading()
	return result[1].data
}	

/**
 * API-2.13、退出登录
 */
export let userLogout = async function(){
	let url = base + 'data/user/logout.php'
	uni.showLoading({
		title: '退出中...'
	})
	let result = await uni.request({url})
	uni.hideLoading()
	return result[1].data
}

/**
 * API-3.1 添加购物车购买项
 */
export let cartAdd =async function(lid,buyCount){
	let url= `base+data/car/add.php?lid=${lid}&buyCount=${buyCount}`
	let token=uni.getStorageSync('ServerToken')  //读取登录时 存在的令牌
	let res=await uni.request({
		url,
		header:{authorization:token} //以请求头部的方式提交令牌给服务器
	})
	return res[1].data
}

/**
 * API3.2 购物车选项
 */
export let cartList=async function(){
	let url=base+'data/cart/list.php'
	let token=uni.getStorageSync('ServerToken')
	let res=await uni.request({
		url,
		header:{authorization:token} //以请求头部的方式提交令牌给服务器
	})
	return res[1].data
}
/**
 * API 3.3 删除购物车项
 */
export let cartDelete=async function(iid){
	let url=base+`data/cart/delete.php?iid=${iid}`
	let token=uni.getStorageSync('ServerToken')
	let res=await uni.request({
		url,
		header:{authorization:token} //以请求头部的方式提交令牌给服务器
	})
	return res[1].data
}
/**
 * API 3.4 修改购物车条目中的购买数量
 */
export let cartUpdateCount=async function(iid,count){
	let url=base+`data/cart/update_count.php?iid=${iid}&count=${count}`
	let token=uni.getStorageSync('ServerToken')
	let res=await uni.request({
		url,
		header:{authorization:token} //以请求头部的方式提交令牌给服务器
	})
	return res[1].data
}