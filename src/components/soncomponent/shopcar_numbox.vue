<template>
    <div class="mui-numbox" data-numbox-min="1" style="height:25px" >
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" :value="count" @change='countChanged' ref="son" >
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>

</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'


export default {
    //插件因为有了JS操作，需要进行 初始化
    mounted() {
        mui('.mui-numbox').numbox();
    },
    methods: {
        countChanged() {
           console.log(this.$refs.son.value);
           //每当数值改变，立即把最新的数量同步到 购物车的 store 中，覆盖之前的数据
           //调用mutaions里面的修改store购物车商品数量的方法，并传入要修改的商品ID，和 在购物车页面上的显示商品数量
           this.$store.commit('updataGoodsInfo',{ id: this.goodsid, count: this.$refs.son.value })
        }
    },
    props: ['count','goodsid']
}
</script>

<style lang="less" scoped>

</style>
