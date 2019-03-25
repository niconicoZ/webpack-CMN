//引入 router包
import VueRouter from 'vue-router' 

//6.3引入四大首页 路由的组件模块
import homeContainer from './components/tabbar/homeContainer.vue'
import searchContainer from './components/tabbar/searchContainer.vue'
import shopcarContainer from './components/tabbar/shopcarContainer.vue'
import menberContainer from './components/tabbar/menberContainer.vue'

//引入 首页大弟子页面组件模块
import NewList from './components/news/NewList.vue'
import Goodslist from './components/goodslist/goodslist.vue'
//引入 新闻详情，色图专区,娃娃详情
import SonList from './components/news/SonList.vue'
import photoList from './components/photos/photoList.vue'
import photoinfo from './components/photos/photoinfo.vue'
import goodsinfo from './components/goodslist/goodsinfo.vue'
import goodscomment from './components/goodslist/goodscomment.vue'
import goodsdesc from './components/goodslist/goodsdesc.vue'



//3.4 创建路由
var router = new VueRouter({
   
    //路由规则
    routes: [
      //6.4 进行四大首页路由匹配 
      {path : '/', redirect: '/home'},
      {path : '/home', component: homeContainer},
      {path : '/search', component: searchContainer},
      {path : '/shopcar', component: shopcarContainer},
      {path : '/menber', component: menberContainer},
      //首页大弟子
      {path : '/home/news', component: NewList},
      {path : '/home/goodslist',component: Goodslist },
      //新闻详情
      {path : '/home/news/:id', component : SonList},
      //色图专区
      {path : '/home/photo', component : photoList},
      {path : '/home/photo/:id' ,component : photoinfo},
      //娃娃详情
      {path : '/home/goodsinfo/:id' , component : goodsinfo},
      
      {path : '/home/goodsdesc/:id' , component : goodsdesc, name:'goodsdesc'},
      {path : '/home/goodscomment/:id' , component : goodscomment, name: 'goodscomment'}

    ],

    //6.2 把mui框架自带的高亮 覆盖 路由默认的高亮类
    linkActiveClass: 'mui-active'
 })


 //把路由对象暴露出来，使用ES6语法，因为路由对象 要绑定到 vm实例上
 export default router

