<template>
  <div>
    <!--1. 标题 -->
    <div class="photoinfo-container">
      <h3>{{ photoinfolist.title }}</h3>
      <p class="subtitle">
        <span>发表事件:{{ photoinfolist.add_time }}</span>
        <span>点击次数:{{ photoinfolist.click }}次</span>
      </p>
    </div>
    <br>

    <!-- 2.缩略图 -->
    <div class="thumbs">
       <img
      class="preview-img"
      v-for="(item,index) in list"
      :src="item.src"
      height="100"
      @click="$preview.open(index,list)"
      :key="item.id"
       >
    </div>

    <!-- <div class="thumbs">
      <vue-preview :slides="list"></vue-preview>
    </div> -->

    <!-- 3.图片内容区域 -->
    <div class="content">{{ photoinfolist.content }}</div>

    <!-- 4.放置现成的 评论子组件 -->
    <cmt-box :sonid="id"></cmt-box>
  </div>
</template>

<script>
//4.1 引入评论子组件
import comment from "../soncomponent/bbcomponent.vue";

export default {
  data() {
    return {
      id: this.$route.params.id, //获取图片的ID
      photoinfolist: [], //图文详情
      list: [] //缩略图
    };
  },
  created() {
    this.getphotoinfo(); //图文详情
    this.getslt(); //缩略图
  },
  methods: {
    //获取图文详情
    getphotoinfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        console.log(result);
        if (result.body.status === 0) {
          this.photoinfolist = result.body.message;
        }
      });
    },
    //获取缩略图
    getslt() {
      // 获取缩略图
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        // console.log(result.body)
        if (result.body.status === 0) {
          // 循环每个图片数据，补全图片的宽和高
          result.body.message.forEach((item, index) => {
            item.alt = "item" + index;
            item.w = 400;
            item.h = 500;
            item.msrc = item.src;
          });
          // 把完整的数据保存到 list 中
          this.list = result.body.message;

          console.log(this.list);
        }
      });
    },
    handleClose() {
      console.log("close callback");
    }
  },
  //4.2 注册子组件
  components: {
    "cmt-box": comment
  }
};
</script>

<style lang="less" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    font-size: 15px;
    color: #26a2ff;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
}
.content {
  font-size: 14px;
  line-height: 30px;
}
.thumbs {
    img {
        margin: 10px;
        box-shadow: 0 0 8px #999; 
    }
}

</style>
