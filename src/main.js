//项目的入口文件
//1.导入 vue
import Vue from 'vue'


//3.导入 app 根组件
import app from './app.vue'


//6.导入路由包,并安装
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//6.1 导入自己的 router.js 路由模块
import router from './router.js'

//7. 导入 vue-resource包，并安装---发送ajax请求的
import VueResource from 'vue-resource'
Vue.use(VueResource)


//4.按需 导入mint-ui 组件，并注册（头部，轮播图）
import { Header,Swipe, SwipeItem } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);


//5.导入 MUI 框架样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
//5.1 把需要的样式 放在app.vue中既可以实现


//2.创建实例
var vm = new Vue({
   el: '#app',
   render: c => c(app),
   router //6.2 在VM实例中 挂载路由
})


