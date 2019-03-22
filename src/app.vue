<template>
  <div class="app-container">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed title="尼裙摸鱼wdnmd"></mt-header>


    <!-- 内容的 路由视图 router-view 区域 -->
    <!--6.5 给路由做切换动画 -->
	  <transition>
		   <router-view></router-view>
	  </transition>



    <!-- 底部 Tabbar  -->
		<nav class="mui-bar mui-bar-tab">

			<router-link class="mui-tab-item" to='/home'>
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to='/menber'>
				<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">消息</span>
			</router-link>
			<router-link class="mui-tab-item" to="shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge">0</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to='search'>
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">设置</span>
			</router-link>
		</nav>
  </div>
	
</template>

<script>
</script>

<style lang="less" scoped>
.app-container {
	padding-top: 40px;
	padding-bottom: 50px;
	//6.5 路由动画切换的时候 会撑宽盒子，产生了滑动条，所以X轴hidden
	overflow-x: hidden;
}

//6.5 路由切换动画 样式
.v-enter {
	opacity: 0;
	transform: translateX(100%)
}
//要做成那种连续左切，不做来回切换的效果，我们设置 动画结束的位置在当前位置 左边100%
.v-leave-to {
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;
}
.v-enter-active,
.v-leave-active {
	transition: all 0.5s ease
} 
</style>
