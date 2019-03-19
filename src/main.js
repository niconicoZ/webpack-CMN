//项目的入口文件
//1.导入 vue
import Vue from 'vue'

//3.导入 app 根组件
import app from './app.vue'

//4.按需 导入mint-ui 组件，并注册
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

//5.导入 MUI 框架样式
import './lib/mui/css/mui.min.css'
//5.1 把需要的样式 放在app.vue中既可以实现



//2.创建实例
var vm = new Vue({
   el: '#app',
   render: c => c(app)
})


