<template>
    <div>
        <cmt-box :sonid="id"></cmt-box>
    </div>
</template>

<script>
//引入评论子组件
import bb from '../soncomponent/bbcomponent.vue'

export default {
    data() {
        return {
            id : this.$route.params.id
        }
    },
    components: {
        //挂载子组件
        "cmt-box" :bb
    }
}
</script>

<style lang="less" scoped>

</style>
