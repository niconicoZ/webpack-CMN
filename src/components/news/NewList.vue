<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newList" :key="item.index"> 
        <router-link :to="'/home/news/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h2>{{ item.title }}</h2>
            <p class="mui-ellipsis">
              <span>发表时间:{{ item.add_time | dataFormat() }}</span>
              <span>点击:{{ item.click }}次</span>
            </p>
          </div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media"> 
        <a href="javascript:;">
          <img class="mui-media-object mui-pull-left" src="../H/姨夫的微笑.jpg">
          <div class="mui-media-body">
            <h2>姨夫的微笑</h2>
            <p class="mui-ellipsis">
              <span>发表时间:2019年3月22日13:11:23</span>
              <span>点击:999+次</span>
            </p>
          </div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media" v-for="item in newList" :key="item.index"> 
        <router-link :to="'/home/news/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h2>{{ item.title }}</h2>
            <p class="mui-ellipsis">
              <span>发表时间:{{ item.add_time | dataFormat() }}</span>
              <span>点击:{{ item.click }}次</span>
            </p>
          </div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media" v-for="item in newList" :key="item.index"> 
        <router-link :to="'/home/news/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h2>{{ item.title }}</h2>
            <p class="mui-ellipsis">
              <span>发表时间:{{ item.add_time | dataFormat() }}</span>
              <span>点击:{{ item.click }}次</span>
            </p>
          </div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media" v-for="item in newList" :key="item.index"> 
        <router-link :to="'/home/news/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h2>{{ item.title }}</h2>
            <p class="mui-ellipsis">
              <span>发表时间:{{ item.add_time | dataFormat() }}</span>
              <span>点击:{{ item.click }}次</span>
            </p>
          </div>
        </router-link>
      </li>

    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      newList: [] //新闻列表
    };
  },
  created() {
    this.getNewList();
  },
  methods: {
    getNewList() {
        this.$http.get('api/getnewslist').then( result => {
            console.log(result);
            if(result.body.status === 0) {
                this.newList = result.body.message;
            }
            else {
                Toast("获取失败");
            }
        })
    }
  }
};
</script>

<style lang="less" scoped>
.mui-table-view {
  h2 {
    font-size: 14px;
  }
  .mui-ellipsis {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    color: #226aff;
  }
}
</style>
