<template>
  <div>

    <mt-swipe :auto="4000">
      <!-- 7.4 获取数据后进行v-for进行循环遍历，在组件中，必须要加上　:key属性 -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.img_url" alt :class="{full:isfull}"> 
      </mt-swipe-item>
    </mt-swipe> 

  </div>
</template>

<script>
export default {
    //接收父组件传递给子组件的 值
    props: ['lunbotuList','isfull']
};
</script>

<style lang="less" scoped>
.mint-swipe {
  text-align: center;
  height: 200px;
  .mint-swipe-item {
    overflow: hidden;
    img {
    //   width: 100%;
      height: 100%;
    }
  }
}

.full {
   width: 100%;
}
</style>
