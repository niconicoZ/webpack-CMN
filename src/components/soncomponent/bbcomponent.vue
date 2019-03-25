<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入您要夸的内容(最多夸120个字)" maxlength="120" v-model="msg"></textarea>

    <mt-button type="primary" size="large" @click="getcomment">发表评论</mt-button>

    <div class="cmt-list">

      <div class="cmt-item" v-for="(item, i) in sonlist" :key="item.add_time">
        <div class="cmt-title">第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp; &nbsp; 发表日期：{{ item.add_time }}</div>
        <div class="cmt-body">{{ item.content }}</div>
      </div>

      <div class="cmt-item">
        <div class="cmt-title">第3楼&nbsp;&nbsp;用户：福音战士&nbsp; &nbsp; 发表日期：2019年3月22日</div>
        <div class="cmt-body">支持大大二连~~~</div>
      </div>
      <div class="cmt-item">
        <div class="cmt-title">第4楼&nbsp;&nbsp;用户：福音战士&nbsp; &nbsp; 发表日期：2019年3月22日</div>
        <div class="cmt-body">支持大大三连~~~</div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
   data() {
     return {
       pageIndex : 1, //默认展示第一页数据
       sonlist : [],  //当前显示的所有评论内容 数组
       msg: '' //评论内容
     }
   },
   created(){
     this.getbbmoments();
   },
   methods: {

     //获取评论
     getbbmoments() {
       this.$http.get('api/getcomments/'+ this.sonid +'?pageindex='+ this.pageIndex).then( result => {
           if(result.body.status === 0) {
            //  this.sonlist = result.body.message
            //  点击加载更多的时候，不能让数据覆盖，使用数组concat() 链接多个数组
            this.sonlist = this.sonlist.concat(result.body.message)
           }
           else {
             Tost('获取失败')
           }
       })
     },

     // 点击获取更多评论
     getmore() {
        this.pageIndex++;
        this.getbbmoments()
     },

     //发表评论
     //参数1：请求 URL地址
     //参数2：提交给服务器的数据对象 { content : this.msg } 
     //参数3：定义提交的，表单的数据的格式（已全局配置）
     getcomment() {
       //检测内容是否为空
       if(this.msg.trim().length === 0) {
         return Toast('请输入内容')
       } 

       this.$http.post('api/postcomment/' + this.sonid, { content : this.msg.trim()}).then(result => {
           console.log(result);
           if(result.body.status === 0) {
             //提交成功后，手动拼接出一个评论对象，然后倒叙添加到 评论数组中
             //问题：为什么不提交成功后，直接调用 获取评论方法，重绘页面呢？
             //解决：因为获取评论方法 有显示当前多少页的参数，如果当前是第三页评论，那么调用刷新只会显示第三页的评论。

             var newcmt = {
                user_name: "福音战士",
                add_time : Date.now(),
                content : this.msg
             };
             //疑难点：所以我们直接对当前数据添加，利用webpack-dev-server中的热更新，实时刷新。
             this.sonlist.unshift(newcmt);
             this.msg = '';
           }
           else {
             Tost('评论失败')
           }
       })
     }
     
   },
   props: ["sonid"] // 接受父传子过来的ID参数
};
</script>

<style lang="less" scoped>
.cmt-container {
  margin-top: 50px;
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 80px;
    margin: 0;
  }
  .cmt-list {
    margin: 10px 0;
    .cmt-item {
      font-size: 14px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
