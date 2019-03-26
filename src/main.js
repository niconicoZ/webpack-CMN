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


//导入 vuex 包，注册，并创建实例
import Vuex from 'vuex'
Vue.use(Vuex)

//5.先从本地存储的car数据取出来，放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
   state: {  //获取state数据 this.$store.state.***

      /* 我们可以将 购物车中的商品数据，用一个数组存储起来，在car数组中，存储一些商品的对象
         selected = 代表在购物车是否被选中
       { id:商品的id, count:要购买的数量 , price: 商品的单价, selected :false }
      */
      car: car

   },
   mutations: { //调用mutations方法 this.$store.commint('方法的名称'，'按需导入唯一参数')

      /*点击加入购物车，把商品信息加入保存到 store的car中，但是不能直接操作store，需要使用一个方法，来进行调用添加。
        分析：
           1. 如果store中的car数组 之前就有这个对应的商品，
              那么只要查找car的数据，根据ID号和添加商品的ID号是否一直，添加数量就可
           2. 如果没有，则则直接把 商品数据 push到car数组中。
      */
      addToCar(state, goodsinfo) {
         //2.如果查找到了数据，就只要添加数量，如果没有找到就PUSH，那么我么就设置一个标识符，判断到底是 添加数量，还是PUSH
         //假设 在car中 ，没有找到商品
         var flag = false;

         //1.some是查找数据，不是完全遍历，只要找到了相应数据，就返回 true
         state.car.some(item => {
            if (item.id == goodsinfo.id) {
               //parseInt()要把数值变成一个整数，用于相加
               item.count += parseInt(goodsinfo.count)
               //2.1如果找到了 就设置flag为true
               flag = true
               return true
            }
         })

         //3.如果最终查找完毕没有找到数据，flag还是false,就push到购物车
         if (flag === false) {
            state.car.push(goodsinfo)
         }

         //4.当更新 car 之后，把car 数组，存储到 本地的 localStorage 中
         localStorage.setItem('car',JSON.stringify(state.car))
      },

      //根据购物车页面的数字选择框中的 改变 同步到 页面及store中state
      updataGoodsInfo(state,goodsinfo){
         //修改购物车中的商品数量值
         state.car.some( item =>{
            //根据数字选择框对应的商品ID找到 store中car的商品
            if(item.id == goodsinfo.id) {
               //同步更新store中的数据
               item.count = parseInt(goodsinfo.count)
               return
            }
         })
         //当修改完商品数量之后，把最新的数保存到本地存储中
         localStorage.setItem('car',JSON.stringify(state.car))
      },

      //根据ID，从store中的购物车删除对应的存储的数据
      removeFormCar(state,id) {
         state.car.some( (item,i) => {
            if(item.id == id){
               //通过从子组件传过来的id号，找到相应存储的商品ID号
               //利用数组的splice删除
               state.car.splice(i,1)
               return true;
            }
         })
         //把最新的数据又重新放到 本地存储中
         localStorage.setItem('car',JSON.stringify(state.car))
      },

      //根据 购物车页面选中状态，设置一个方法更新store的数据
      updateGoodsSelected(state,info){
         state.car.some( item => {
            if(item.id == info.id){
               item.selected = info.selected
               return true
            }
         })
         //把更新后的数据 添加到本地存储中
         localStorage.setItem('car',JSON.stringify(state.car))
      }
   },


   getters: { // this.$store.getters.***
      //相当于 计算属性，也相当于过滤器filters
      //4. 实现徽标数值的自动更新
      //   4.1 设置一个数量变量，然后遍历car中的数据，得到总数量,返回出去
      //   4.2 把方法直接放到相应的标签中
      getAllCount(state) {
         var c = 0;
         state.car.forEach(item => {
            c += item.count
         }) 
         return c
      },

      // 实现获取购物车的商品数量
      getGoodsCount(state) {
         var o = {};
         state.car.forEach( item => {
            o[item.id] = item.count
         })
         return o
      },

      //获取物品选中的状态
      getGoddsSelect(state) {
         var o = {};
         state.car.forEach( item => {
            o[item.id] = item.selected
         })
         return o 
      },

      //获取物品的数量，价格，在选择中状态下，并且算出相应的总价格，返回一个对象
      getGoodszong(state) {
         var o = {
            count : 0, //设置一个数量
            amout : 0  //这是一个总价
         }
         state.car.forEach( item => {
            if(item.selected){
               o.count += item.count;
               o.amout += item.price * item.count;
            }
         })
         return o 
      }



   }, 
   actions : {
   //异步操作，可以发送ajax请求
   //{ commit }是固定写法，用于调用 mutations里面的函数
   addToCar({commit},goodsinfo){
      //发送ajax,目的是为了把数据永久存在数据中，方便下次换电脑还能用到这个数据
      commit('addToCar',goodsinfo)
   }
   }
})



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
Vue.filter('dataFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
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
   router, //6.2 在VM实例中 挂载路由
   store //挂载 Vuex
})


