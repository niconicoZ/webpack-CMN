<template>
  <div>
    <!-- 4.2代入mint-ui中的轮播图样式  -->
    <swipe :lunbotuList='lunbotuList' :isfull='true'></swipe>

    <!-- 4.3 代入 mint-ui 的九宫格 样式 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/news">
          <img src="./setutime/fz.jpg" alt="">
          <div class="mui-media-body">尼裙吹水  </div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photo">
          <img src="./setutime/fz.jpg" alt="">
          <div class="mui-media-body">色图分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="./setutime/fz.jpg" alt="">
          <div class="mui-media-body">二刺源</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="./setutime/fz.jpg" alt="">
          <div class="mui-media-body">社保反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="./setutime/fz.jpg" alt="">
          <div class="mui-media-body">91专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="./setutime/fz.jpg" alt="">
          <div class="mui-media-body">都得死</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
//引入 轮播图子组件
import swipe from "../soncomponent/swipe.vue"

export default {
  
  data() {
    return {
      lunbotuList: [] //7.3 VM实例中创建一个空数组，来接收后台数据，以便渲染。
    };
  },
  //7.2 在页面未挂载之前的生命周期函数中，就要调用请求方法，获取后台数据。
  created() {
    this.getLunbotu();
  },
  methods: {
    //7.1 利用resource 请求后端获取轮播图
    getLunbotu() {
      this.$http.get("api/getnewslist").then(result => {
        if (result.body.status === 0) {
          this.lunbotuList = result.body.message;
        } else {
          Toast("获取失败");
        }
      });
    }

    // async getLunbotu() {
    //   const result = await this.$http.get("http://localhost:5000/api/getnewslist");
    //   const {
    //     data: { status, message }
    //   } = result;
    //     if (status === 0) {
    //       this.lunbotuList = message;
    //     } else {
    //       Toast("获取失败");
    //     }
    // }

    // async getLunbotu() {
    //   const {data: {status,message }} = await this.$http.get("api/getnewslist");
    //     if (status === 0) {
    //       this.lunbotuList = message;
    //     } else {
    //       Toast("获取失败");
    //     }
    // }
  },
  components: {
    swipe  //把引入的组件挂载到VM实例，然后进行视图渲染
  }
};
</script>

<style lang="less" scoped>
//4.2mint-ui框架的 轮播图没有设置高度，需要自己进行设置样式。


//4.3 修改 九宫格 样式
.mui-grid-view.mui-grid-9 {
    background-color: white;
    img {
        width: 60px;
    }
    .mui-table-view-cell {
        border: 0;
        .mui-media-body {
            font-size: 14px;
        }
    }
}

</style>
