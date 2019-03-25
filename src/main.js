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
//全局配置 请求数据接口，并且 全局域名后面必须要加 / ，才会以 根路拼接径启用。
Vue.http.options.root = 'http://localhost:5000/'
//对于post请求 配置哪种表单数据方式提交，我们也可以全局配置
Vue.http.options.emulateJSON = true;


//8.利用node.js中的moment插件，定义一个全局时间格式化过滤器
//8.1 npm i moment ,并导入
import moment from 'moment'
//8.2 定义全局过滤器Vue.filter('过滤器自定义名称'，回调函数function(代表需要格式化的值,pattern=''))
Vue.filter('dataFormat',function(dataStr,pattern='YYYY-MM-DD HH:mm:ss'){
   return moment(dataStr).format(pattern)
})


//4.按需 导入mint-ui 组件，并注册（头部，轮播图,按钮，懒加载）
// import { Header,Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);

//为了实现 懒加载的效果，实行导入全部组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)


// 安装 图片预览插件 1.0.3版本
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


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


