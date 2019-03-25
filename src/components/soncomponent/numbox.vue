<template>
    <!--问题：max值是父亲传递过来的，而在父亲那边是通过 异步请求获取的，如果当子页面已经刷新完毕，而
             异步的获取的数据还没有来，获取的就是undefined。那么设置最高的值，就可以变成无限上线。
        解决：我们可以使用 watch 属性监听，来 监听 父亲传递过来的 max值，不管 watch 会被触发几次，
             但是最后一次，肯定是一个 合法的max值
    -->
    <div class="mui-numbox" data-numbox-min="1" >
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" value="1" @change='countChanged' ref="son" >
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>

<!-- 分析： 子组件在什么瞬间把 数据 传递给父组件？
     解决： 监听（@change='方法'） 数字选择框发送变化的时候就发触发监听的方法，然后通过DOM操作 获取当前元素的value值
     -->
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
            // console.log(this.$refs.son.value);

            //接受父组件传递过来的方法，并传值给爸爸(要把值变换为 number)
            this.$emit('getcount',parseInt(this.$refs.son.value))
            
        }
    },
    props: ['max'],
    watch: {
        //属性监听
        'max':function(newVal,oldVal) {
            //使用MUI官方 API 来设置数字框的最大值 
            mui('.mui-numbox').numbox().setOption('max',newVal)
        }
    }

}
</script>

<style lang="less" scoped>

</style>
