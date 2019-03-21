//引入 router包
import VueRouter from 'vue-router' 

//6.3引入路由的组件模块
import homeContainer from './components/tabbar/homeContainer.vue'
import searchContainer from './components/tabbar/searchContainer.vue'
import shopcarContainer from './components/tabbar/shopcarContainer.vue'
import menberContainer from './components/tabbar/menberContainer.vue'


//3.4 创建路由
var router = new VueRouter({
   
    //路由规则
    routes: [
      //6.4 进行路由匹配 
      {path : '/', redirect: '/home'},
      {path : '/home', component: homeContainer},
      {path : '/search', component: searchContainer},
      {path : '/shopcar', component: shopcarContainer},
      {path : '/menber', component: menberContainer}
    ],

    //6.2 把mui框架自带的高亮 覆盖 路由默认的高亮类
    linkActiveClass: 'mui-active'
 })


 //把路由对象暴露出来，使用ES6语法，因为路由对象 要绑定到 vm实例上
 export default router

