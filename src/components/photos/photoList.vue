<template>
  <div>
    <!-- 1.引入mui中的 区域滚动样式 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id == 0 ? 'mui-active' : '' ]"
            v-for="item in cateList"
            :key="item.id"
            @click="getAllphotolist(item.id)"
          >{{ item.title }}</a>
        </div>
      </div>
    </div>

    <!-- 7.图片预览加载 -->
    <ul class="allphot">
      <!-- 8. 为每个图片 增加详情路由 -->
      <!-- 我们根据每个图片不同的ID设置路由页面，所以传ID的时候 要利用的 字符串拼接 -->
      <!-- 发现样式有了改变，因为我们把li变成了router-link ，所以我们可以利用 tag="li" 指定渲染元素 -->
      <router-link v-for="item in photoList" :key="item.id" :to="'/home/photo/' + item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
            <h3 class="info-title">
                {{ item.title }}
            </h3>
            <div class="info-body">
                {{ item.zhaiyao }}
            </div>
        </div>
      </router-link>
    </ul>

  </div>
</template>

<script>
//2.导入mui的js文件
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      cateList: [], //所有的图片分类列表
      photoList: [] //所有的图片数据
    };
  },
  created() {
    this.getAllCategory();
    this.getAllphotolist(0) //7.2默认获取全部图片数据
  },
  //当 组件中的DOM结构被渲染好，并已挂载到页面上，会执行这个函数。
  mounted() {
    //3.初始化scroll控件
    //为什么要在这里初始化呢？因为要等数据(DOM元素加载)真正的挂载到页面上，就像jQuery 对某个元素进行控制，必须要页面上有那个元素。
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005
    });

    //4.发生报错，是因为mui.js用的一些参数，数据 和 webpack打包好的 bundle.js 默认严格模式不匹配，所以我们建议
    //  把bundle.js中的严格模式给关掉。
    //  4.1 下载插件 npm i babel-plugin-transform-remove-strict-mode
    //  4.2 在 .babelrc 进行配置 plugins: [""transform-remove-strict-mode""]
  },
  methods: {
    //6.获取全部 图片分类列表
    getAllCategory() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          //6.1 数据库不包含所有分类，需要手动添加添加对象
          result.body.message.unshift({ title: "全部", id: 0 });
          //6.2
          this.cateList = result.body.message;
        }
      });
    },

    //7.1 获取全部的 图片数据
    getAllphotolist(cateId) {
        //根据 分类ID 获取图片数据
        this.$http.get('api/getimages/' + cateId).then(result => {
            if(result.body.status === 0) {
                this.photoList  = result.body.message
            }
        })
    }
  }
};
</script>

<style lang="less" scoped>
//5.解决滑动时候的警告。（是chrome为了提高页面滑动流畅度搞出的一个玩意儿）
* {
  touch-action: pan-y;
}

//7.3 UI组件提示需要给懒加载的图片样式

.allphot {
    margin: 0;
    padding: 10px;
    list-style: none;
    padding-bottom: 0;
    li {
      background-color: #ccc;
      text-align: center;  
      margin-bottom: 10px;
      box-shadow: 0 0 9px #999;
      position: relative;
      img {
          width: 100%;
          vertical-align: middle;
      }  
      img [lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
      }
      .info {
       position: absolute;
       bottom: 0;   
       text-align: center;
       color: white;
       background-color:rgba(0, 0, 0, 0.4);
       width: 100%;
          .info-title { 
            font-size: 17px;
          }
          .info-body {
            font-size: 13px;
          }
      }

    }
}
</style>
